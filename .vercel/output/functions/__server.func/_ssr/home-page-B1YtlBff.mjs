import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, _ as Link, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as SOURCES, O as pagePath, T as guidePath, b as GUIDES } from "./router-Crh4553Z.mjs";
import { a as useCurrentUserState } from "./site-shell-D6MlXv5o.mjs";
import { r as subscribeFounding, t as getFounding } from "./founding-CDHt8rOu.mjs";
import { n as METHOD_PHOTO, r as PROGRAM_MEDIA, t as HERO_PHOTO } from "./program-media-CtufI4aS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/home-page-B1YtlBff.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckoutForm({ locale, copy }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-48 animate-pulse rounded-2xl bg-paper-warm" });
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-card p-6 sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold uppercase tracking-wider text-ridge",
				children: copy.checkout.kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-2 font-display text-2xl font-semibold text-ink",
				children: copy.checkout.successTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-ink-muted leading-relaxed",
				children: copy.dashboard.billingTest
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-ink-muted leading-relaxed",
				children: copy.checkout.successBody
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: pagePath(locale, "app"),
				className: "mt-6 inline-flex items-center justify-center rounded-lg bg-ridge px-6 py-3.5 text-base font-medium text-paper shadow-sm hover:bg-ridge-deep",
				children: copy.cta.openTools
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-card p-6 sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold uppercase tracking-wider text-ridge",
				children: copy.checkout.kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-2 font-display text-2xl font-semibold text-ink",
				children: copy.checkout.h2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-ink-muted leading-relaxed",
				children: copy.checkout.lead
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: pagePath(locale, "login"),
				className: "mt-6 inline-flex items-center justify-center rounded-lg bg-ridge px-6 py-3.5 text-base font-medium text-paper shadow-sm hover:bg-ridge-deep",
				children: copy.auth.signUp
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-sm text-ink-soft leading-relaxed",
				children: copy.checkout.note
			})
		]
	});
}
function HomePage({ locale, copy }) {
	const [unlocked, setUnlocked] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setUnlocked(Boolean(getFounding()) || true);
		return subscribeFounding(() => setUnlocked(Boolean(getFounding()) || true));
	}, []);
	const scenarioPhoto = PROGRAM_MEDIA.ultra100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-5xl lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
					className: "relative min-h-56 overflow-hidden sm:min-h-80 lg:min-h-[28rem]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: HERO_PHOTO.src,
						alt: "",
						className: "h-full w-full object-cover",
						width: HERO_PHOTO.width,
						height: HERO_PHOTO.height,
						decoding: "async"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-center px-4 py-10 sm:px-8 sm:py-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium uppercase tracking-[0.12em] text-accent",
							children: copy.hero.kicker
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 max-w-xl font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-5xl",
							children: copy.hero.h1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg",
							children: copy.hero.lead
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-md border-l-2 border-ridge pl-4 text-sm text-ink-muted",
							children: copy.hero.trial
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#checkout",
								className: "inline-flex min-h-11 items-center justify-center rounded-lg bg-ridge px-6 py-3.5 text-base font-medium text-paper hover:bg-ridge-deep",
								children: copy.cta.start
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#example",
								className: "inline-flex min-h-11 items-center justify-center rounded-lg border border-line bg-card px-6 py-3.5 text-base font-medium text-ink hover:bg-paper-warm",
								children: copy.nav.example
							})]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "example",
			className: "scroll-mt-20 border-b border-line bg-paper-warm/40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold uppercase tracking-wider text-ridge",
						children: copy.scenario.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl",
						children: copy.scenario.h2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 grid gap-8 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "overflow-hidden border border-line bg-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: scenarioPhoto.src,
								alt: "",
								width: scenarioPhoto.width,
								height: scenarioPhoto.height,
								className: "aspect-[16/9] w-full object-cover",
								decoding: "async"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-5 sm:p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-xl font-semibold text-ink",
									children: copy.scenario.setup
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
									className: "mt-5 divide-y divide-line border-y border-line",
									children: copy.scenario.facts.map((fact) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between gap-4 py-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-ink-muted",
											children: fact.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "font-medium text-ink",
											children: fact.value
										})]
									}, fact.label))
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "border border-ridge bg-card p-5 sm:p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-wider text-ridge",
									children: copy.scenario.says
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-5 space-y-3",
									children: copy.scenario.actions.map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-3 text-base leading-relaxed text-ink",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ridge" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: action })]
									}, action))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 text-sm leading-relaxed text-ink-muted",
									children: copy.scenario.note
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: guidePath(locale, "six-weeks-to-a-77k-ultra"),
									className: "mt-6 inline-flex min-h-11 items-center text-sm font-medium text-ridge underline-offset-2 hover:underline",
									children: copy.guidesIndex.cta
								})
							]
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "what",
			className: "scroll-mt-20 border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl",
					children: copy.what.h2
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-8 sm:grid-cols-2",
					children: copy.what.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-wider text-accent",
							children: item.n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 font-display text-xl font-semibold text-ink",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-ink-muted",
							children: item.body
						})
					] }, item.n))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "week",
			className: "scroll-mt-20 border-b border-line bg-paper-warm/40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold uppercase tracking-wider text-ridge",
						children: copy.firstWeek.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl",
						children: copy.firstWeek.h2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-2xl text-base leading-relaxed text-ink-muted",
						children: copy.firstWeek.lead
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-8 divide-y divide-line border-y border-line",
						children: copy.firstWeek.days.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid gap-1 py-5 sm:grid-cols-[5.5rem_1fr] sm:gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold uppercase tracking-wider text-ridge",
								children: step.day
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-semibold text-ink",
								children: step.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-ink-muted",
								children: step.body
							})] })]
						}, step.day))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-10 divide-y divide-line border-y border-line",
						children: copy.week.steps.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid gap-1 py-5 sm:grid-cols-[5rem_1fr] sm:gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold uppercase tracking-wider text-ink-soft",
								children: step.day
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-semibold text-ink",
								children: step.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-ink-muted",
								children: step.body
							})] })]
						}, step.day))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "programs",
			className: "scroll-mt-20 border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold uppercase tracking-wider text-ridge",
						children: copy.programs.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl",
						children: copy.programs.h2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg",
						children: copy.programs.lead
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-8 sm:grid-cols-2",
						children: copy.programs.rows.map((row, i) => {
							const photo = PROGRAM_MEDIA[row.id];
							const layout = row.layout ?? "default";
							const wide = layout === "wide";
							const textFirst = layout === "textFirst";
							const sessionLead = layout === "sessionLead";
							const compact = layout === "compact";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: wide ? "border-b border-line pb-8 sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-8 sm:border-0 sm:pb-0" : compact ? "border-b border-line pb-6 last:border-b-0 sm:border-b-0 sm:pb-0" : "border-b border-line pb-8 last:border-b-0 sm:border-b-0 sm:pb-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: photo.src,
									alt: row.name,
									width: photo.width,
									height: photo.height,
									className: textFirst ? "aspect-[16/9] w-full object-cover sm:order-2" : compact ? "aspect-[2/1] w-full object-cover" : "aspect-[16/9] w-full object-cover",
									decoding: "async",
									loading: i === 0 ? "eager" : "lazy"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: textFirst ? "sm:order-1 sm:pt-2" : "",
									children: sessionLead ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										row.tag ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 text-xs font-medium text-ridge",
											children: row.tag
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: `${row.tag ? "mt-1" : "mt-4"} font-display text-xl font-semibold text-ink`,
											children: row.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-sm leading-relaxed text-ridge-deep",
											children: row.locked
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm leading-relaxed text-ink-muted",
											children: row.focus
										}),
										row.pull ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 border-l-2 border-ridge pl-3 text-sm italic leading-relaxed text-ink",
											children: row.pull
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-xs text-ink-soft",
											children: row.duration
										})
									] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										row.tag ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 text-xs font-medium text-ridge",
											children: row.tag
										}) : compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 text-xs text-ink-soft",
											children: row.duration
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 text-xs font-semibold uppercase tracking-wider text-accent",
											children: row.duration
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-1 font-display text-xl font-semibold text-ink",
											children: row.name
										}),
										row.tag ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-ink-soft",
											children: row.duration
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm leading-relaxed text-ink-muted",
											children: row.focus
										}),
										row.pull ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 border-l-2 border-ridge pl-3 text-sm italic leading-relaxed text-ink",
											children: row.pull
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-sm leading-relaxed text-ridge-deep",
											children: row.locked
										}),
										row.pull ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-sm leading-relaxed text-ink-muted",
											children: row.locked
										}) : null
									] })
								})]
							}, row.id);
						})
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "who",
			className: "scroll-mt-20 border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl",
					children: copy.who.h2
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-10 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold uppercase tracking-wider text-ridge",
						children: copy.who.forTitle
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3",
						children: copy.who.forItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm leading-relaxed text-ink-muted",
							children: item
						}, item))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold uppercase tracking-wider text-accent",
						children: copy.who.notTitle
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3",
						children: copy.who.notItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm leading-relaxed text-ink-muted",
							children: item
						}, item))
					})] })]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "method",
			className: "scroll-mt-20 border-b border-line",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-5xl lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
					className: "relative min-h-56 overflow-hidden sm:min-h-80 lg:min-h-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: METHOD_PHOTO.src,
						alt: "",
						className: "h-full w-full object-cover",
						width: METHOD_PHOTO.width,
						height: METHOD_PHOTO.height,
						decoding: "async",
						loading: "lazy"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 py-14 sm:px-8 sm:py-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold uppercase tracking-wider text-ridge",
							children: copy.method.kicker
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl",
							children: copy.method.h2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-base leading-relaxed text-ink-muted",
							children: copy.method.lead
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "mt-8 space-y-6",
							children: copy.method.cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-display text-lg font-semibold text-ridge-deep",
								children: card.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-2 text-sm leading-relaxed text-ink-muted",
								children: card.body
							})] }, card.title))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 border-t border-line pt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-semibold text-ink",
								children: copy.method.caveatsTitle
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-2",
								children: copy.method.caveats.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "text-sm leading-relaxed text-ink-muted",
									children: item
								}, item))
							})]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl border-t border-line px-4 py-12 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-semibold text-ink",
					children: copy.method.sourcesTitle
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-5 list-decimal space-y-3 pl-5 marker:text-ink-soft",
					children: SOURCES.map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "text-sm leading-relaxed text-ink",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: src.authors
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-ink-soft",
								children: [
									" (",
									src.year,
									"). "
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic",
								children: src.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-ink-muted",
								children: [
									" ",
									src.journal,
									" "
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: src.href,
								className: "font-medium text-ridge underline decoration-ridge/30 underline-offset-2 hover:decoration-ridge",
								rel: "noopener noreferrer",
								target: "_blank",
								children: "doi" in src && src.doi ? `doi:${src.doi}` : "source"
							})
						]
					}, src.title))
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "pricing",
			className: "scroll-mt-20 border-b border-line bg-ridge-deep text-paper",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium uppercase tracking-[0.12em] text-accent-soft",
						children: copy.pricing.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl",
						children: copy.pricing.h2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-2xl text-lg text-paper/75",
						children: copy.pricing.lead
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 border border-paper/15 bg-paper p-6 text-ink sm:p-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "border border-ridge/20 bg-ridge/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ridge",
									children: copy.pricing.badge
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-paper-warm px-3 py-1 text-xs font-medium text-ink-muted",
									children: copy.pricing.trialBadge
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-2xl font-semibold sm:text-3xl",
										children: copy.pricing.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex items-baseline gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-5xl font-semibold tracking-tight sm:text-6xl",
											children: copy.pricing.price
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-lg text-ink-muted",
											children: copy.pricing.per
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 max-w-md text-sm text-ink-muted",
										children: copy.pricing.blurb
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#checkout",
									className: "inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-lg bg-ridge px-6 py-3.5 text-base font-medium text-paper hover:bg-ridge-deep sm:w-auto",
									children: copy.cta.start
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-8 grid gap-3 sm:grid-cols-2",
								children: copy.firstWeek.days.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "text-sm text-ink",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-medium",
										children: [
											d.day,
											": ",
											d.title
										]
									})
								}, d.day))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-6 grid gap-3 sm:grid-cols-2",
								children: copy.pricing.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "text-sm text-ink-muted",
									children: f
								}, f))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 border border-paper/10 px-6 py-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-semibold text-paper",
							children: copy.pricing.laterTitle
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-paper/70",
							children: copy.pricing.laterBody
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "about",
			className: "scroll-mt-20 border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold uppercase tracking-wider text-ridge",
						children: copy.about.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl",
						children: copy.about.h2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-2xl text-base leading-relaxed text-ink-muted",
						children: copy.about.lead
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-8 sm:grid-cols-3",
						children: copy.about.cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-semibold text-ink",
							children: card.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-ink-muted",
							children: card.body
						})] }, card.title))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-sm text-ink-soft",
						children: copy.about.foot
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "guides",
			className: "scroll-mt-20 border-b border-line bg-paper-warm/40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold uppercase tracking-wider text-ridge",
						children: copy.guidesIndex.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl",
						children: copy.guidesIndex.h2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-2xl text-base leading-relaxed text-ink-muted",
						children: copy.guidesIndex.lead
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-8 grid gap-4 sm:grid-cols-2",
						children: GUIDES.map((guide) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: guidePath(locale, guide.slug),
							className: "block border border-line bg-card p-5 hover:bg-paper",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-wider text-accent",
									children: guide.kicker[locale]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-display text-lg font-semibold text-ink",
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
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "checkout",
			className: "scroll-mt-20 border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutForm, {
					locale,
					copy
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "faq",
			className: "scroll-mt-20 border-b border-line bg-paper-warm/40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl",
					children: copy.faq.h2
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 divide-y divide-line border-y border-line",
					children: copy.faq.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "group py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
							className: "flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.q }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 shrink-0 text-ink-soft transition group-open:rotate-45",
								"aria-hidden": "true",
								children: "+"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 pr-8 text-sm leading-relaxed text-ink-muted",
							children: item.a
						})]
					}, item.q))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "disclaimer",
			className: "scroll-mt-20 border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-4 py-12 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold text-warn",
					children: copy.disclaimer.h2
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted",
					children: copy.disclaimer.body
				})]
			})
		})
	] });
}
//#endregion
export { HomePage as t };
