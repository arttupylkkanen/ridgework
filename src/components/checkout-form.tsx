import { useEffect, useState, type ReactNode } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import type { Copy } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { AuthLink, DeskLink } from "./app-link";
import type { Membership } from "@/lib/membership";
import { getMembership } from "@/lib/membership-server";
import { startFoundingCheckout, cancelMembership, startBillingPortal } from "@/lib/polar-checkout";

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-ridge" aria-hidden>
      <path
        fill="currentColor"
        d="M13.2 4.2a.75.75 0 0 1 0 1.06l-6.4 6.4a.75.75 0 0 1-1.06 0L2.8 8.72a.75.75 0 0 1 1.06-1.06l2.4 2.4 5.88-5.86a.75.75 0 0 1 1.06 0Z"
      />
    </svg>
  );
}

function CheckoutReceipt({
  copy,
  action,
  error,
}: {
  copy: Copy;
  action: ReactNode;
  error?: string | null;
}) {
  return (
    <div id="checkout" className="grid gap-4 lg:grid-cols-2 lg:gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 shadow-sm sm:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-base font-medium text-ink">{copy.checkout.dueToday}</p>
          <p className="font-display text-3xl font-semibold tabular-nums text-ink sm:text-4xl">
            {copy.checkout.dueAmount}
          </p>
        </div>
        <p className="mt-1 text-sm text-ink-muted">{copy.pricing.trialBadge}</p>
        <div className="mt-6">{action}</div>
        {error ? <p className="mt-3 text-sm text-accent">{error}</p> : null}
        <p className="mt-5 text-sm leading-relaxed text-ink-muted">{copy.checkout.terms}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {[copy.checkout.chipCancel, copy.checkout.chipSupport, copy.checkout.chipMerchant].map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-line bg-paper-warm/80 px-3 py-1 text-xs font-medium text-ink"
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-ridge/20 bg-ridge/5 p-6 sm:p-8">
        <p className="font-display text-lg font-semibold text-ink">{copy.checkout.includesTitle}</p>
        <ul className="mt-5 space-y-3">
          {copy.checkout.includes.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink">
              <CheckIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex items-baseline justify-between gap-4 border-t border-ridge/15 pt-5">
          <p className="text-sm text-ink-muted">{copy.checkout.afterLine}</p>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <p className="text-sm font-medium text-ink">{copy.checkout.dueToday}</p>
          <p className="font-display text-2xl font-semibold tabular-nums text-ink">{copy.checkout.dueAmount}</p>
        </div>
      </div>
    </div>
  );
}

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
    return <div className="h-64 animate-pulse rounded-2xl bg-paper-warm" />;
  }

  if (!user) {
    return (
      <CheckoutReceipt
        copy={copy}
        action={
          <AuthLink
            locale={locale}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-ink px-6 py-3.5 text-base font-medium text-paper hover:bg-ridge-deep"
          >
            {copy.cta.start}
          </AuthLink>
        }
      />
    );
  }

  return <PaywallPanel locale={locale} copy={copy} membership={membership} />;
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
    return <div className="h-64 animate-pulse rounded-2xl bg-paper-warm" />;
  }

  if (membership.status === "expired" || membership.status === "needs_card") {
    return (
      <CheckoutReceipt
        copy={copy}
        error={error}
        action={
          <button
            type="button"
            onClick={() => void pay()}
            disabled={pending}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-ink px-6 py-3.5 text-base font-medium text-paper hover:bg-ridge-deep disabled:opacity-60"
          >
            {pending ? copy.checkout.paying : copy.checkout.payCta}
          </button>
        }
      />
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-card p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-wider text-ridge">{copy.checkout.kicker}</p>
      <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{copy.checkout.successTitle}</h3>
      <p className="mt-3 text-ink-muted leading-relaxed">
        {membership.status === "active" ? copy.checkout.subscribed : copy.checkout.trialOn}
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
