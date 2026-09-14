import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as pagePath, T as guidePath, b as GUIDES, x as getGuide } from "./router-Crh4553Z.mjs";
import { n as SiteShell } from "./site-shell-D6MlXv5o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guides-page-ChHQ20Rr.js
var import_jsx_runtime = require_jsx_runtime();
function GuidesIndex({ locale, copy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, {
		locale,
		copy,
		page: "guides",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold uppercase tracking-wider text-ridge",
					children: copy.guidesIndex.kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl font-semibold tracking-tight text-ink",
					children: copy.guidesIndex.h2
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-base leading-relaxed text-ink-muted",
					children: copy.guidesIndex.lead
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-10 space-y-4",
					children: GUIDES.map((guide) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: guidePath(locale, guide.slug),
						className: "block border border-line bg-card p-5 hover:bg-paper-warm/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-wider text-accent",
								children: guide.kicker[locale]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-xl font-semibold text-ink",
								children: guide.title[locale]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-ink-muted",
								children: guide.description[locale]
							})
						]
					}) }, guide.slug))
				})
			]
		})
	});
}
function GuideArticle({ locale, copy, slug }) {
	const guide = getGuide(slug);
	if (!guide) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, {
		locale,
		copy,
		page: "guides",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl px-4 py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-ink-muted",
				children: "Not found."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: guidePath(locale),
				className: "mt-4 inline-block text-ridge",
				children: copy.guidesIndex.cta
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, {
		locale,
		copy,
		page: "guides",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold uppercase tracking-wider text-ridge",
					children: guide.kicker[locale]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl font-semibold tracking-tight text-ink",
					children: guide.title[locale]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-lg leading-relaxed text-ink-muted",
					children: guide.description[locale]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 space-y-5",
					children: guide.body[locale].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base leading-relaxed text-ink",
						children: p
					}, p.slice(0, 48)))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-12 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: guidePath(locale),
							className: "text-ridge underline-offset-2 hover:underline",
							children: copy.guidesIndex.cta
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-ink-soft",
							children: " · "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: pagePath(locale, "home"),
							className: "text-ink-muted underline-offset-2 hover:underline",
							children: "Ridgework"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { GuidesIndex as n, GuideArticle as t };
