import { useState, type FormEvent } from "react";
import { useRouterState } from "@tanstack/react-router";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import type { Copy } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { appProgramPath, pagePath } from "@/lib/locale";
import { grantFounding } from "@/lib/founding";
import { TEST_ACCOUNT } from "@/lib/test-account";
import { HomeLink } from "./app-link";
import { SiteShell } from "./site-shell";

type Mode = "signin" | "signup";

export function LoginPage({ locale, copy }: { locale: Locale; copy: Copy }) {
  const searchStr = useRouterState({ select: (s) => s.location.searchStr });
  const query = new URLSearchParams(searchStr.startsWith("?") ? searchStr.slice(1) : searchStr);
  // The router's default search codec re-quotes JSON-primitive-looking values
  // (`qa=1` round-trips as the literal string `"1"`, quotes included — see
  // `@/lib/search`), so check presence rather than an exact "1" match.
  const qa = query.has("qa") && query.get("qa") !== "false" && query.get("qa") !== "0";
  const program = query.get("program");
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState(qa ? TEST_ACCOUNT.name : "");
  const [email, setEmail] = useState(qa ? TEST_ACCOUNT.email : "");
  const [password, setPassword] = useState(qa ? TEST_ACCOUNT.password : "");
  const [error, setError] = useState<string | null>(null);
  const [verifySent, setVerifySent] = useState(false);
  const [pending, setPending] = useState(false);
  const dest = program ? appProgramPath(locale, program) : pagePath(locale, "app");
  const a = copy.auth;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      if (mode === "signup") {
        const { error: err } = await authClient.signUp.email({
          name: name.trim() || email.split("@")[0] || "Athlete",
          email: email.trim(),
          password,
          callbackURL: dest,
        });
        if (err) throw new Error(err.message ?? a.error);
        // With verification required there is no session yet, so redirecting
        // would bounce straight back here with nothing explained.
        const { data: session } = await authClient.getSession();
        if (!session) {
          setVerifySent(true);
          setPending(false);
          return;
        }
      } else {
        const { error: err } = await authClient.signIn.email({
          email: email.trim(),
          password,
          callbackURL: dest,
        });
        if (err) throw new Error(err.message ?? a.error);
      }
      grantFounding({
        name: name.trim() || email.split("@")[0] || "Athlete",
        email: email.trim(),
      });
      window.location.href = dest;
    } catch (err) {
      setError(err instanceof Error ? err.message : a.error);
      setPending(false);
    }
  }

  return (
    <SiteShell locale={locale} copy={copy} page="login">
      <section className="mx-auto max-w-md px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-sm font-medium uppercase tracking-wider text-accent">
          {copy.appPage.kicker}
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink">
          {a.title}
        </h1>
        <p className="mt-4 text-ink-muted leading-relaxed">{a.lead}</p>
        <p className="mt-3 rounded-2xl border border-accent bg-paper-warm/70 px-4 py-3 text-sm leading-relaxed text-ink">
          {a.testNote}
        </p>

        {authEnabled ? (
          <div className="mt-8 space-y-3">
            {GROK_PROVIDERS.map((p) => (
              <button
                key={p.providerId}
                type="button"
                onClick={() =>
                  void signIn(p.providerId, {
                    callbackURL: dest,
                    errorCallbackURL: pagePath(locale, "login"),
                  })
                }
                className="w-full rounded-lg border border-line bg-card px-4 py-3 text-sm font-medium text-ink hover:bg-paper-warm"
              >
                {p.idp === "google" ? a.withGoogle : a.withX}
              </button>
            ))}
          </div>
        ) : null}

        <p className="mt-8 text-center text-xs font-medium uppercase tracking-wider text-ink-soft">
          {a.or}
        </p>

        {verifySent ? (
          <div className="mt-6 rounded-2xl border border-ridge bg-paper-warm/70 p-5">
            <p className="font-display text-lg font-semibold text-ink">{a.verifyTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{a.verifyBody}</p>
          </div>
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
                className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-3 text-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
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
              className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-3 text-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
            />
          </label>
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
              className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-3 text-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
            />
          </label>
          {error ? <p className="text-sm text-accent">{error}</p> : null}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-ridge px-4 py-3.5 text-sm font-medium text-paper hover:bg-ridge-deep disabled:opacity-60"
          >
            {pending ? "…" : mode === "signup" ? a.signUp : a.signIn}
          </button>
        </form>

        <button
          type="button"
          className="mt-6 w-full text-sm text-ridge underline-offset-2 hover:underline"
          onClick={() => {
            setMode(mode === "signup" ? "signin" : "signup");
            setError(null);
          }}
        >
          {mode === "signup" ? a.haveAccount : a.noAccount}
        </button>

        <p className="mt-8 text-center text-sm">
          <HomeLink locale={locale} className="text-ink-muted hover:text-ink">
            Ridgework
          </HomeLink>
        </p>
      </section>
    </SiteShell>
  );
}
