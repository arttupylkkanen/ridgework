import { _ as Link, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as homeHash, O as pagePath } from "./router-Crh4553Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/founding-invite-CzUE_e6V.js
var import_jsx_runtime = require_jsx_runtime();
function FoundingInvite({ locale, copy }) {
	const p = copy.foundingPage;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium uppercase tracking-[0.12em] text-accent",
				children: p.kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl",
				children: p.h1
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-lg leading-relaxed text-ink-muted",
				children: p.lead
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 rounded-lg border border-line bg-card px-4 py-3 text-sm text-ink-muted",
				children: p.trial
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: homeHash(locale, "checkout"),
					className: "inline-flex items-center justify-center rounded-lg bg-ridge px-6 py-3.5 text-base font-medium text-paper shadow-sm hover:bg-ridge-deep",
					children: copy.cta.start
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm leading-relaxed text-ink-soft",
				children: p.note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: pagePath(locale, "home"),
					className: "text-ridge underline-offset-2 hover:underline",
					children: p.back
				})
			})
		]
	});
}
//#endregion
export { FoundingInvite as t };
