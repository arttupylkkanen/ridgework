import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import type { Copy } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { getFounding, grantFounding } from "@/lib/founding";
import { isNoCardTrial, type Membership } from "@/lib/membership";
import { confirmMembershipCheckout, getMembership } from "@/lib/membership-server";
import { homeHash, pagePath } from "@/lib/locale";
import {
  emptyProfile,
  loadProfile,
  profileReady,
  saveProfile,
  type AthleteProfile,
} from "@/lib/athlete";
import { loadAthleteBundle, saveAthleteProfileRemote, saveDailyRemote } from "@/lib/athlete-server";
import { recentDaily } from "@/lib/daily-readiness";
import {
  retargetPeak,
  savePlan,
  startPlan,
  loadPlan,
  OBJECTIVES,
  suggestedPeakOn,
  type ObjectiveId,
  type RollingState,
} from "@/lib/rolling-plan";
import { listEnrollments, saveEnrollmentState, type EnrollmentRecord } from "@/lib/training";
import { cn, fillTemplate } from "@/lib/utils";
import { Onboarding } from "./tools/onboarding";
import { SessionsGlossary } from "./tools/session-how";
import { PassportDesk } from "./tools/passport-desk";
import { MountainDesk } from "./tools/mountain-desk";
import { isTestAccountEmail, sampleTesterProfile } from "@/lib/test-account";
import { PaywallPanel, BillingActions } from "./checkout-form";
import { RollingPlan } from "./tools/rolling-plan";
import { TodayDesk } from "./tools/today-desk";
import { WhatIfDesk } from "./tools/what-if";

type Tab = "today" | "plan" | "whatIf" | "passport" | "prep" | "log" | "profile";

function programFromSearch(searchStr: string): ObjectiveId | null {
  const raw = new URLSearchParams(searchStr.startsWith("?") ? searchStr.slice(1) : searchStr).get(
    "program",
  );
  if (!raw) return null;
  return (OBJECTIVES as readonly string[]).includes(raw) ? (raw as ObjectiveId) : null;
}

function checkoutFromSearch(searchStr: string): string | null {
  return new URLSearchParams(searchStr.startsWith("?") ? searchStr.slice(1) : searchStr).get(
    "checkout_id",
  );
}

export function AppPage({ locale, copy }: { locale: Locale; copy: Copy }) {
  const { user, isPending } = useCurrentUserState();
  const searchStr = useRouterState({ select: (s) => s.location.searchStr });
  const wantProgram = programFromSearch(searchStr);
  const checkoutId = checkoutFromSearch(searchStr);
  const [tab, setTab] = useState<Tab>("today");
  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [profile, setProfile] = useState<AthleteProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [membership, setMembership] = useState<Membership | null>(null);

  useEffect(() => {
    if (!user) return;
    if (!getFounding() || isTestAccountEmail(user.primaryEmail)) {
      grantFounding({
        name: user.displayName ?? "Athlete",
        email: user.primaryEmail ?? "",
      });
    }
    const local = loadProfile();
    if (local) setProfile(local);
    let cancelled = false;
    void Promise.all([listEnrollments(), loadAthleteBundle()])
      .then(async ([rows, bundle]) => {
        if (cancelled) return;
        let nextProfile = bundle.profile ?? local ?? null;
        let nextRows = rows;
        if (isTestAccountEmail(user.primaryEmail) && !profileReady(nextProfile)) {
          const sample = sampleTesterProfile();
          saveProfile(sample);
          nextProfile = sample;
          try {
            await saveAthleteProfileRemote({ data: { profile: sample } });
          } catch {
            /* still usable locally */
          }
        }
        if (isTestAccountEmail(user.primaryEmail) && nextRows.length === 0 && nextProfile) {
          const plan = startPlan(nextProfile.goal, nextProfile.peakOn);
          savePlan(plan);
          try {
            const row = await saveEnrollmentState({
              data: { objective: plan.objective, state: plan },
            });
            nextRows = [row];
          } catch {
            /* local plan is enough for the desk */
          }
        }
        const want = wantProgram;
        if (want) {
          const existing = nextRows.find((row) => row.objective === want);
          if (existing) {
            savePlan(existing.state);
            nextRows = [existing, ...nextRows.filter((row) => row.objective !== want)];
          } else {
            const peak = nextProfile?.peakOn || suggestedPeakOn(want);
            const plan = startPlan(want, peak);
            savePlan(plan);
            if (nextProfile) {
              nextProfile = { ...nextProfile, goal: want, peakOn: peak };
              saveProfile(nextProfile);
              void saveAthleteProfileRemote({ data: { profile: nextProfile } }).catch(
                () => undefined,
              );
            } else {
              nextProfile = emptyProfile({ goal: want, peakOn: peak });
              saveProfile(nextProfile);
            }
            try {
              const row = await saveEnrollmentState({
                data: { objective: plan.objective, state: plan },
              });
              nextRows = [row, ...nextRows.filter((r) => r.objective !== want)];
            } catch {
              /* local is enough */
            }
          }
        }
        setEnrollments(nextRows);
        if (nextRows[0]) savePlan(nextRows[0].state);
        if (nextProfile) {
          saveProfile(nextProfile);
          setProfile(nextProfile);
        }
        setLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id, wantProgram]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    async function loadAccess() {
      if (checkoutId) {
        try {
          await confirmMembershipCheckout({ data: { checkoutId } });
        } catch {
          /* webhook may still land */
        }
      }
      try {
        const next = await getMembership();
        if (!cancelled) setMembership(next);
      } catch {
        if (!cancelled) {
          setMembership({
            status: "needs_card",
            trialEndsOn: "",
            daysLeft: 14,
            canUseDesk: false,
            charging: false,
            canCancel: false,
            cancelScheduled: false,
          });
        }
      }
    }
    void loadAccess();
    return () => {
      cancelled = true;
    };
  }, [user?.id, checkoutId]);

  async function persistRemote(state: RollingState | null) {
    if (!state) return;
    try {
      const row = await saveEnrollmentState({
        data: { objective: state.objective, state },
      });
      setEnrollments((prev) => {
        const rest = prev.filter((e) => e.objective !== row.objective);
        return [row, ...rest];
      });
      setSavedFlash(true);
      window.setTimeout(() => setSavedFlash(false), 1800);
    } catch {
      /* local plan still saved */
    }
    const latest = recentDaily()[recentDaily().length - 1];
    if (latest) {
      void saveDailyRemote({
        data: {
          date: latest.date,
          payload: {
            sleep: latest.sleep,
            soreness: latest.soreness,
            motivation: latest.motivation,
            fatigue: latest.fatigue,
            stress: latest.stress,
            lastEffort: latest.lastEffort,
          },
          call: latest.call,
          overridden: latest.overridden,
        },
      }).catch(() => undefined);
    }
  }

  function completeProfile(next: AthleteProfile) {
    saveProfile(next);
    setProfile(next);
    setEditing(false);
    const current = enrollments.find((row) => row.objective === next.goal)?.state ?? loadPlan();
    if (!current || current.objective !== next.goal) {
      const plan = startPlan(next.goal, next.peakOn);
      savePlan(plan);
      void persistRemote(plan);
    } else if (current.peakOn !== next.peakOn) {
      const plan = retargetPeak(current, next.peakOn);
      savePlan(plan);
      void persistRemote(plan);
    } else {
      savePlan(current);
      void persistRemote(current);
    }
    void saveAthleteProfileRemote({ data: { profile: next } }).catch(() => undefined);
    setTab("today");
  }

  if (isPending) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="h-8 w-48 animate-pulse rounded bg-paper-warm" />
        <div className="mt-6 h-40 animate-pulse rounded-2xl bg-paper-warm" />
      </div>
    );
  }

  if (!user) {
    const want = wantProgram;
    return (
      <RedirectToSignIn
        to={want ? `${pagePath(locale, "login")}?program=${want}` : pagePath(locale, "login")}
      />
    );
  }

  const hasProfile = profileReady(profile);

  if (membership && !membership.canUseDesk) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <PaywallPanel locale={locale} copy={copy} membership={membership} />
      </div>
    );
  }

  // Two tabs carry the daily use; the other five are occasional, so they sit
  // behind one control instead of competing for attention every day.
  const tabs: { id: Tab; label: string }[] = [
    { id: "today", label: copy.appPage.tabs.today },
    { id: "plan", label: copy.appPage.tabs.plan },
  ];
  const moreTabs: { id: Tab; label: string }[] = [
    { id: "whatIf", label: copy.appPage.tabs.whatIf },
    { id: "passport", label: copy.appPage.tabs.passport },
    { id: "prep", label: copy.appPage.tabs.prep },
    { id: "log", label: copy.appPage.tabs.log },
    { id: "profile", label: copy.appPage.tabs.profile },
  ];
  const activeMore = moreTabs.find((item) => item.id === tab);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium uppercase tracking-wider text-accent">
        {copy.appPage.kicker}
      </p>
      {membership?.status === "trialing" ? (
        <p className="mt-4 max-w-2xl rounded-2xl border border-line bg-paper-warm/70 px-4 py-3 text-sm leading-relaxed text-ink">
          {isNoCardTrial(membership)
            ? fillTemplate(copy.checkout.trialNoCard, { n: membership.daysLeft })
            : copy.checkout.trialOn}
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
            {copy.appPage.h1}
          </h1>
          <p className="mt-3 max-w-2xl text-ink-muted leading-relaxed">{copy.appPage.lead}</p>
        </div>
        <p className="rounded-full border border-line bg-card px-3 py-1 text-xs font-medium text-ink-muted">
          {membership?.status === "active"
            ? membership.cancelScheduled
              ? copy.checkout.canceledLater
              : copy.checkout.subscribed
            : membership?.status === "trialing"
              ? isNoCardTrial(membership)
                ? fillTemplate(copy.checkout.trialLeft, { n: membership.daysLeft })
                : copy.checkout.trialOn
              : copy.dashboard.billingTest}
        </p>
      </div>
      {membership && (membership.canCancel || membership.cancelScheduled) ? (
        <div className="mt-4 max-w-xl">
          <BillingActions copy={copy} membership={membership} onChanged={setMembership} />
        </div>
      ) : null}

      {loaded && enrollments.length > 0 ? (
        <section className="mt-8" aria-label={copy.dashboard.enrollments}>
          <p className="text-sm font-semibold uppercase tracking-wider text-ridge">
            {copy.dashboard.enrollments}
          </p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {enrollments.map((row) => (
              <li key={row.id} className="rounded-2xl border border-line bg-card p-4">
                <p className="font-display text-lg font-semibold text-ink">
                  {copy.tools.plan.objectives[row.objective].name}
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  {copy.dashboard.peak} {row.peakOn}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-accent">
                  {copy.dashboard.statusTest}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : loaded && hasProfile ? (
        <p className="mt-8 text-sm text-ink-muted">{copy.dashboard.empty}</p>
      ) : null}

      {savedFlash ? <p className="mt-4 text-sm text-ridge">{copy.dashboard.saved}</p> : null}

      {!hasProfile || editing ? (
        <div className="mt-10">
          <Onboarding
            copy={copy}
            initial={
              profile ??
              (enrollments[0]
                ? emptyProfile({ goal: enrollments[0].objective, peakOn: enrollments[0].peakOn })
                : null)
            }
            onComplete={completeProfile}
            onCancel={hasProfile ? () => setEditing(false) : undefined}
          />
        </div>
      ) : (
        <>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                onClick={() => setTab(item.id)}
                className={cn(
                  "min-h-11 rounded-lg px-4 py-2 text-sm font-medium",
                  tab === item.id
                    ? "bg-ridge text-paper"
                    : "border border-line bg-card text-ink-muted hover:bg-paper-warm",
                )}
              >
                {item.label}
              </button>
            ))}
            <label className="contents">
              <span className="sr-only">{copy.appPage.tabs.more}</span>
              <select
                value={activeMore ? activeMore.id : ""}
                onChange={(e) => {
                  if (e.target.value) setTab(e.target.value as Tab);
                }}
                className={cn(
                  "min-h-11 rounded-lg px-4 py-2 text-sm font-medium",
                  activeMore
                    ? "bg-ridge text-paper"
                    : "border border-line bg-card text-ink-muted hover:bg-paper-warm",
                )}
              >
                <option value="">{copy.appPage.tabs.more}</option>
                {moreTabs.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-8">
            {tab === "today" && profile ? (
              <TodayDesk
                locale={locale}
                copy={copy}
                profile={profile}
                onPersist={(s) => void persistRemote(s)}
                onEditProfile={() => setEditing(true)}
              />
            ) : null}
            {tab === "plan" ? (
              <RollingPlan
                locale={locale}
                copy={copy}
                profile={profile}
                onPersist={(s) => void persistRemote(s)}
              />
            ) : null}
            {tab === "whatIf" ? (
              <WhatIfDesk copy={copy} profile={profile} onPersist={(s) => void persistRemote(s)} />
            ) : null}
            {tab === "passport" ? (
              <PassportDesk
                locale={locale}
                copy={copy}
                enrollments={enrollments.map((row) => row.state)}
              />
            ) : null}
            {tab === "prep" && profile ? (
              <MountainDesk
                copy={copy}
                profile={profile}
                enrollments={enrollments.map((row) => row.state)}
              />
            ) : null}
            {tab === "log" ? <SessionsGlossary locale={locale} copy={copy} /> : null}
            {tab === "profile" ? (
              <Onboarding copy={copy} initial={profile} onComplete={completeProfile} />
            ) : null}
          </div>
        </>
      )}
      <p className="mt-10 text-sm">
        <a
          href={homeHash(locale, "disclaimer")}
          className="text-ridge underline-offset-2 hover:underline"
        >
          {copy.disclaimer.h2}
        </a>
      </p>
    </div>
  );
}
