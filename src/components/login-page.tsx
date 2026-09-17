import { useState, type FormEvent, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { SOCIAL_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import {
  readSignInError,
  readSignUpError,
  screenFromQuery,
  type LoginScreen,
} from "@/lib/auth/login-screen";
import type { Copy } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { appProgramPath, pagePath } from "@/lib/locale";
import { grantFounding } from "@/lib/founding";
import { TEST_ACCOUNT } from "@/lib/test-account";
import { HomeLink } from "./app-link";
import { SiteShell } from "./site-shell";

type Mode = "signin" | "signup" | "forgot";

/**
 * One screen at a time.
 *
 * The previous version kept `verifySent` in a boolean that nothing reset, and
 * drew the notice *above* a form that stayed live underneath it. So the page
 * could say "we sent you a link" and then sign the next submit straight in.
 * Every branch below either shows the form or replaces it.
 */
/**
 * Both of these live outside `LoginPage` on purpose.
 *
 * Declared inside it, they were new function identities on every render, so
 * React treated each keystroke as a different component type, unmounted the
 * subtree and mounted a fresh one. The email and password inputs became new
 * DOM nodes mid-typing, lost focus, and a phone's on-screen keyboard closed
 * after every single character.
 */
function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-8 rounded-2xl border border-ridge bg-paper-warm/70 p-5">
      <p className="font-display text-lg font-semibold text-ink">{title}</p>
      <div className="mt-2 space-y-3 text-sm leading-relaxed text-ink-muted">{children}</div>
    </div>
  );
}

function Shell({
  locale,
  copy,
  title,
  children,
}: {
  locale: Locale;
  copy: Copy;
  /** What the form below actually does, not always "Sign in". */
  title?: string;
  children: ReactNode;
}) {
  return (
    <SiteShell locale={locale} copy={copy} page="login">
      <section className="mx-auto max-w-md px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-sm font-medium uppercase tracking-wider text-accent">
          {copy.appPage.kicker}
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink">
          {title ?? copy.auth.title}
        </h1>
        {children}
        <p className="mt-8 text-center text-sm">
          <HomeLink locale={locale} className="text-ink-muted hover:text-ink">
            Ridgework
          </HomeLink>
        </p>
      </section>
    </SiteShell>
  );
}

export function LoginPage({ locale, copy }: { locale: Locale; copy: Copy }) {
  const searchStr = useRouterState({ select: (s) => s.location.searchStr });
  const query = new URLSearchParams(searchStr.startsWith("?") ? searchStr.slice(1) : searchStr);
  // The router's default search codec re-quotes JSON-primitive-looking values
  // (`qa=1` round-trips as the literal string `"1"`, quotes included — see
  // `@/lib/search`), so check presence rather than an exact "1" match.
  const qa = query.has("qa") && query.get("qa") !== "false" && query.get("qa") !== "0";
  const program = query.get("program");
  const unquote = (v: string | null) => (v ?? "").replace(/^"|"$/g, "") || null;

  const [screen, setScreen] = useState<LoginScreen>(() =>
    screenFromQuery(unquote(query.get("token")), unquote(query.get("error"))),
  );
  const [mode, setMode] = useState<Mode>("signin");
  // `?qa=1` fills in the two fields that are not secret. The password is not
  // in this bundle on purpose — see the note in `@/lib/test-account`.
  const [name, setName] = useState(qa ? TEST_ACCOUNT.name : "");
  const [email, setEmail] = useState(qa ? TEST_ACCOUNT.email : "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const dest = program ? appProgramPath(locale, program) : pagePath(locale, "app");
  const loginPath = pagePath(locale, "login");
  const a = copy.auth;

  function toForm(next: Mode) {
    setMode(next);
    setScreen({ kind: "form" });
    setError(null);
    setNotice(null);
  }

  /** Absolute URL Better Auth sends the reset link back to. */
  function resetRedirect(): string {
    return typeof window === "undefined" ? loginPath : `${window.location.origin}${loginPath}`;
  }

  async function resendVerification(address: string) {
    try {
      await authClient.sendVerificationEmail({ email: address, callbackURL: dest });
      setNotice(a.resent);
    } catch {
      setError(a.error);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setPending(true);
    try {
      if (mode === "forgot") {
        await authClient.requestPasswordReset({ email: email.trim(), redirectTo: resetRedirect() });
        // Deliberately the same screen whether or not the address is known.
        setScreen({ kind: "resetSent", email: email.trim() });
        return;
      }

      if (mode === "signup") {
        const { error: err } = await authClient.signUp.email({
          name: name.trim() || email.split("@")[0] || "Athlete",
          email: email.trim(),
          password,
          callbackURL: dest,
        });
        if (err) {
          const why = readSignUpError(err);
          if (why === "alreadyRegistered") {
            setMode("signin");
            setError(a.alreadyRegistered);
          } else {
            setError(why === "weakPassword" ? a.weakPassword : (err.message ?? a.error));
          }
          return;
        }
        // Ask whether THIS account is signed in, not merely whether some
        // session exists. Signing up while already signed in as somebody else
        // used to fall straight through to the desk, so the new account looked
        // like it had been logged into when it was the old session all along —
        // and the verification screen it should have seen never appeared.
        const { data: session } = await authClient.getSession();
        const signedInAs = session?.user?.email?.trim().toLowerCase() ?? null;
        if (signedInAs !== email.trim().toLowerCase()) {
          // Either verification is on and there is no session yet, or the
          // session belongs to someone else. Both mean the new account is not
          // usable until its address is confirmed.
          setScreen({ kind: "verifySent", email: email.trim() });
          return;
        }
      } else {
        const { error: err } = await authClient.signIn.email({
          email: email.trim(),
          password,
          callbackURL: dest,
        });
        if (err) {
          const why = readSignInError(err);
          if (why === "unverified") {
            await resendVerification(email.trim());
            setScreen({ kind: "verifySent", email: email.trim() });
            return;
          }
          setError(why === "badCredentials" ? a.error : (err.message ?? a.error));
          return;
        }
      }

      grantFounding({
        name: name.trim() || email.split("@")[0] || "Athlete",
        email: email.trim(),
      });
      window.location.href = dest;
    } catch (err) {
      setError(err instanceof Error ? err.message : a.error);
    } finally {
      setPending(false);
    }
  }

  async function onSetPassword(e: FormEvent, token: string) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const { error: err } = await authClient.resetPassword({ newPassword: password, token });
      if (err) {
        setScreen({ kind: "linkExpired" });
        return;
      }
      setPassword("");
      setMode("signin");
      setScreen({ kind: "resetDone" });
    } catch {
      setScreen({ kind: "linkExpired" });
    } finally {
      setPending(false);
    }
  }

  const field =
    "mt-2 w-full rounded-lg border border-line bg-paper px-3 py-3 text-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge";
  const primary =
    "w-full rounded-lg bg-ridge px-4 py-3.5 text-sm font-medium text-paper hover:bg-ridge-deep disabled:opacity-60";
  const quiet = "mt-6 w-full text-sm text-ridge underline-offset-2 hover:underline";

  if (screen.kind === "verifySent") {
    return (
      <Shell locale={locale} copy={copy}>
        <Panel title={a.verifyTitle}>
          <p>{a.verifyBody}</p>
          {notice ? <p className="text-ink">{notice}</p> : null}
          {error ? <p className="text-accent">{error}</p> : null}
          <button
            type="button"
            className="text-ridge underline-offset-2 hover:underline"
            onClick={() => void resendVerification(screen.email)}
          >
            {a.resend}
          </button>
        </Panel>
        <button type="button" className={quiet} onClick={() => toForm("signin")}>
          {a.backToSignIn}
        </button>
      </Shell>
    );
  }

  if (screen.kind === "resetSent") {
    return (
      <Shell locale={locale} copy={copy}>
        <Panel title={a.resetSentTitle}>
          <p>{a.resetSentBody}</p>
        </Panel>
        <button type="button" className={quiet} onClick={() => toForm("signin")}>
          {a.backToSignIn}
        </button>
      </Shell>
    );
  }

  if (screen.kind === "linkExpired") {
    return (
      <Shell locale={locale} copy={copy}>
        <Panel title={a.linkExpiredTitle}>
          <p>{a.linkExpiredBody}</p>
        </Panel>
        <button type="button" className={quiet} onClick={() => toForm("forgot")}>
          {a.forgotTitle}
        </button>
      </Shell>
    );
  }

  if (screen.kind === "setPassword") {
    const token = screen.token;
    return (
      <Shell locale={locale} copy={copy}>
        <Panel title={a.setPasswordTitle}>
          <p>{a.setPasswordBody}</p>
        </Panel>
        <form onSubmit={(e) => void onSetPassword(e, token)} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-ink">
            {a.newPassword}
            <input
              required
              type="password"
              name="new-password"
              autoComplete="new-password"
              minLength={8}
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className={field}
            />
          </label>
          {error ? <p className="text-sm text-accent">{error}</p> : null}
          <button type="submit" disabled={pending} className={primary}>
            {pending ? "…" : a.setPasswordCta}
          </button>
        </form>
      </Shell>
    );
  }

  const forgot = mode === "forgot";

  const heading = forgot ? a.forgotTitle : mode === "signup" ? a.signUp : a.title;

  return (
    <Shell locale={locale} copy={copy} title={heading}>
      {screen.kind === "resetDone" ? (
        <Panel title={a.resetDoneTitle}>
          <p>{a.resetDoneBody}</p>
        </Panel>
      ) : (
        <>
          <p className="mt-4 text-ink-muted leading-relaxed">{forgot ? a.forgotBody : a.lead}</p>
          {forgot ? null : (
            <p className="mt-3 rounded-2xl border border-accent bg-paper-warm/70 px-4 py-3 text-sm leading-relaxed text-ink">
              {a.testNote}
            </p>
          )}
        </>
      )}

      {authEnabled && !forgot && SOCIAL_PROVIDERS.length > 0 ? (
        <>
          <div className="mt-8 space-y-3">
            {SOCIAL_PROVIDERS.map((p) => (
              <button
                key={p.providerId}
                type="button"
                onClick={() =>
                  void signIn(p.providerId, { callbackURL: dest, errorCallbackURL: loginPath })
                }
                className="w-full rounded-lg border border-line bg-card px-4 py-3 text-sm font-medium text-ink hover:bg-paper-warm"
              >
                {p.idp === "google" ? a.withGoogle : a.withX}
              </button>
            ))}
          </div>
          <p className="mt-8 text-center text-xs font-medium uppercase tracking-wider text-ink-soft">
            {a.or}
          </p>
        </>
      ) : null}

      <form onSubmit={(e) => void onSubmit(e)} className="mt-6 space-y-4">
        {mode === "signup" ? (
          <label className="block text-sm font-medium text-ink">
            {a.name}
            <input
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={field}
            />
          </label>
        ) : null}
        <label className="block text-sm font-medium text-ink">
          {a.email}
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={field}
          />
        </label>
        {forgot ? null : (
          <label className="block text-sm font-medium text-ink">
            {a.password}
            <input
              required
              type="password"
              name="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={field}
            />
          </label>
        )}
        {error ? <p className="text-sm text-accent">{error}</p> : null}
        {notice ? <p className="text-sm text-ink">{notice}</p> : null}
        <button type="submit" disabled={pending} className={primary}>
          {pending ? "…" : forgot ? a.forgotSend : mode === "signup" ? a.signUp : a.signIn}
        </button>
      </form>

      {forgot ? (
        <button type="button" className={quiet} onClick={() => toForm("signin")}>
          {a.backToSignIn}
        </button>
      ) : (
        <>
          <button
            type="button"
            className={quiet}
            onClick={() => toForm(mode === "signup" ? "signin" : "signup")}
          >
            {mode === "signup" ? a.haveAccount : a.noAccount}
          </button>
          {mode === "signin" ? (
            <button
              type="button"
              className="mt-3 w-full text-sm text-ink-muted underline-offset-2 hover:underline"
              onClick={() => toForm("forgot")}
            >
              {a.forgotLink}
            </button>
          ) : null}
        </>
      )}
    </Shell>
  );
}
