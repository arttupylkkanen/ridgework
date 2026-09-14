import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, _ as Link, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as GROK_PROVIDERS } from "./server-BoaqzEkN.mjs";
import { O as pagePath } from "./router-Crh4553Z.mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { n as SiteShell } from "./site-shell-D6MlXv5o.mjs";
import { n as setFounding } from "./founding-CDHt8rOu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-page-DBSdBHzc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage({ locale, copy }) {
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	const dest = pagePath(locale, "app");
	const a = copy.auth;
	async function onSubmit(e) {
		e.preventDefault();
		setError(null);
		setPending(true);
		try {
			if (mode === "signup") {
				const { error: err } = await authClient.signUp.email({
					name: name.trim() || email.split("@")[0] || "Athlete",
					email: email.trim(),
					password,
					callbackURL: dest
				});
				if (err) throw new Error(err.message ?? a.error);
			} else {
				const { error: err } = await authClient.signIn.email({
					email: email.trim(),
					password,
					callbackURL: dest
				});
				if (err) throw new Error(err.message ?? a.error);
			}
			setFounding({
				name: name.trim() || email.split("@")[0] || "Athlete",
				email: email.trim(),
				startedAt: (/* @__PURE__ */ new Date()).toISOString()
			});
			window.location.href = dest;
		} catch (err) {
			setError(err instanceof Error ? err.message : a.error);
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, {
		locale,
		copy,
		page: "login",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-md px-4 py-16 sm:px-6 sm:py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium uppercase tracking-wider text-accent",
					children: copy.appPage.kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-4xl font-semibold tracking-tight text-ink",
					children: a.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-ink-muted leading-relaxed",
					children: a.lead
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 rounded-2xl border border-accent bg-paper-warm/70 px-4 py-3 text-sm leading-relaxed text-ink",
					children: a.testNote
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 space-y-3",
					children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void signIn(p.providerId, {
							callbackURL: dest,
							errorCallbackURL: pagePath(locale, "login")
						}),
						className: "w-full rounded-lg border border-line bg-card px-4 py-3 text-sm font-medium text-ink hover:bg-paper-warm",
						children: p.idp === "google" ? a.withGoogle : a.withX
					}, p.providerId))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-center text-xs font-medium uppercase tracking-wider text-ink-soft",
					children: a.or
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => void onSubmit(e),
					className: "mt-6 space-y-4",
					children: [
						mode === "signup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-medium text-ink",
							children: [a.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "name",
								autoComplete: "name",
								value: name,
								onChange: (e) => setName(e.target.value),
								className: "mt-2 w-full rounded-lg border border-line bg-paper px-3 py-3 text-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-medium text-ink",
							children: [a.email, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "email",
								name: "email",
								autoComplete: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "mt-2 w-full rounded-lg border border-line bg-paper px-3 py-3 text-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-medium text-ink",
							children: [a.password, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "password",
								name: "password",
								autoComplete: mode === "signup" ? "new-password" : "current-password",
								minLength: 8,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "mt-2 w-full rounded-lg border border-line bg-paper px-3 py-3 text-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-accent",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: pending,
							className: "w-full rounded-lg bg-ridge px-4 py-3.5 text-sm font-medium text-paper hover:bg-ridge-deep disabled:opacity-60",
							children: pending ? "…" : mode === "signup" ? a.signUp : a.signIn
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-6 w-full text-sm text-ridge underline-offset-2 hover:underline",
					onClick: () => {
						setMode(mode === "signup" ? "signin" : "signup");
						setError(null);
					},
					children: mode === "signup" ? a.haveAccount : a.noAccount
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-center text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: pagePath(locale, "home"),
						className: "text-ink-muted hover:text-ink",
						children: "Ridgework"
					})
				})
			]
		})
	});
}
//#endregion
export { LoginPage as t };
