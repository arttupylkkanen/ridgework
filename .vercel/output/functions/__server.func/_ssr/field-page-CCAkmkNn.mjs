import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, _ as Link, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as SOURCES, E as homeHash, O as pagePath } from "./router-Crh4553Z.mjs";
import { r as cn } from "./site-shell-D6MlXv5o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/field-page-CCAkmkNn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	"stories",
	"science",
	"terrain"
];
var TERRAIN_SRC = {
	chamonix: {
		src: "/field/chamonix-trail.jpg",
		width: 1792,
		height: 1008
	},
	bonhomme: {
		src: "/field/col-bonhomme.jpg",
		width: 1728,
		height: 1152
	},
	ferret: {
		src: "/field/col-ferret.jpg",
		width: 1728,
		height: 1152
	},
	sierre: {
		src: "/field/sierre-zinal.jpg",
		width: 1728,
		height: 1152
	},
	haute: {
		src: "/field/haute-route.jpg",
		width: 1728,
		height: 1152
	},
	dolomites: {
		src: "/field/dolomites.jpg",
		width: 1728,
		height: 1152
	},
	tds: {
		src: "/field/courmayeur-tds.jpg",
		width: 1728,
		height: 1152
	},
	trail: {
		src: "/field/trail-20.jpg",
		width: 1792,
		height: 1008
	},
	ultra: {
		src: "/field/ultra-ridge.jpg",
		width: 1792,
		height: 1008
	},
	expedition: {
		src: "/field/expedition.jpg",
		width: 1792,
		height: 1008
	}
};
var STORY_PHOTOS = [
	"/field/sierre-zinal.jpg",
	"/field/col-bonhomme.jpg",
	"/field/haute-route.jpg"
];
function isTab(value) {
	return TABS.includes(value);
}
function FieldPage({ locale, copy }) {
	const [tab, setTab] = (0, import_react.useState)("stories");
	const field = copy.fieldPage;
	(0, import_react.useEffect)(() => {
		const apply = () => {
			const hash = window.location.hash.replace("#", "");
			if (isTab(hash)) setTab(hash);
		};
		apply();
		window.addEventListener("hashchange", apply);
		return () => window.removeEventListener("hashchange", apply);
	}, []);
	const selectTab = (id) => {
		setTab(id);
		const url = `${pagePath(locale, "field")}#${id}`;
		window.history.replaceState(null, "", url);
	};
	const tabs = [
		{
			id: "stories",
			label: field.tabs.stories
		},
		{
			id: "science",
			label: field.tabs.science
		},
		{
			id: "terrain",
			label: field.tabs.terrain
		}
	];
	const hero = field.terrain.items.find((item) => item.id === "chamonix");
	const heroImg = TERRAIN_SRC.chamonix;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-line",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-4 pt-12 sm:px-6 sm:pt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: pagePath(locale, "home"),
						className: "text-sm text-ink-muted hover:text-ink",
						children: field.back
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm font-semibold uppercase tracking-wider text-ridge",
						children: field.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-5xl",
						children: field.h1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted",
						children: field.lead
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-2xl rounded-lg border border-line bg-card px-4 py-3 text-sm leading-relaxed text-ink-soft",
						children: field.compositeNote
					})
				]
			}), hero ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "mx-auto mt-10 max-w-5xl px-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: heroImg.src,
					alt: hero.title,
					width: heroImg.width,
					height: heroImg.height,
					className: "w-full rounded-2xl border border-line object-cover",
					decoding: "async"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
					className: "mt-3 max-w-3xl pb-10 text-sm leading-relaxed text-ink-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium text-ink",
							children: [hero.title, "."]
						}),
						" ",
						hero.place,
						". ",
						hero.caption
					]
				})]
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sticky top-16 z-30 border-b border-line bg-paper/95 backdrop-blur-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex max-w-5xl flex-wrap gap-2 px-4 py-3 sm:px-6",
				role: "tablist",
				"aria-label": field.kicker,
				children: tabs.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": tab === item.id,
					onClick: () => selectTab(item.id),
					className: cn("min-h-11 rounded-lg px-4 py-2 text-sm font-medium", tab === item.id ? "bg-ridge text-paper" : "border border-line bg-card text-ink-muted hover:bg-paper-warm hover:text-ink"),
					children: item.label
				}, item.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16",
			children: [
				tab === "stories" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoriesPane, { field }) : null,
				tab === "science" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SciencePane, { field }) : null,
				tab === "terrain" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerrainPane, { field }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-16 rounded-2xl border border-line bg-paper-warm/60 px-6 py-8 sm:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl font-semibold text-ink",
							children: copy.checkout.h2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-xl text-sm leading-relaxed text-ink-muted",
							children: copy.hero.trial
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: homeHash(locale, "checkout"),
							className: "mt-6 inline-flex items-center justify-center rounded-lg bg-ridge px-5 py-3 text-sm font-medium text-paper hover:bg-ridge-deep",
							children: copy.cta.start
						})
					]
				})
			]
		})
	] });
}
function StoriesPane({ field }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-16",
		children: field.stories.map((story, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "border-b border-line pb-16 last:border-b-0 last:pb-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold uppercase tracking-wider text-accent",
					children: story.kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-ink-soft",
					children: story.place
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 max-w-3xl font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl",
					children: story.title
				}),
				STORY_PHOTOS[index] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: STORY_PHOTOS[index],
					alt: "",
					width: 1728,
					height: 1152,
					className: "mt-6 aspect-[16/9] w-full object-cover",
					decoding: "async",
					loading: "lazy"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
					className: "mt-6 max-w-2xl border-l-2 border-accent pl-5 font-display text-xl leading-snug text-ridge-deep",
					children: story.pull
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 max-w-2xl space-y-5",
					children: story.body.map((para) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base leading-relaxed text-ink-muted",
						children: para
					}, para.slice(0, 40)))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid max-w-3xl gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-line bg-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-wider text-ridge",
							children: field.storyNote
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-ink",
							children: story.lesson
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-line bg-paper-warm/50 p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-wider text-accent",
							children: field.storySource
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-ink-muted",
							children: story.science
						})]
					})]
				})
			]
		}, story.title))
	});
}
function SciencePane({ field }) {
	const sci = field.science;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold uppercase tracking-wider text-ridge",
			children: sci.kicker
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-ink",
			children: sci.h2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted",
			children: sci.lead
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 rounded-2xl border border-line bg-ridge-deep px-6 py-8 text-paper sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl font-semibold",
				children: sci.limitTitle
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-sm leading-relaxed text-paper/80",
				children: sci.limitBody
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 space-y-12",
			children: sci.sections.map((section, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wider text-ink-soft",
						children: String(i + 1).padStart(2, "0")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-2 font-display text-2xl font-semibold tracking-tight text-ridge-deep",
						children: section.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 space-y-4",
						children: section.body.map((para) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base leading-relaxed text-ink-muted",
							children: para
						}, para.slice(0, 40)))
					})
				]
			}, section.title))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-14 space-y-3 border-t border-line pt-10",
			children: SOURCES.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "text-sm leading-relaxed text-ink-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mr-2 tabular-nums text-ink-soft",
						children: [i + 1, "."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-ink",
						children: src.authors
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						" (",
						src.year,
						"). "
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "italic",
						children: src.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						" ",
						src.journal,
						" "
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: src.href,
						className: "font-medium text-ridge underline decoration-ridge/30 underline-offset-2 hover:decoration-ridge",
						rel: "noopener noreferrer",
						target: "_blank",
						children: "doi" in src && src.doi ? `doi:${src.doi}` : "source"
					})
				]
			}, src.title))
		})
	] });
}
function TerrainPane({ field }) {
	const terrain = field.terrain;
	const rest = terrain.items.filter((item) => item.id !== "chamonix");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold uppercase tracking-wider text-ridge",
			children: terrain.kicker
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-ink",
			children: terrain.h2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted",
			children: terrain.lead
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft",
			children: terrain.photoNote
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid gap-10 md:grid-cols-2",
			children: rest.map((item) => {
				const img = TERRAIN_SRC[item.id];
				if (!img) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: img.src,
						alt: item.title,
						width: img.width,
						height: img.height,
						className: "w-full rounded-2xl border border-line object-cover",
						decoding: "async"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
						className: "mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-semibold text-ridge-deep",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-ink-soft",
								children: item.place
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-ink-muted",
								children: item.caption
							})
						]
					})]
				}, item.id);
			})
		})
	] });
}
//#endregion
export { FieldPage as t };
