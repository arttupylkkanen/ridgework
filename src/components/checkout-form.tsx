import { useEffect, useState } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import type { Copy } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { AuthLink, DeskLink } from "./app-link";
import type { Membership } from "@/lib/membership";
import { getMembership } from "@/lib/membership-server";
import { startFoundingCheckout, cancelMembership, startBillingPortal } from "@/lib/polar-checkout";

export function CheckoutForm({ locale, copy }: { locale: Locale; copy: Copy }) {
  const { user, isPending } = useCurrentUserState();
  const [membership, setMembership] = useState<Membership | null>(null);

  useEffect(() => {
    if (!user) return;
    void getMembership()
      .then(setMembership)
      .catch(() => setMembership(null));
  }, [user?.id]);

  if (isPending) {
    return <div className="h-48 animate-pulse rounded-2xl bg-paper-warm" />;
  }

  if (!user) {
    return (
      <div id="checkout" className="rounded-2xl border border-line bg-card p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-ridge">{copy.checkout.kicker}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{copy.checkout.h2}</h3>
        <p className="mt-3 max-w-xl text-ink-muted leading-relaxed">{copy.checkout.lead}</p>
        <AuthLink
          locale={locale}
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-ridge px-6 py-3.5 text-base font-medium text-paper shadow-sm hover:bg-ridge-deep"
        >
          {copy.cta.start}
        </AuthLink>
        <p className="mt-4 max-w-xl text-sm text-ink-soft leading-relaxed">{copy.checkout.note}</p>
      </div>
    );
  }

  return (
    <PaywallPanel locale={locale} copy={copy} membership={membership} />
  );
}

export function PaywallPanel({
  locale,
  copy,
  membership,
}: {
  locale: Locale;
  copy: Copy;
  membership: Membership | null;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function pay() {
    setError(null);
    setPending(true);
    try {
      const res = await startFoundingCheckout();
      if (res.url) {
        window.location.href = res.url;
        return;
      }
      setError(res.error || copy.checkout.payFail);
    } catch {
      setError(copy.checkout.payFail);
    } finally {
      setPending(false);
    }
  }

  if (!membership) {
    return <div className="h-40 animate-pulse rounded-2xl bg-paper-warm" />;
  }

  if (membership.status === "expired" || membership.status === "needs_card") {
    return (
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">{copy.pricing.badge}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{copy.checkout.payTitle}</h3>
        <p className="mt-3 max-w-xl text-ink-muted leading-relaxed">{copy.checkout.payBody}</p>
        <button
          type="button"
          onClick={() => void pay()}
          disabled={pending}
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-ridge px-6 py-3.5 text-base font-medium text-paper hover:bg-ridge-deep disabled:opacity-60"
        >
          {pending ? copy.checkout.paying : copy.checkout.payCta}
        </button>
        {error ? <p className="mt-3 text-sm text-accent">{error}</p> : null}
        <p className="mt-4 text-sm text-ink-soft">{copy.checkout.note}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-card p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-wider text-ridge">{copy.checkout.kicker}</p>
      <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{copy.checkout.successTitle}</h3>
      <p className="mt-3 text-ink-muted leading-relaxed">
        {membership.status === "active"
          ? copy.checkout.subscribed
          : copy.checkout.trialOn}
      </p>
      <p className="mt-3 text-ink-muted leading-relaxed">{copy.checkout.successBody}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <DeskLink
          locale={locale}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-ridge px-6 py-3.5 text-base font-medium text-paper shadow-sm hover:bg-ridge-deep"
        >
          {copy.cta.openTools}
        </DeskLink>
        <BillingActions copy={copy} membership={membership} />
      </div>
    </div>
  );
}

export function BillingActions({
  copy,
  membership,
  onChanged,
}: {
  copy: Copy;
  membership: Membership;
  onChanged?: (next: Membership) => void;
}) {
  const [ask, setAsk] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<"now" | "later" | null>(membership.cancelScheduled ? "later" : null);

  if (!membership.canCancel && !membership.cancelScheduled && !done) return null;

  async function cancel() {
    setError(null);
    setPending(true);
    try {
      const res = await cancelMembership();
      if (!res.ok) {
        setError(copy.checkout.cancelFail);
        return;
      }
      setDone(res.immediate ? "now" : "later");
      setAsk(false);
      onChanged?.({
        ...membership,
        status: res.immediate ? "expired" : membership.status,
        canUseDesk: res.immediate ? false : membership.canUseDesk,
        canCancel: false,
        cancelScheduled: !res.immediate,
      });
    } catch {
      setError(copy.checkout.cancelFail);
    } finally {
      setPending(false);
    }
  }

  async function portal() {
    setError(null);
    setPending(true);
    try {
      const res = await startBillingPortal();
      if (res.url) {
        window.location.href = res.url;
        return;
      }
      setError(copy.checkout.cancelFail);
    } catch {
      setError(copy.checkout.cancelFail);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="w-full space-y-3">
      {done === "now" ? <p className="text-sm text-ink">{copy.checkout.canceledNow}</p> : null}
      {done === "later" || membership.cancelScheduled ? (
        <p className="text-sm text-ink">{copy.checkout.canceledLater}</p>
      ) : null}
      {ask ? (
        <div className="rounded-xl border border-line bg-paper-warm/70 p-4">
          <p className="text-sm leading-relaxed text-ink">{copy.checkout.cancelConfirm}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void cancel()}
              disabled={pending}
              className="inline-flex min-h-11 items-center rounded-lg bg-ink px-4 py-2 text-sm font-medium text-paper disabled:opacity-60"
            >
              {pending ? copy.checkout.canceling : copy.checkout.cancelYes}
            </button>
            <button
              type="button"
              onClick={() => setAsk(false)}
              className="inline-flex min-h-11 items-center rounded-lg border border-line bg-card px-4 py-2 text-sm font-medium text-ink"
            >
              {copy.checkout.cancelKeep}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {membership.canCancel && !done && !membership.cancelScheduled ? (
            <button
              type="button"
              onClick={() => setAsk(true)}
              className="inline-flex min-h-11 items-center rounded-lg border border-line bg-card px-4 py-2 text-sm font-medium text-ink hover:bg-paper-warm"
            >
              {copy.checkout.cancelCta}
            </button>
          ) : null}
          {membership.canCancel || membership.cancelScheduled ? (
            <button
              type="button"
              onClick={() => void portal()}
              disabled={pending}
              className="inline-flex min-h-11 items-center rounded-lg border border-line bg-card px-4 py-2 text-sm font-medium text-ink hover:bg-paper-warm disabled:opacity-60"
            >
              {copy.checkout.manageCta}
            </button>
          ) : null}
        </div>
      )}
      {error ? <p className="text-sm text-accent">{error}</p> : null}
    </div>
  );
}
