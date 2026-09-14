import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, _ as Link, b as require_jsx_runtime, v as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as hasGateSessionMarker } from "./server-BoaqzEkN.mjs";
import { r as Menu, t as X } from "../_libs/lucide-react.mjs";
import { E as homeHash, O as pagePath, S as LOCALES } from "./router-Crh4553Z.mjs";
import { i as signOut, t as authClient } from "./client-B40BzJxt.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-shell-D6MlXv5o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function fillTemplate(template, vars = {}) {
	return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ""));
}
function SiteFooter({ locale, copy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-line bg-paper-warm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-4 py-12 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-8 sm:flex-row sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/brand/logo-a.png",
						alt: "Ridgework",
						className: "h-10 w-auto",
						width: 180,
						height: 40,
						decoding: "async"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-sm text-sm text-ink-muted",
						children: copy.footerTag
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-ink-soft",
						children: copy.legalEntity
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${copy.support}`,
							className: "text-ink-muted hover:text-ink",
							children: copy.support
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: pagePath(locale, "field"),
							className: "text-ink-muted hover:text-ink",
							children: copy.nav.field
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: pagePath(locale, "terms"),
							className: "text-ink-muted hover:text-ink",
							children: copy.terms
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: pagePath(locale, "privacy"),
							className: "text-ink-muted hover:text-ink",
							children: copy.privacy
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-ink-soft",
							children: copy.cancelAnytime
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-xs text-ink-soft",
				children: copy.copyright
			})]
		})
	});
}
var LANG_LABEL = {
	en: "EN",
	fi: "FI",
	fr: "FR",
	de: "DE"
};
var SECTION_KEYS = [
	"example",
	"programs",
	"pricing"
];
var MOBILE_SECTION_KEYS = [
	"example",
	"programs",
	"pricing",
	"faq"
];
function AuthSlot({ locale, copy }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden h-9 w-24 animate-pulse rounded-lg bg-paper-warm sm:block" });
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hidden items-center gap-2 sm:flex",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: pagePath(locale, "login"),
		className: "hidden rounded-lg border border-line px-3 py-2 text-sm text-ink hover:bg-paper-warm sm:inline-flex",
		children: copy.nav.login
	});
}
function SiteHeader({ locale, copy, page }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { user } = useCurrentUserState();
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);
	const sections = SECTION_KEYS.map((key) => ({
		key,
		href: homeHash(locale, key),
		label: copy.nav[key]
	}));
	const mobileSections = MOBILE_SECTION_KEYS.map((key) => ({
		key,
		href: homeHash(locale, key),
		label: copy.nav[key]
	}));
	const toolsHref = pagePath(locale, "app");
	const primaryHref = user ? toolsHref : pagePath(locale, "login");
	const primaryLabel = user ? copy.cta.openTools : copy.cta.start;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: pagePath(locale, "home"),
					className: "flex shrink-0 items-center gap-2",
					"aria-label": "Ridgework home",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/brand/logo-a.png",
						alt: "Ridgework",
						className: "h-9 w-auto sm:h-10",
						width: 180,
						height: 40,
						decoding: "async"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-2.5 text-sm text-ink-muted xl:flex",
					"aria-label": "Primary",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: pagePath(locale, "guides"),
							className: cn("hover:text-ink", page === "guides" && "font-medium text-ink"),
							children: copy.nav.guides
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: pagePath(locale, "field"),
							className: cn("hover:text-ink", page === "field" && "font-medium text-ink"),
							children: copy.nav.field
						}),
						sections.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: item.href,
							className: "hover:text-ink",
							children: item.label
						}, item.key)),
						user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: toolsHref,
							className: cn("hover:text-ink", page === "app" && "font-medium text-ink"),
							children: copy.nav.app
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 sm:gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "flex items-center gap-1 text-sm",
							"aria-label": "Language",
							children: LOCALES.map((lang) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: pagePath(lang, page === "login" ? "login" : page),
								hrefLang: lang,
								"aria-current": lang === locale ? "page" : void 0,
								className: cn("rounded-md px-2 py-1 transition-colors", lang === locale ? "bg-ridge font-medium text-paper" : "text-ink-muted hover:bg-paper-warm hover:text-ink"),
								children: LANG_LABEL[lang]
							}, lang))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {
							locale,
							copy
						}),
						page !== "login" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: primaryHref,
							className: "hidden rounded-lg bg-ridge px-4 py-2.5 text-sm font-medium text-paper shadow-sm hover:bg-ridge-deep sm:inline-flex",
							children: primaryLabel
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex size-11 items-center justify-center rounded-lg border border-line bg-card text-ink xl:hidden",
							"aria-expanded": open,
							"aria-controls": "mobile-nav",
							onClick: () => setOpen((v) => !v),
							children: [open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: copy.nav.menu
							})]
						})
					]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: "mobile-nav",
			className: "border-t border-line bg-paper px-4 py-4 xl:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex flex-col gap-1",
				"aria-label": "Mobile",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: pagePath(locale, "guides"),
						className: "rounded-lg px-3 py-3 text-ink hover:bg-paper-warm",
						onClick: () => setOpen(false),
						children: copy.nav.guides
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: pagePath(locale, "field"),
						className: "rounded-lg px-3 py-3 text-ink hover:bg-paper-warm",
						onClick: () => setOpen(false),
						children: copy.nav.field
					}),
					mobileSections.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: item.href,
						className: "rounded-lg px-3 py-3 text-ink hover:bg-paper-warm",
						onClick: () => setOpen(false),
						children: item.label
					}, item.key)),
					user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: toolsHref,
						className: "rounded-lg px-3 py-3 text-ink hover:bg-paper-warm",
						onClick: () => setOpen(false),
						children: copy.nav.app
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: pagePath(locale, "login"),
						className: "rounded-lg px-3 py-3 text-ink hover:bg-paper-warm",
						onClick: () => setOpen(false),
						children: copy.nav.login
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: primaryHref,
						className: "mt-2 inline-flex items-center justify-center rounded-lg bg-ridge px-4 py-3 text-sm font-medium text-paper",
						onClick: () => setOpen(false),
						children: primaryLabel
					})
				]
			})
		}) : null]
	});
}
function SiteShell({ locale, copy, page, children }) {
	(0, import_react.useEffect)(() => {
		document.documentElement.lang = locale;
	}, [locale]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {
				locale,
				copy,
				page
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {
				locale,
				copy
			})
		]
	});
}
//#endregion
export { useCurrentUserState as a, fillTemplate as i, SiteShell as n, cn as r, RedirectToSignIn as t };
