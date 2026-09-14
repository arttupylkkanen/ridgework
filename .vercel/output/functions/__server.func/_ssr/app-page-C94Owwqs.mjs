import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { It as object, Ot as _enum, Vt as unknown, jt as boolean, zt as string } from "../_libs/@better-auth/core+[...].mjs";
import { E as homeHash, O as pagePath } from "./router-Crh4553Z.mjs";
import { a as useCurrentUserState, i as fillTemplate, r as cn, t as RedirectToSignIn } from "./site-shell-D6MlXv5o.mjs";
import { n as setFounding, t as getFounding } from "./founding-CDHt8rOu.mjs";
import { r as PROGRAM_MEDIA } from "./program-media-CtufI4aS.mjs";
import { A as weeksBetween, C as suggestedPeakOn, D as todayIso, E as timeline, O as visibleWeeks, S as startPlan, T as templateDays, _ as recommendedWeeks, a as addDaysIso, b as savePlan, c as daysBetween, d as loadPlan, f as logFor, g as qualityFor, h as pointerForDate, i as adaptWeek, k as weekChanges, l as fitSpec, m as phaseOf, n as OBJECTIVES, o as applyCheckin, p as nextSeason, r as PLAN_EVENT, s as authMiddleware, t as HARD_KEYS, v as remainingWeeks, w as syncCalendarToToday, x as sessionDate, y as retargetPeak } from "./rolling-plan-0XNML9Q3.mjs";
import { C as recentDaily, D as weeklyMinutes, E as toggleList, S as profileReady, T as saveProfile, _ as emptyProfile, a as EXPERIENCE, b as loadProfile, c as SPORTS, d as VOLUME_BANDS, f as assessReadiness, g as emptyLoad, h as emptyInputs, i as EQUIPMENT, l as TERRAIN, m as baselineFrom, n as CONSTRAINTS, o as LONGEST_BANDS, p as availableCount, r as DISCIPLINES, s as SCALE, t as ACCESS_FLAGS, u as UNITS, w as saveDailyEntry, x as longestMinutes } from "./daily-readiness-DzLn9haq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-page-C94Owwqs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loadAthleteBundle = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("529229eddb1c1e5b9b147217fb666457f4a533b531928878449858983009855e"));
var saveAthleteProfileRemote = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ profile: unknown() })).handler(createSsrRpc("6d950b74d5f28d447f0bea22b7ddde338b10396def3627fa296e74ff9b4289be"));
var saveDailyRemote = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	date: string().regex(/^\d{4}-\d{2}-\d{2}$/),
	payload: unknown(),
	call: _enum([
		"ready",
		"reduce",
		"easy",
		"rest"
	]),
	overridden: boolean()
})).handler(createSsrRpc("e447276f4e112ba68748517e2cc82ebbf20d4313129a22dd5315b92080725dbf"));
var objectiveSchema = _enum(OBJECTIVES);
var listEnrollments = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("5f2d596c2f9c9e5b0628e306e83637da508189d885368633489f5c298d91f7e2"));
createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	objective: objectiveSchema,
	peakOn: string().regex(/^\d{4}-\d{2}-\d{2}$/),
	startedOn: string().regex(/^\d{4}-\d{2}-\d{2}$/),
	state: unknown()
})).handler(createSsrRpc("1f5538ff14e8735b17a022c766fbb83bd228d4402f02cee60c6c506b1bab9643"));
var saveEnrollmentState = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	objective: objectiveSchema,
	state: unknown()
})).handler(createSsrRpc("a0d8777a2a078c473b662bb5af6b96c1c0a5caffe73e269b8b8e1b36a7ce6f6e"));
var KEY$1 = "ridgework-log-v1";
function DecisionLog({ copy }) {
	const t = copy.tools.log;
	const [entries, setEntries] = (0, import_react.useState)([]);
	const [decision, setDecision] = (0, import_react.useState)("");
	const [why, setWhy] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(KEY$1);
			if (raw) setEntries(JSON.parse(raw));
		} catch {}
	}, []);
	function persist(next) {
		setEntries(next);
		localStorage.setItem(KEY$1, JSON.stringify(next));
	}
	function onSubmit(e) {
		e.preventDefault();
		if (!decision.trim()) return;
		persist([{
			id: crypto.randomUUID(),
			decision: decision.trim(),
			why: why.trim(),
			at: (/* @__PURE__ */ new Date()).toISOString()
		}, ...entries]);
		setDecision("");
		setWhy("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "rounded-2xl border border-line bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium text-ink",
						children: [t.decision, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: decision,
							onChange: (e) => setDecision(e.target.value),
							required: true,
							className: "mt-2 w-full rounded-lg border border-line bg-paper px-3 py-3 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block text-sm font-medium text-ink",
						children: [t.why, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: why,
							onChange: (e) => setWhy(e.target.value),
							rows: 3,
							className: "mt-2 w-full rounded-lg border border-line bg-paper px-3 py-3 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "mt-4 inline-flex items-center justify-center rounded-lg bg-ridge px-5 py-3 text-sm font-medium text-paper hover:bg-ridge-deep",
						children: t.add
					})
				]
			}),
			entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ink-soft",
				children: t.empty
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-2xl border border-line bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-ink-soft",
							children: new Date(entry.at).toLocaleString()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-medium text-ink",
							children: entry.decision
						}),
						entry.why ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-ink-muted",
							children: entry.why
						}) : null
					]
				}, entry.id))
			}),
			entries.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => persist([]),
				className: "text-sm text-ink-soft underline-offset-2 hover:underline",
				children: t.clear
			}) : null
		]
	});
}
var STEPS = 7;
function ChoiceButton({ selected, onClick, title, body, id }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		id,
		type: "button",
		"aria-pressed": selected,
		onClick,
		className: cn("min-h-11 rounded-xl border px-4 py-3 text-left", selected ? "border-ridge bg-paper-warm font-medium text-ink" : "border-line bg-card text-ink-muted hover:bg-paper-warm/60"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-sm text-ink",
			children: title
		}), body ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-1 block text-xs leading-relaxed text-ink-muted",
			children: body
		}) : null]
	});
}
function Onboarding({ copy, initial, onComplete, onCancel }) {
	const t = copy.tools.athlete.onboarding;
	const days = copy.tools.week.days;
	const [step, setStep] = (0, import_react.useState)(0);
	const [draft, setDraft] = (0, import_react.useState)(() => {
		if (initial) return {
			...initial,
			availableDays: [...initial.availableDays]
		};
		return emptyProfile({ peakOn: suggestedPeakOn("fifty") });
	});
	function patch(partial) {
		setDraft((prev) => ({
			...prev,
			...partial
		}));
	}
	const canNext = (0, import_react.useMemo)(() => {
		if (step === 2) return Boolean(draft.peakOn) && draft.peakOn >= todayIso();
		if (step === 4) return availableCount(draft.availableDays) >= 2;
		return true;
	}, [
		step,
		draft.peakOn,
		draft.availableDays
	]);
	function finish() {
		onComplete({
			...draft,
			completedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		"data-onboarding": step,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold uppercase tracking-wider text-ridge",
					children: t.kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl",
					children: t.h1
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted",
					children: t.lead
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-wider text-accent",
				children: fillTemplate(t.step, {
					n: step + 1,
					total: STEPS
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "flex gap-1",
				"aria-hidden": "true",
				children: t.steps.map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: cn("h-1.5 flex-1 rounded-full", i <= step ? "bg-ridge" : "bg-line"),
					title: label
				}, label))
			}),
			step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2 sm:grid-cols-3",
					children: SPORTS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceButton, {
						id: `onboard-sport-${id}`,
						selected: draft.sport === id,
						title: t.sports[id],
						onClick: () => patch({ sport: id })
					}, id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2 sm:grid-cols-2",
					children: DISCIPLINES.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceButton, {
						id: `onboard-disc-${id}`,
						selected: draft.discipline === id,
						title: t.disciplines[id],
						onClick: () => patch({ discipline: id })
					}, id))
				})]
			}) : null,
			step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: OBJECTIVES.map((id) => {
					const obj = copy.tools.plan.objectives[id];
					const photo = PROGRAM_MEDIA[id];
					const selected = draft.goal === id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						id: `onboard-goal-${id}`,
						type: "button",
						"aria-pressed": selected,
						onClick: () => {
							patch({
								goal: id,
								peakOn: draft.peakOn && draft.goal === id ? draft.peakOn : suggestedPeakOn(id)
							});
						},
						className: cn("overflow-hidden border text-left", selected ? "border-ridge bg-paper-warm" : "border-line bg-card hover:bg-paper-warm/60"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: photo.src,
							alt: "",
							width: photo.width,
							height: photo.height,
							className: "aspect-[16/9] w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg font-semibold text-ridge-deep",
									children: obj.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs font-medium uppercase tracking-wider text-accent",
									children: obj.length
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-ink-muted",
									children: obj.blurb
								})
							]
						})]
					}, id);
				})
			}) : null,
			step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 rounded-2xl border border-line bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium text-ink",
						htmlFor: "onboard-peak",
						children: [t.peakLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "onboard-peak",
							type: "date",
							min: todayIso(),
							value: draft.peakOn,
							onChange: (e) => patch({ peakOn: e.target.value }),
							className: "mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-ridge-deep",
						children: copy.tools.plan.longerBetter
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium text-ink",
						htmlFor: "onboard-event",
						children: [t.eventName, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "onboard-event",
							type: "text",
							value: draft.eventName,
							placeholder: t.eventPlaceholder,
							onChange: (e) => patch({ eventName: e.target.value }),
							className: "mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
						})]
					})
				]
			}) : null,
			step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2",
						children: VOLUME_BANDS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceButton, {
							id: `onboard-vol-${id}`,
							selected: draft.weeklyHours === id,
							title: t.volume[id],
							onClick: () => patch({ weeklyHours: id })
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 sm:grid-cols-2",
						children: LONGEST_BANDS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceButton, {
							id: `onboard-long-${id}`,
							selected: draft.longest === id,
							title: t.longest[id],
							onClick: () => patch({ longest: id })
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2",
						children: EXPERIENCE.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceButton, {
							id: `onboard-exp-${id}`,
							selected: draft.experience === id,
							title: t.experience[id],
							onClick: () => patch({ experience: id })
						}, id))
					})
				]
			}) : null,
			step === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-ink",
						children: t.availableTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-4 gap-2 sm:grid-cols-7",
						children: days.map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							id: `onboard-day-${i}`,
							type: "button",
							"aria-pressed": draft.availableDays[i],
							onClick: () => {
								const next = [...draft.availableDays];
								next[i] = !next[i];
								patch({ availableDays: next });
							},
							className: cn("min-h-11 rounded-xl border text-sm", draft.availableDays[i] ? "border-ridge bg-paper-warm font-medium text-ink" : "border-line bg-card text-ink-muted"),
							children: label
						}, label))
					}),
					availableCount(draft.availableDays) < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-warn",
						children: t.needDays
					}) : null
				]
			}) : null,
			step === 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 sm:grid-cols-2",
						children: TERRAIN.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceButton, {
							id: `onboard-terrain-${id}`,
							selected: draft.terrain === id,
							title: t.terrain[id],
							onClick: () => patch({ terrain: id })
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 sm:grid-cols-2",
						children: EQUIPMENT.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceButton, {
							id: `onboard-eq-${id}`,
							selected: draft.equipment.includes(id),
							title: t.equipment[id],
							onClick: () => patch({ equipment: toggleList(draft.equipment, id) })
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 sm:grid-cols-2",
						children: UNITS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceButton, {
							id: `onboard-unit-${id}`,
							selected: draft.units === id,
							title: t.units[id],
							onClick: () => patch({ units: id })
						}, id))
					})
				]
			}) : null,
			step === 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2",
						children: CONSTRAINTS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceButton, {
							id: `onboard-con-${id}`,
							selected: draft.constraints.includes(id),
							title: t.constraints[id],
							onClick: () => patch({ constraints: toggleList(draft.constraints, id) })
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium text-ink",
						htmlFor: "onboard-limit",
						children: [t.limitations, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "onboard-limit",
							value: draft.limitations,
							onChange: (e) => patch({ limitations: e.target.value }),
							rows: 3,
							className: "mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-relaxed text-ink-soft",
						children: t.limitationsHint
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-ridge bg-paper-warm/70 p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg font-semibold text-ink",
								children: t.reviewTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-ink-muted",
								children: t.reviewLead
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-3 space-y-1 text-sm text-ink",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: copy.tools.plan.objectives[draft.goal].name }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: draft.peakOn }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										t.volume[draft.weeklyHours],
										" · ",
										t.longest[draft.longest]
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										availableCount(draft.availableDays),
										" ",
										t.availableTitle.toLowerCase()
									] })
								]
							})
						]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [
					onCancel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onCancel,
						className: "inline-flex min-h-11 items-center rounded-lg border border-line bg-card px-4 py-2 text-sm text-ink-muted hover:bg-paper-warm",
						children: t.back
					}) : null,
					step > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setStep((s) => s - 1),
						className: "inline-flex min-h-11 items-center rounded-lg border border-line bg-card px-4 py-2 text-sm text-ink-muted hover:bg-paper-warm",
						children: t.back
					}) : null,
					step < 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						id: "onboard-next",
						type: "button",
						disabled: !canNext,
						onClick: () => setStep((s) => s + 1),
						className: "inline-flex min-h-11 items-center rounded-lg bg-ridge px-5 py-3 text-sm font-medium text-paper hover:bg-ridge-deep disabled:cursor-not-allowed disabled:opacity-50",
						children: t.next
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						id: "onboard-start",
						type: "button",
						disabled: !canNext,
						onClick: finish,
						className: "inline-flex min-h-11 items-center rounded-lg bg-ridge px-5 py-3 text-sm font-medium text-paper hover:bg-ridge-deep disabled:cursor-not-allowed disabled:opacity-50",
						children: t.start
					})
				]
			})
		]
	});
}
function PaceGuide({ copy }) {
	const p = copy.tools.pace;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-line bg-card p-5 sm:p-6",
		"data-pace-guide": "1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold text-ink",
				children: p.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted",
				children: p.lead
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 border-l-2 border-ridge pl-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-ridge-deep",
					children: p.talkTitle
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-relaxed text-ink",
					children: p.talk
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-xs font-semibold uppercase tracking-wider text-accent",
				children: p.zonesTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[36rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line text-xs uppercase tracking-wider text-ink-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 font-medium",
								children: " "
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 font-medium",
								children: p.feelHead
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 font-medium",
								children: p.watchHead
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 font-medium",
								children: p.noneHead
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: p.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line/70 align-top",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-3 font-medium text-ink",
								children: row.zone
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-3 text-ink-muted",
								children: row.feel
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-3 text-ink-muted",
								children: row.watch
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-ink-muted",
								children: row.none
							})
						]
					}, row.zone)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-xl border border-line bg-paper-warm/60 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-ink",
					children: p.alpineTitle
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-ink-muted",
					children: p.alpine
				})]
			})
		]
	});
}
var KEY = "ridgework-prep-v1";
function PrepLists({ copy }) {
	const t = copy.tools.prep;
	const [checks, setChecks] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) setChecks(JSON.parse(raw));
		} catch {}
	}, []);
	function toggle(id) {
		setChecks((prev) => {
			const next = {
				...prev,
				[id]: !prev[id]
			};
			localStorage.setItem(KEY, JSON.stringify(next));
			return next;
		});
	}
	const groups = [
		{
			title: t.kit,
			items: t.kitItems,
			id: "kit"
		},
		{
			title: t.fuel,
			items: t.fuelItems,
			id: "fuel"
		},
		{
			title: t.recovery,
			items: t.recoveryItems,
			id: "recovery"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-5 md:grid-cols-3",
		children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl border border-line bg-card p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-semibold text-ridge-deep",
				children: group.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: group.items.map((item, i) => {
					const id = `${group.id}-${i}`;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex cursor-pointer items-start gap-3 rounded-lg px-1 py-2 hover:bg-paper-warm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: Boolean(checks[id]),
							onChange: () => toggle(id),
							className: "mt-1 size-4 accent-ridge"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm leading-relaxed text-ink-muted",
							children: item
						})]
					}) }, id);
				})
			})]
		}, group.id))
	});
}
var QUALITY_KEYS = /* @__PURE__ */ new Set([
	"quality",
	"sharpness",
	"climb",
	"strength",
	"steady"
]);
var LONG_KEYS = /* @__PURE__ */ new Set([
	"long",
	"pack",
	"mountain"
]);
var LOAD_KEYS = /* @__PURE__ */ new Set([...HARD_KEYS]);
function cloneDay(day, patch = {}) {
	return {
		...day,
		...patch
	};
}
function restDay() {
	return {
		kind: "rest",
		key: "rest",
		minutes: 0
	};
}
function easyDay(minutes, key = "easy") {
	return {
		kind: "easy",
		key,
		minutes
	};
}
function availableSlots(profile) {
	return profile.availableDays.map((on, i) => on ? i : -1).filter((i) => i >= 0);
}
function longFactor(phase) {
	if (phase === "taper") return .55;
	if (phase === "specific") return 1;
	return .85;
}
function qualityMinutes(profile, phase) {
	if (phase === "base" && profile.experience !== "veteran") return 0;
	if (profile.experience === "beginner") return 30;
	if (profile.experience === "intermediate") return 45;
	if (profile.experience === "experienced") return 55;
	return 65;
}
function hasGear(profile, item) {
	return profile.equipment.includes(item);
}
function accessBlocked(state, flag) {
	return (state.blockedAccess ?? []).includes(flag);
}
function travellingOn(state, date) {
	return Boolean(state.travelUntil && date <= state.travelUntil);
}
function swapAccess(day, profile, state, reasons) {
	const climbOk = (profile.terrain === "mountain" || profile.terrain === "highAlpine") && (hasGear(profile, "crampons") || hasGear(profile, "iceAxe") || hasGear(profile, "gym")) && !accessBlocked(state, "climbing");
	const mountainOk = (profile.terrain === "mountain" || profile.terrain === "highAlpine" || profile.terrain === "rolling") && !accessBlocked(state, "mountain");
	const gymOk = hasGear(profile, "gym") && !accessBlocked(state, "gym");
	const packOk = hasGear(profile, "pack") && !accessBlocked(state, "mountain");
	if (day.key === "climb") {
		if (climbOk && (hasGear(profile, "crampons") || hasGear(profile, "iceAxe")) && !accessBlocked(state, "climbing")) return day;
		if (gymOk) {
			reasons.push({
				id: "gymInsteadOfClimb",
				values: {}
			});
			return cloneDay(day, {
				kind: "hard",
				key: "strength"
			});
		}
		reasons.push({
			id: "noClimbGear",
			values: {}
		});
		return cloneDay(day, {
			kind: "easy",
			key: "hike"
		});
	}
	if (day.key === "strength") {
		if (gymOk) return day;
		reasons.push({
			id: "noGym",
			values: {}
		});
		return easyDay(day.minutes ?? 40, "easy");
	}
	if (day.key === "mountain" || day.key === "vert") {
		if (profile.terrain === "flat" || !mountainOk) {
			reasons.push({
				id: "hikeInsteadOfMountain",
				values: {}
			});
			return cloneDay(day, {
				kind: "easy",
				key: "hike"
			});
		}
		return day;
	}
	if (day.key === "pack") {
		if (!packOk) {
			reasons.push({
				id: "noPack",
				values: {}
			});
			return cloneDay(day, {
				kind: "easy",
				key: "hike"
			});
		}
		return day;
	}
	if (day.key === "hike" && profile.terrain === "flat") {
		reasons.push({
			id: "flatTerrain",
			values: {}
		});
		return easyDay(day.minutes ?? 50, "easy");
	}
	return day;
}
function placeWork(seed, profile, phase, reasons) {
	const slots = availableSlots(profile);
	const out = Array.from({ length: 7 }, () => restDay());
	const n = slots.length;
	reasons.push({
		id: "availableDays",
		values: { n }
	});
	if (n === 0) return out;
	const seedLong = seed.find((d) => LONG_KEYS.has(d.key)) ?? seed.find((d) => d.key === "long");
	const seedQuality = phase === "taper" ? seed.find((d) => d.key === "sharpness" || QUALITY_KEYS.has(d.key)) : seed.find((d) => QUALITY_KEYS.has(d.key) || d.key === "climb" || d.key === "engine");
	const seedEasy = seed.filter((d) => !LONG_KEYS.has(d.key) && !QUALITY_KEYS.has(d.key) && d.key !== "rest" && d.key !== "engine");
	const longSlot = [...slots].sort((a, b) => {
		const rank = (i) => i === 5 ? 0 : i === 6 ? 1 : 2 + (6 - i);
		return rank(a) - rank(b);
	})[0] ?? slots[slots.length - 1];
	const qMin = qualityMinutes(profile, phase);
	const skillKey = seedQuality && (seedQuality.key === "climb" || seedQuality.key === "engine" || seedQuality.key === "hike" || seedQuality.key === "strength");
	const allowQuality = Boolean(seedQuality) && n >= 3 && (Boolean(skillKey) || qMin > 0 && !(profile.experience === "beginner" && phase === "base"));
	if (profile.experience === "beginner" && phase === "base") reasons.push({
		id: "beginnerNoQuality",
		values: {}
	});
	else if (phase === "base" && !skillKey && qMin === 0) reasons.push({
		id: "noQualityBase",
		values: {}
	});
	let qualitySlot;
	if (allowQuality && seedQuality) {
		qualitySlot = slots.find((i) => i !== longSlot && Math.abs(i - longSlot) >= 2);
		if (qualitySlot === void 0) qualitySlot = slots.find((i) => i !== longSlot);
		if (profile.constraints.includes("shiftWork") && qualitySlot !== void 0 && qualitySlot <= 1) {
			const later = slots.find((i) => i !== longSlot && i >= 2 && Math.abs(i - longSlot) >= 2);
			if (later !== void 0) qualitySlot = later;
			reasons.push({
				id: "shiftNoEarlyQuality",
				values: {}
			});
		}
	}
	out[longSlot] = seedLong ? cloneDay(seedLong) : {
		kind: "easy",
		key: "long"
	};
	if (qualitySlot !== void 0 && seedQuality) out[qualitySlot] = cloneDay(seedQuality);
	const remaining = slots.filter((i) => i !== longSlot && i !== qualitySlot);
	const easyPool = seedEasy.length ? seedEasy : [{
		kind: "easy",
		key: "easy"
	}];
	remaining.forEach((slot, idx) => {
		if (profile.constraints.includes("shortSleep") && idx > 0) {
			const prev = remaining[idx - 1];
			if (prev !== void 0 && slot === prev + 1 && out[prev]?.key !== "rest") {
				if (slot !== longSlot) {
					reasons.push({
						id: "shortSleepSpacing",
						values: {}
					});
					out[slot] = restDay();
					return;
				}
			}
		}
		out[slot] = cloneDay(easyPool[idx % easyPool.length]);
	});
	if ((profile.goal === "alpine" || profile.goal === "traverse" || profile.goal === "expedition") && phase !== "taper") {
		const hikeSlot = remaining.find((i) => out[i]?.key === "easy");
		if (hikeSlot !== void 0 && !remaining.some((i) => out[i]?.key === "hike")) out[hikeSlot] = {
			kind: "easy",
			key: "hike"
		};
	}
	return out;
}
function assignMinutes(days, profile, phase, reasons) {
	const weekly = weeklyMinutes(profile.weeklyHours);
	let cap = Math.round(longestMinutes(profile.longest) * longFactor(phase));
	if (profile.constraints.includes("youngKids")) {
		cap = Math.min(cap, phase === "base" ? 90 : 120);
		reasons.push({
			id: "kidsCapLong",
			values: { n: cap }
		});
	}
	if (profile.limitations.trim()) {
		cap = Math.min(cap, Math.round(cap * .85));
		reasons.push({
			id: "limitationsConservative",
			values: {}
		});
	}
	const qMin = qualityMinutes(profile, phase);
	reasons.push({
		id: "longFromBand",
		values: {
			n: cap,
			band: profile.longest
		}
	});
	reasons.push({
		id: "volumeSplit",
		values: { n: weekly }
	});
	let remaining = weekly;
	const stamped = days.map((day) => {
		if (day.key === "rest") return {
			...day,
			minutes: 0
		};
		if (LONG_KEYS.has(day.key)) {
			const minutes = Math.min(cap, Math.round(weekly * .38));
			remaining -= minutes;
			return {
				...day,
				minutes
			};
		}
		if (QUALITY_KEYS.has(day.key) || day.key === "climb" || day.key === "strength" || day.key === "sharpness") {
			const minutes = Math.max(25, qMin || 40);
			remaining -= minutes;
			return {
				...day,
				minutes
			};
		}
		return day;
	});
	const easyIdx = stamped.map((d, i) => d.minutes === void 0 ? i : -1).filter((i) => i >= 0);
	const each = easyIdx.length ? Math.max(25, Math.round(remaining / easyIdx.length)) : 0;
	return stamped.map((day, i) => easyIdx.includes(i) ? {
		...day,
		minutes: each
	} : day);
}
function applyMissedStack(days, state, calendar, reasons) {
	const missedHard = (state.logs ?? []).filter((log) => log.weekCalendar === calendar && log.status === "missed" && LOAD_KEYS.has(log.plannedKey));
	if (!missedHard.length) return days;
	reasons.push({
		id: "missedNoStack",
		values: { n: missedHard.length }
	});
	let dropped = 0;
	return days.map((day, i) => {
		if (missedHard.some((log) => log.dayIndex === i)) return restDay();
		if (dropped === 0 && (QUALITY_KEYS.has(day.key) || day.key === "climb" || day.key === "strength")) {
			dropped += 1;
			return easyDay(Math.max(30, Math.round((day.minutes ?? 45) * .8)), "easy");
		}
		return day;
	});
}
function applyTravel(days, dates, state, reasons) {
	let swapped = false;
	const next = days.map((day, i) => {
		if (!travellingOn(state, dates[i] ?? "")) return day;
		if (day.key === "mountain" || day.key === "climb" || day.key === "pack" || day.key === "vert" || day.key === "hike") {
			swapped = true;
			return easyDay(Math.min(day.minutes ?? 50, 60), "easy");
		}
		if (day.key === "long") {
			swapped = true;
			return easyDay(Math.min(day.minutes ?? 80, 70), "long");
		}
		return day;
	});
	if (swapped) reasons.push({
		id: "travelSwap",
		values: { until: state.travelUntil ?? "" }
	});
	return next;
}
function buildWeek(state, calendar, profile) {
	const phase = phaseOf(state, calendar);
	if (phase === "done") return null;
	const reasons = [];
	let days = placeWork(templateDays(phase, state.objective, false), profile, phase, reasons);
	days = days.map((day) => swapAccess(day, profile, state, reasons));
	days = assignMinutes(days, profile, phase, reasons);
	const dates = days.map((_, i) => sessionDate(state, calendar, i));
	days = applyTravel(days, dates, state, reasons);
	days = applyMissedStack(days, state, calendar, reasons);
	if (state.objective === "engine") {
		days = days.map((day) => day.kind === "hard" ? cloneDay(day, {
			kind: "easy",
			key: "engine"
		}) : day);
		reasons.push({
			id: "engineConversational",
			values: {}
		});
	}
	reasons.push({
		id: "peakUnchanged",
		values: { peak: state.peakOn }
	});
	return {
		calendar,
		phase,
		eased: false,
		days,
		reasons: dedupeReasons(reasons),
		dates
	};
}
function dedupeReasons(reasons) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const reason of reasons) {
		const key = `${reason.id}:${JSON.stringify(reason.values)}`;
		if (seen.has(key)) continue;
		seen.add(key);
		out.push(reason);
	}
	return out;
}
function applyCallToDay(day, call) {
	if (call === "ready") return {
		shown: day,
		action: "keepWritten"
	};
	if (call === "rest") {
		if (day.key === "rest") return {
			shown: day,
			action: "keepWritten"
		};
		return {
			shown: restDay(),
			action: "todayRest"
		};
	}
	if (call === "easy") {
		if (day.key === "rest" || day.kind === "easy" && !LOAD_KEYS.has(day.key)) return {
			shown: day,
			action: "keepWritten"
		};
		return {
			shown: easyDay(Math.max(30, Math.round((day.minutes ?? 45) * .7)), "recovery"),
			action: "qualityToEasy"
		};
	}
	if (day.key === "rest") return {
		shown: day,
		action: "keepWritten"
	};
	if (QUALITY_KEYS.has(day.key) || day.key === "climb" || day.key === "strength" || day.key === "sharpness") return {
		shown: easyDay(Math.max(30, Math.round((day.minutes ?? 50) * .75)), "easy"),
		action: "qualityToEasy"
	};
	if (LONG_KEYS.has(day.key)) return {
		shown: easyDay(Math.max(40, Math.round((day.minutes ?? 90) * .7)), "recovery"),
		action: "longToEasy"
	};
	return {
		shown: cloneDay(day, { minutes: Math.max(25, Math.round((day.minutes ?? 45) * .85)) }),
		action: "reduceMinutes"
	};
}
function visiblePersonalizedWeeks(state, profile) {
	const out = [];
	for (let i = 0; i < 3; i += 1) {
		const week = buildWeek(state, state.calendar + i, profile);
		if (!week) break;
		out.push(week);
	}
	return out;
}
function loadContextFor(state, profile, today, history) {
	const load = emptyLoad();
	load.rhrBaseline = baselineFrom(history, "rhr");
	load.hrvBaseline = baselineFrom(history, "hrv");
	if (!profile) return load;
	for (let back = 1; back <= 7; back += 1) {
		const date = addDaysIso(today, -back);
		const ptr = pointerForDate(state, date);
		if (!ptr) continue;
		const planned = buildWeek(state, ptr.calendar, profile)?.days[ptr.dayIndex];
		const log = logFor(state, date, ptr.dayIndex);
		const key = log?.status === "missed" ? "rest" : log?.status === "done" ? log.actualKey : planned?.key;
		if (!key) continue;
		const hard = LOAD_KEYS.has(key);
		if (back <= 3 && hard) load.hardOrLongLast3Days += 1;
		if (ptr.calendar === state.calendar && hard) load.hardOrLongThisWeek += 1;
		if (back === 1) {
			load.yesterdayHard = hard;
			load.yesterdayKey = key;
		}
	}
	return load;
}
function realizeToday(state, profile, inputs, today = todayIso(), history = [], overridden = false) {
	const ptr = pointerForDate(state, today);
	if (!ptr || ptr.calendar < state.calendar) return null;
	const week = buildWeek(state, ptr.calendar, profile);
	if (!week) return null;
	const written = week.days[ptr.dayIndex] ?? restDay();
	const load = loadContextFor(state, profile, today, history);
	const readiness = inputs ? assessReadiness(inputs, load) : {
		call: "ready",
		reasons: [],
		drivers: []
	};
	const call = overridden ? "ready" : readiness.call;
	const { shown, action } = applyCallToDay(written, call);
	const reasons = [
		...week.reasons,
		...readiness.drivers,
		{
			id: action,
			values: {
				from: written.key,
				to: shown.key,
				minutes: shown.minutes ?? 0
			}
		}
	];
	const changes = written.key === shown.key ? [] : [{
		day: ptr.dayIndex,
		from: written.key,
		to: shown.key
	}];
	return {
		date: today,
		calendar: ptr.calendar,
		dayIndex: ptr.dayIndex,
		written,
		shown,
		call,
		readiness,
		changes,
		reasons: dedupeReasons(reasons),
		overridden,
		log: logFor(state, today, ptr.dayIndex)
	};
}
function markToday(state, profile, status, today = todayIso(), view) {
	const ptr = pointerForDate(state, today);
	if (!ptr) return { state };
	const written = buildWeek(state, ptr.calendar, profile)?.days[ptr.dayIndex] ?? restDay();
	const shown = view?.shown ?? written;
	const log = {
		date: today,
		weekCalendar: ptr.calendar,
		dayIndex: ptr.dayIndex,
		plannedKey: written.key,
		actualKey: status === "missed" ? "rest" : shown.key,
		status,
		at: (/* @__PURE__ */ new Date()).toISOString()
	};
	let next = {
		...state,
		logs: [...(state.logs ?? []).filter((row) => !(row.date === today && row.dayIndex === ptr.dayIndex)), log]
	};
	if (status !== "missed") return { state: next };
	const adj = {
		at: log.at,
		date: today,
		trigger: "missed",
		from: written.key,
		to: "rest",
		reason: {
			id: "missedNoStack",
			values: {
				n: 1,
				day: ptr.dayIndex
			}
		}
	};
	next = {
		...next,
		adjustments: [adj, ...next.adjustments ?? []].slice(0, 40)
	};
	return {
		state: next,
		adjustment: adj
	};
}
function markMoved(state, profile, fromDate, toDate) {
	const fromPtr = pointerForDate(state, fromDate);
	const toPtr = pointerForDate(state, toDate);
	if (!fromPtr || !toPtr) return { state };
	const session = buildWeek(state, fromPtr.calendar, profile)?.days[fromPtr.dayIndex] ?? restDay();
	const at = (/* @__PURE__ */ new Date()).toISOString();
	const done = {
		date: toDate,
		weekCalendar: toPtr.calendar,
		dayIndex: toPtr.dayIndex,
		plannedKey: session.key,
		actualKey: session.key,
		status: "moved",
		at
	};
	const vacated = {
		date: fromDate,
		weekCalendar: fromPtr.calendar,
		dayIndex: fromPtr.dayIndex,
		plannedKey: session.key,
		actualKey: "rest",
		status: "moved",
		at
	};
	const adj = {
		at,
		date: toDate,
		trigger: daysBetween(fromDate, toDate) < 0 ? "doneEarly" : "doneLate",
		from: session.key,
		to: session.key,
		reason: {
			id: "noMakeup",
			values: {
				from: fromDate,
				to: toDate
			}
		}
	};
	const logs = (state.logs ?? []).filter((row) => !(row.date === fromDate && row.dayIndex === fromPtr.dayIndex) && !(row.date === toDate && row.dayIndex === toPtr.dayIndex));
	return {
		state: {
			...state,
			logs: [
				...logs,
				vacated,
				done
			],
			adjustments: [adj, ...state.adjustments ?? []].slice(0, 40)
		},
		adjustment: adj
	};
}
function overlayToday(week, view) {
	if (!view || view.calendar !== week.calendar) return week;
	const days = week.days.map((day, i) => i === view.dayIndex ? view.shown : day);
	const reasons = view.changes.length ? [...week.reasons, {
		id: "whyChangedToday",
		values: {
			from: view.written.key,
			to: view.shown.key
		}
	}] : week.reasons;
	return {
		...week,
		days,
		reasons,
		eased: view.call !== "ready" || week.eased
	};
}
function fill(template, vars) {
	return fillTemplate(template, vars);
}
function formatDay$1(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(y ?? 2026, (m ?? 1) - 1, d ?? 1).toLocaleDateString(void 0, {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function WindowCard({ t, weeks, id, quality }) {
	const fitted = fitSpec(id, Math.max(1, weeks));
	const rec = recommendedWeeks(id);
	const q = t.quality[quality];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-2xl border p-5", quality === "generous" || quality === "full" ? "border-ridge bg-paper-warm/70" : quality === "solid" ? "border-line bg-card" : "border-accent bg-paper-warm/80"),
		"data-quality": quality,
		"data-weeks": weeks,
		"data-base": fitted.base,
		"data-specific": fitted.specific,
		"data-taper": fitted.taper,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-wider text-accent",
				children: q.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-xl font-semibold text-ink",
				children: fill(t.windowLabel, { weeks: Math.max(0, weeks) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-ink-muted",
				children: fill(t.recommendedLabel, { n: rec })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-ink",
				children: fill(t.phaseSplit, {
					base: fitted.base,
					specific: fitted.specific,
					taper: fitted.taper
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-ink-muted",
				children: q.body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-ridge-deep",
				children: t.longerBetter
			})
		]
	});
}
function RollingPlan({ copy, onPersist, profile }) {
	const t = copy.tools.plan;
	const days = copy.tools.week.days;
	const types = copy.tools.week.types;
	const athlete = copy.tools.athlete.today;
	const [ready, setReady] = (0, import_react.useState)(false);
	const [state, setState] = (0, import_react.useState)(null);
	const [pick, setPick] = (0, import_react.useState)("fifty");
	const [peakOn, setPeakOn] = (0, import_react.useState)(() => suggestedPeakOn("fifty"));
	const [result, setResult] = (0, import_react.useState)("ok");
	const [note, setNote] = (0, import_react.useState)("");
	const [flash, setFlash] = (0, import_react.useState)(null);
	const [nextPeak, setNextPeak] = (0, import_react.useState)(() => suggestedPeakOn("fifty"));
	(0, import_react.useEffect)(() => {
		setState(loadPlan());
		setReady(true);
		const onChange = () => setState(loadPlan());
		window.addEventListener(PLAN_EVENT, onChange);
		return () => window.removeEventListener(PLAN_EVENT, onChange);
	}, []);
	(0, import_react.useEffect)(() => {
		if (state && remainingWeeks(state) <= 0) setNextPeak(suggestedPeakOn(state.objective));
	}, [state]);
	function persist(next) {
		savePlan(next);
		setState(next);
		onPersist?.(next);
	}
	const personalized = (0, import_react.useMemo)(() => {
		if (!state || !profile) return [];
		return visiblePersonalizedWeeks(state, profile);
	}, [state, profile]);
	const weeks = (0, import_react.useMemo)(() => {
		if (!state) return [];
		if (profile && personalized.length) return personalized;
		return visibleWeeks(state);
	}, [
		state,
		profile,
		personalized
	]);
	const phaseLabel = (phase) => phase === "done" ? t.donePhase : t.phases[phase];
	const pickerWeeks = weeksBetween(todayIso(), peakOn);
	const pickerQuality = qualityFor(pick, pickerWeeks);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-ink-muted",
		"data-plan": "loading",
		children: t.kicker
	});
	if (!state) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		"data-plan": "picker",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold uppercase tracking-wider text-ridge",
				children: t.kicker
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted",
				children: t.lead
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "max-w-2xl space-y-2 text-sm leading-relaxed text-ink",
				children: t.method.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ridge" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: step })]
				}, step))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-sm leading-relaxed text-ridge-deep",
				children: t.seasonsKey
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-ink",
				children: t.pickTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: OBJECTIVES.map((id) => {
					const obj = t.objectives[id];
					const selected = pick === id;
					const photo = PROGRAM_MEDIA[id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						id: `plan-pick-${id}`,
						type: "button",
						"aria-pressed": selected,
						onClick: () => {
							setPick(id);
							setPeakOn(suggestedPeakOn(id));
						},
						className: cn("overflow-hidden border text-left", selected ? "border-ridge bg-paper-warm" : "border-line bg-card hover:bg-paper-warm/60"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: photo.src,
							alt: "",
							width: photo.width,
							height: photo.height,
							className: "aspect-[16/9] w-full object-cover",
							decoding: "async"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg font-semibold text-ridge-deep",
									children: obj.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs font-medium uppercase tracking-wider text-accent",
									children: obj.length
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-ink-muted",
									children: obj.blurb
								})
							]
						})]
					}, id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-line bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-ink",
							children: t.peakTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-ink-muted",
							children: t.peakLead
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-4 block text-sm font-medium text-ink",
							htmlFor: "plan-peak",
							children: [t.peakLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "plan-peak",
								type: "date",
								min: todayIso(),
								value: peakOn,
								onChange: (e) => setPeakOn(e.target.value),
								className: "mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs leading-relaxed text-ink-soft",
							children: t.peakHint
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowCard, {
					t,
					weeks: pickerWeeks,
					id: pick,
					quality: pickerQuality
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				id: "plan-start",
				type: "button",
				disabled: pickerWeeks < 1,
				onClick: () => persist(startPlan(pick, peakOn)),
				className: "inline-flex min-h-11 items-center justify-center rounded-lg bg-ridge px-5 py-3 text-sm font-medium text-paper hover:bg-ridge-deep disabled:cursor-not-allowed disabled:opacity-50",
				children: pickerWeeks < 1 ? t.startDisabled : t.start
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-ink-soft",
				children: t.disclaimer
			})
		]
	});
	const bar = timeline(state);
	const obj = t.objectives[state.objective];
	const done = weeks.length === 0;
	const written = weeks[0];
	const storedToday = recentDaily().find((row) => row.date === todayIso());
	const todayView = profile && written && storedToday ? realizeToday(state, profile, storedToday, todayIso(), recentDaily(), storedToday.overridden) : null;
	const current = profile && personalized[0] ? overlayToday(personalized[0], todayView && todayView.calendar === personalized[0].calendar ? todayView : null) : written ? adaptWeek(written, result, state.objective) : void 0;
	const changes = written && current ? weekChanges(written, current) : [];
	const ahead = weeks.slice(1);
	const history = [...state.checkins].reverse().slice(0, 6);
	const q = t.quality[bar.quality];
	const weekReasons = current && "reasons" in current ? current.reasons : [];
	function WeekCard({ week, featured }) {
		const changedDays = featured ? new Set(changes.map((c) => c.day)) : /* @__PURE__ */ new Set();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			"data-week": week.calendar,
			"data-eased": week.eased ? "1" : "0",
			className: cn("rounded-2xl border p-5", featured ? "border-ridge bg-card" : "border-line bg-paper-warm/40"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-wider text-accent",
					children: featured ? t.current : t.ahead
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-lg font-semibold text-ridge-deep",
					children: fill(t.weekLabel, { n: week.calendar })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-ink-muted",
					children: phaseLabel(week.phase)
				}),
				week.eased ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs leading-relaxed text-accent",
					children: t.easedNote
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2",
					children: week.days.map((day, di) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: cn("flex gap-2 text-sm", changedDays.has(di) && "rounded-md bg-paper-warm px-1 font-medium text-ridge-deep"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-8 shrink-0 font-medium text-ink-soft",
							children: days[di]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-ink",
							children: [
								types[day.kind],
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-ink-muted",
									children: [" — ", t.sessions[day.key]]
								}),
								day.minutes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-ink-soft",
									children: [" · ", fillTemplate(athlete.minutes, { n: day.minutes })]
								}) : null
							]
						})]
					}, `${week.calendar}-${di}`))
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		"data-plan": "active",
		"data-calendar": state.calendar,
		"data-extra-base": state.extraBase,
		"data-peak": state.peakOn,
		"data-season": state.season,
		"data-quality": bar.quality,
		"data-remaining": bar.remaining,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold uppercase tracking-wider text-ridge",
						children: t.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl font-semibold text-ink",
						children: obj.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm font-medium text-ridge-deep",
						children: [
							fill(t.seasonLabel, { n: state.season }),
							" · ",
							fill(t.peakStatus, { peak: formatDay$1(state.peakOn) })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted",
						children: fill(t.status, {
							calendar: state.calendar,
							phase: done ? t.donePhase : phaseLabel(current?.phase ?? bar.phase),
							progress: state.progress,
							total: bar.total,
							remaining: Math.max(0, remainingWeeks(state))
						})
					}),
					state.extraBase > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-accent",
						children: fill(t.extraBase, { n: state.extraBase })
					}) : null
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					id: "plan-reset",
					type: "button",
					onClick: () => {
						persist(null);
						setFlash(null);
						setNote("");
						setPeakOn(suggestedPeakOn(pick));
					},
					className: "min-h-11 rounded-lg border border-line bg-card px-4 py-2 text-sm text-ink-muted hover:bg-paper-warm",
					children: t.reset
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-sm leading-relaxed text-ridge-deep",
				children: t.seasonsKey
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block max-w-sm text-sm font-medium text-ink",
				htmlFor: "plan-retarget",
				children: [
					t.peakLabel,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "plan-retarget",
						type: "date",
						min: todayIso(),
						value: state.peakOn,
						onChange: (e) => persist(retargetPeak(state, e.target.value)),
						className: "mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-xs font-normal text-ink-soft",
						children: athlete.peakLocked.replace("{peak}", state.peakOn)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("rounded-2xl border p-4", bar.quality === "generous" || bar.quality === "full" ? "border-ridge bg-paper-warm/60" : "border-accent bg-paper-warm/70"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wider text-accent",
						children: q.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-ink-muted",
						children: q.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-ink",
						children: fill(t.phaseSplit, {
							base: bar.base,
							specific: bar.specific,
							taper: bar.taper
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"aria-hidden": false,
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-3 overflow-hidden rounded-full border border-line",
						children: [
							bar.base > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-ridge",
								style: { flexGrow: bar.base },
								title: t.phases.base
							}) : null,
							bar.specific > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-accent",
								style: { flexGrow: bar.specific },
								title: t.phases.specific
							}) : null,
							bar.taper > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-accent-soft",
								style: { flexGrow: bar.taper },
								title: t.phases.taper
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative h-5 text-xs text-ink-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute font-medium text-ridge-deep",
							style: {
								left: `${Math.min(96, bar.progress / bar.total * 100)}%`,
								transform: bar.progress === 0 ? "none" : "translateX(-50%)"
							},
							children: t.nowMark
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-xs text-ink-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.phases.base }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.phases.specific }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.phases.taper })
						]
					})
				]
			}),
			done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5 rounded-2xl border border-line bg-paper-warm/60 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl font-semibold text-ink",
						children: t.doneTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-sm leading-relaxed text-ink-muted",
						children: t.doneBody
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-sm leading-relaxed text-ridge-deep",
						children: t.nextSeasonBody
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block max-w-sm text-sm font-medium text-ink",
						htmlFor: "plan-next-peak",
						children: [t.nextSeasonPeak, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "plan-next-peak",
							type: "date",
							min: todayIso(),
							value: nextPeak,
							onChange: (e) => setNextPeak(e.target.value),
							className: "mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowCard, {
						t,
						weeks: weeksBetween(todayIso(), nextPeak),
						id: state.objective,
						quality: qualityFor(state.objective, weeksBetween(todayIso(), nextPeak))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						id: "plan-next-season",
						type: "button",
						disabled: weeksBetween(todayIso(), nextPeak) < 1,
						onClick: () => {
							persist(nextSeason(state, nextPeak));
							setFlash(null);
							setNote("");
						},
						className: "inline-flex min-h-11 items-center justify-center rounded-lg bg-ridge px-5 py-3 text-sm font-medium text-paper hover:bg-ridge-deep disabled:cursor-not-allowed disabled:opacity-50",
						children: t.nextSeason
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					id: "plan-checkin",
					className: "rounded-2xl border border-line bg-card p-5 sm:p-6",
					onSubmit: (e) => {
						e.preventDefault();
						persist(applyCheckin(state, result, note));
						setNote("");
						setFlash(result === "wrecked" ? t.afterWrecked : result === "problem" ? t.afterProblem : result === "good" ? t.afterGood : t.afterOk);
						setResult("ok");
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-semibold text-ink",
							children: t.checkinTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted",
							children: t.checkinLead
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
							children: [
								["good", t.good],
								["ok", t.ok],
								["problem", t.problem],
								["wrecked", t.wrecked]
							].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								id: `plan-${id}`,
								type: "button",
								"aria-pressed": result === id,
								onClick: () => {
									setResult(id);
									setFlash(null);
								},
								className: cn("flex min-h-11 items-center rounded-lg border px-3 py-3 text-left text-sm", result === id ? "border-ridge bg-paper-warm font-medium text-ink" : "border-line text-ink-muted hover:bg-paper-warm/60"),
								children: label
							}, id))
						}),
						changes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-xl border border-accent bg-paper-warm/70 p-4",
							"data-week-changed": "1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-wider text-accent",
								children: t.changed
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 space-y-1 text-sm text-ink",
								children: changes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									days[c.day],
									": ",
									t.sessions[c.from],
									" → ",
									t.sessions[c.to]
								] }, `${c.day}-${c.from}-${c.to}`))
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-4 block text-sm font-medium text-ink",
							children: [t.note, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "plan-note",
								value: note,
								onChange: (e) => setNote(e.target.value),
								rows: 2,
								className: "mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							id: "plan-submit",
							type: "submit",
							className: "mt-4 inline-flex min-h-11 items-center justify-center rounded-lg bg-ridge px-5 py-3 text-sm font-medium text-paper hover:bg-ridge-deep",
							children: t.submit
						}),
						flash ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							id: "plan-flash",
							className: "mt-4 max-w-2xl text-sm leading-relaxed text-ridge-deep",
							children: flash
						}) : null
					]
				}),
				current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekCard, {
					week: current,
					featured: true
				}) : null,
				weekReasons && weekReasons.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-line bg-paper-warm/50 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wider text-accent",
						children: athlete.whyWeek
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-1.5 text-sm leading-relaxed text-ink",
						children: weekReasons.slice(0, 8).map((reason, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: fillTemplate(athlete.reasons[reason.id] ?? reason.id, reason.values) }, `${reason.id}-${i}`))
					})]
				}) : null,
				ahead.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: ahead.map((week) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekCard, { week }, week.calendar))
				}) : null
			] }),
			state.adjustments && state.adjustments.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-semibold text-ink",
				children: athlete.whyChanged
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: state.adjustments.slice(0, 8).map((adj) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-xl border border-line bg-card px-4 py-3 text-sm text-ink",
					children: fillTemplate(athlete.reasons[adj.reason.id] ?? adj.reason.id, adj.reason.values)
				}, adj.at))
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-semibold text-ink",
				children: t.historyTitle
			}), history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-ink-muted",
				children: t.historyEmpty
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: history.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-line bg-card px-4 py-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-ink",
							children: fill(t.weekLabel, { n: item.calendar })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-ink-muted",
							children: [" · ", item.result === "good" ? t.good : item.result === "ok" ? t.ok : item.result === "wrecked" ? t.wrecked : t.problem]
						}),
						item.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-ink-muted",
							children: item.note
						}) : null
					]
				}, `${item.calendar}-${item.at}`))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-ink-soft",
				children: t.disclaimer
			})
		]
	});
}
function formatDay(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(y ?? 2026, (m ?? 1) - 1, d ?? 1).toLocaleDateString(void 0, {
		weekday: "long",
		day: "numeric",
		month: "short"
	});
}
function reasonText(copy, id, values) {
	const template = copy.tools.athlete.today.reasons[id] ?? id;
	return fillTemplate(template, values);
}
function ScaleRow({ label, low, high, value, onChange, id }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium text-ink",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs text-ink-soft",
			children: [
				low,
				" → ",
				high
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 grid grid-cols-5 gap-1.5",
		children: SCALE.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			id: `${id}-${n}`,
			type: "button",
			"aria-pressed": value === n,
			onClick: () => onChange(n),
			className: cn("min-h-11 rounded-lg border text-sm", value === n ? "border-ridge bg-paper-warm font-medium text-ink" : "border-line bg-card text-ink-muted hover:bg-paper-warm/60"),
			children: n
		}, n))
	})] });
}
var CALL_TONE = {
	ready: "border-ridge bg-paper-warm/70",
	reduce: "border-accent bg-paper-warm/80",
	easy: "border-accent bg-paper-warm/80",
	rest: "border-warn bg-paper-warm/90"
};
function TodayDesk({ copy, profile, onPersist, onEditProfile }) {
	const t = copy.tools.athlete.today;
	const sessions = copy.tools.plan.sessions;
	const dayNames = copy.tools.week.days;
	const [ready, setReady] = (0, import_react.useState)(false);
	const [state, setState] = (0, import_react.useState)(null);
	const [inputs, setInputs] = (0, import_react.useState)(emptyInputs);
	const [overridden, setOverridden] = (0, import_react.useState)(false);
	const [confirmOverride, setConfirmOverride] = (0, import_react.useState)(false);
	const [flash, setFlash] = (0, import_react.useState)(null);
	const [history, setHistory] = (0, import_react.useState)([]);
	const today = todayIso();
	(0, import_react.useEffect)(() => {
		const loaded = loadPlan();
		const synced = loaded ? syncCalendarToToday(loaded) : null;
		if (synced && loaded && synced.calendar !== loaded.calendar) savePlan(synced);
		setState(synced);
		const log = recentDaily();
		setHistory(log);
		const existing = log.find((row) => row.date === today);
		if (existing) {
			setInputs({
				sleep: existing.sleep,
				soreness: existing.soreness,
				motivation: existing.motivation,
				fatigue: existing.fatigue,
				stress: existing.stress,
				rhr: existing.rhr,
				hrv: existing.hrv,
				lastEffort: existing.lastEffort
			});
			setOverridden(existing.overridden);
		}
		setReady(true);
		const onChange = () => setState(loadPlan());
		window.addEventListener(PLAN_EVENT, onChange);
		return () => window.removeEventListener(PLAN_EVENT, onChange);
	}, [today]);
	function persist(next) {
		savePlan(next);
		setState(next);
		onPersist?.(next);
	}
	const view = (0, import_react.useMemo)(() => state ? realizeToday(state, profile, inputs, today, history, overridden) : null, [
		state,
		profile,
		inputs,
		today,
		history,
		overridden
	]);
	const week = (0, import_react.useMemo)(() => {
		if (!state || !view) return null;
		const built = buildWeek(state, view.calendar, profile);
		return built ? overlayToday(built, view) : null;
	}, [
		state,
		view,
		profile
	]);
	const ahead = (0, import_react.useMemo)(() => state ? visiblePersonalizedWeeks(state, profile) : [], [state, profile]);
	(0, import_react.useEffect)(() => {
		if (!view) return;
		const entry = {
			...inputs,
			date: today,
			call: view.call,
			overridden,
			at: (/* @__PURE__ */ new Date()).toISOString()
		};
		saveDailyEntry(entry);
		saveDailyRemote({ data: {
			date: today,
			payload: {
				sleep: inputs.sleep,
				soreness: inputs.soreness,
				motivation: inputs.motivation,
				fatigue: inputs.fatigue,
				stress: inputs.stress,
				rhr: inputs.rhr,
				hrv: inputs.hrv,
				lastEffort: inputs.lastEffort
			},
			call: view.call,
			overridden
		} }).catch(() => void 0);
	}, [
		inputs,
		view?.call,
		overridden,
		today
	]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-ink-muted",
		children: t.kicker
	});
	if (!state) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-ink-muted",
		"data-today": "empty",
		children: t.noSession
	});
	const call = view?.call ?? "ready";
	const shown = view?.shown;
	const written = view?.written;
	const changed = Boolean(view && written && shown && written.key !== shown.key);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		"data-today": "desk",
		"data-call": call,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold uppercase tracking-wider text-ridge",
						children: t.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl",
						children: formatDay(today)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-ridge-deep",
						children: [copy.tools.plan.objectives[state.objective].name, profile.eventName ? ` · ${profile.eventName}` : ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-ink-muted",
						children: fillTemplate(t.peakLocked, { peak: state.peakOn })
					})
				] }), onEditProfile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onEditProfile,
					className: "min-h-11 rounded-lg border border-line bg-card px-4 py-2 text-sm text-ink-muted hover:bg-paper-warm",
					children: t.editProfile
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-line bg-card p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl font-semibold text-ink",
						children: t.wakeTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted",
						children: t.wakeLead
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 space-y-5",
						children: [
							"sleep",
							"soreness",
							"motivation",
							"fatigue",
							"stress"
						].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScaleRow, {
							id: `ready-${key}`,
							label: t[key],
							low: t.scaleLow[key],
							high: t.scaleHigh[key],
							value: inputs[key],
							onChange: (n) => {
								setOverridden(false);
								setConfirmOverride(false);
								setInputs((prev) => ({
									...prev,
									[key]: n
								}));
							}
						}, key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-sm font-medium text-ink",
								children: [t.rhr, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "ready-rhr",
									type: "number",
									min: 30,
									max: 120,
									value: inputs.rhr ?? "",
									onChange: (e) => setInputs((prev) => ({
										...prev,
										rhr: e.target.value ? Number(e.target.value) : void 0
									})),
									className: "mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-sm font-medium text-ink",
								children: [t.hrv, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "ready-hrv",
									type: "number",
									min: 10,
									max: 250,
									value: inputs.hrv ?? "",
									onChange: (e) => setInputs((prev) => ({
										...prev,
										hrv: e.target.value ? Number(e.target.value) : void 0
									})),
									className: "mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-ink",
								children: t.lastEffort
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 grid grid-cols-5 gap-1.5",
								children: SCALE.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									id: `ready-effort-${n}`,
									type: "button",
									"aria-pressed": inputs.lastEffort === n,
									onClick: () => setInputs((prev) => ({
										...prev,
										lastEffort: n
									})),
									className: cn("min-h-11 rounded-lg border text-sm", inputs.lastEffort === n ? "border-ridge bg-paper-warm font-medium text-ink" : "border-line bg-paper text-ink-muted"),
									children: n
								}, n))
							})] })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: cn("rounded-2xl border p-5 sm:p-6", CALL_TONE[call]),
				"data-readiness-call": call,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wider text-accent",
						children: t.calls[call].title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-xl font-semibold text-ink",
						children: t.calls[call].action
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-1.5 text-sm leading-relaxed text-ink",
						children: (view?.readiness.drivers.length ? view.readiness.drivers : view?.readiness.reasons.slice(0, 3) ?? []).map((reason, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: reasonText(copy, reason.id, reason.values) }, `${reason.id}-${i}`))
					}),
					changed && view ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-xl border border-line bg-card/80 p-4",
						"data-why-changed": "1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-wider text-accent",
								children: t.whyChanged
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-ink",
								children: [
									sessions[view.written.key],
									" → ",
									sessions[view.shown.key],
									view.shown.minutes ? ` · ${fillTemplate(t.minutes, { n: view.shown.minutes })}` : ""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-ink-muted",
								children: reasonText(copy, view.call === "rest" ? "todayRest" : view.call === "easy" ? "qualityToEasy" : "reduceMinutes", {
									from: view.written.key,
									to: view.shown.key
								})
							})
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs leading-relaxed text-ink-soft",
						children: t.safety
					}),
					call !== "ready" && !overridden ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-3 border-t border-line/80 pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-start gap-3 text-sm text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "ready-override",
								type: "checkbox",
								checked: confirmOverride,
								onChange: (e) => setConfirmOverride(e.target.checked),
								className: "mt-1 h-4 w-4 accent-ridge"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.overrideLabel })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							id: "ready-keep-written",
							type: "button",
							disabled: !confirmOverride,
							onClick: () => {
								setOverridden(true);
								setConfirmOverride(false);
							},
							className: "inline-flex min-h-11 items-center rounded-lg border border-line bg-card px-4 py-2 text-sm font-medium text-ink disabled:cursor-not-allowed disabled:opacity-50",
							children: t.overrideKeep
						})]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-line bg-card p-5 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-wider text-accent",
					children: t.sessionToday
				}), shown ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "mt-2 font-display text-xl font-semibold text-ink",
						children: [sessions[shown.key], shown.minutes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-ink-muted",
							children: [" · ", fillTemplate(t.minutes, { n: shown.minutes })]
						}) : null]
					}),
					changed && written ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-ink-muted",
						children: fillTemplate(t.was, { session: sessions[written.key] })
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								id: "today-done",
								type: "button",
								onClick: () => {
									persist(markToday(state, profile, "done", today, view).state);
									setFlash(t.doneFlash);
								},
								className: "inline-flex min-h-11 items-center rounded-lg bg-ridge px-4 py-2 text-sm font-medium text-paper hover:bg-ridge-deep",
								children: t.markDone
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								id: "today-missed",
								type: "button",
								onClick: () => {
									persist(markToday(state, profile, "missed", today, view).state);
									setFlash(t.missedFlash);
								},
								className: "inline-flex min-h-11 items-center rounded-lg border border-line bg-paper px-4 py-2 text-sm text-ink hover:bg-paper-warm",
								children: t.markMissed
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								id: "today-early",
								type: "button",
								onClick: () => {
									persist(markMoved(state, profile, addDaysIso(today, 1), today).state);
									setFlash(t.doneFlash);
								},
								className: "inline-flex min-h-11 items-center rounded-lg border border-line bg-paper px-4 py-2 text-sm text-ink-muted hover:bg-paper-warm",
								children: t.didTomorrow
							})
						]
					}),
					flash ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-ridge-deep",
						children: flash
					}) : null,
					view?.log ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs uppercase tracking-wider text-accent",
						children: view.log.status
					}) : null
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-ink-muted",
					children: t.noSession
				})]
			}),
			week ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-semibold text-ink",
					children: t.thisWeek
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card",
					children: week.days.map((day, i) => {
						const isToday = week.dates[i] === today;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: cn("flex items-start gap-3 px-4 py-3 text-sm", isToday && "bg-paper-warm"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-10 shrink-0 font-medium text-ink-soft",
								children: dayNames[i]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1 text-ink",
								children: [sessions[day.key], day.minutes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-ink-muted",
									children: [" · ", fillTemplate(t.minutes, { n: day.minutes })]
								}) : null]
							})]
						}, `${week.calendar}-${i}`);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-2xl border border-line bg-paper-warm/50 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wider text-accent",
						children: t.whyWeek
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1.5 text-sm leading-relaxed text-ink",
						children: week.reasons.slice(0, 6).map((reason, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: reasonText(copy, reason.id, reason.values) }, `${reason.id}-${i}`))
					})]
				})
			] }) : null,
			state.adjustments && state.adjustments.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-semibold text-ink",
				children: t.whyChanged
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: state.adjustments.slice(0, 6).map((adj) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-xl border border-line bg-card px-4 py-3 text-sm text-ink",
					children: reasonText(copy, adj.reason.id, adj.reason.values)
				}, adj.at))
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "rounded-2xl border border-line bg-card p-4 text-sm font-medium text-ink",
					children: [
						t.travellingUntil,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "today-travel",
							type: "date",
							min: today,
							value: state.travelUntil ?? "",
							onChange: (e) => persist({
								...state,
								travelUntil: e.target.value || null
							}),
							className: "mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm font-normal"
						}),
						state.travelUntil ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-2 text-xs text-ridge underline-offset-2 hover:underline",
							onClick: () => persist({
								...state,
								travelUntil: null
							}),
							children: t.clearTravel
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-line bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-ink",
						children: t.accessTitle
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-2 gap-2",
						children: ACCESS_FLAGS.map((flag) => {
							const blocked = (state.blockedAccess ?? []).includes(flag);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								id: `access-${flag}`,
								type: "button",
								"aria-pressed": !blocked,
								onClick: () => {
									const current = new Set(state.blockedAccess ?? []);
									if (blocked) current.delete(flag);
									else current.add(flag);
									persist({
										...state,
										blockedAccess: [...current]
									});
								},
								className: cn("min-h-11 rounded-lg border px-3 text-sm", blocked ? "border-line bg-paper text-ink-muted" : "border-ridge bg-paper-warm text-ink"),
								children: t.access[flag]
							}, flag);
						})
					})]
				})]
			}),
			ahead.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-ink-soft",
				children: [
					copy.tools.plan.ahead,
					": ",
					ahead.slice(1).map((w) => fillTemplate(copy.tools.plan.weekLabel, { n: w.calendar })).join(" · ")
				]
			}) : null
		]
	});
}
function AppPage({ locale, copy }) {
	const { user, isPending } = useCurrentUserState();
	const [tab, setTab] = (0, import_react.useState)("today");
	const [enrollments, setEnrollments] = (0, import_react.useState)([]);
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	const [savedFlash, setSavedFlash] = (0, import_react.useState)(false);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [editing, setEditing] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		if (!getFounding()) setFounding({
			name: user.displayName ?? "Athlete",
			email: user.primaryEmail ?? "",
			startedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
		const local = loadProfile();
		if (local) setProfile(local);
		let cancelled = false;
		Promise.all([listEnrollments(), loadAthleteBundle()]).then(([rows, bundle]) => {
			if (cancelled) return;
			setEnrollments(rows);
			if (rows[0]) savePlan(rows[0].state);
			if (bundle.profile) {
				saveProfile(bundle.profile);
				setProfile(bundle.profile);
			}
			setLoaded(true);
		}).catch(() => {
			if (!cancelled) setLoaded(true);
		});
		return () => {
			cancelled = true;
		};
	}, [user?.id]);
	async function persistRemote(state) {
		if (!state) return;
		try {
			const row = await saveEnrollmentState({ data: {
				objective: state.objective,
				state
			} });
			setEnrollments((prev) => {
				const rest = prev.filter((e) => e.objective !== row.objective);
				return [row, ...rest];
			});
			setSavedFlash(true);
			window.setTimeout(() => setSavedFlash(false), 1800);
		} catch {}
		const latest = recentDaily()[recentDaily().length - 1];
		if (latest) saveDailyRemote({ data: {
			date: latest.date,
			payload: {
				sleep: latest.sleep,
				soreness: latest.soreness,
				motivation: latest.motivation,
				fatigue: latest.fatigue,
				stress: latest.stress,
				rhr: latest.rhr,
				hrv: latest.hrv,
				lastEffort: latest.lastEffort
			},
			call: latest.call,
			overridden: latest.overridden
		} }).catch(() => void 0);
	}
	function completeProfile(next) {
		saveProfile(next);
		setProfile(next);
		setEditing(false);
		const current = enrollments.find((row) => row.objective === next.goal)?.state ?? loadPlan();
		if (!current || current.objective !== next.goal) {
			const plan = startPlan(next.goal, next.peakOn);
			savePlan(plan);
			persistRemote(plan);
		} else if (current.peakOn !== next.peakOn) {
			const plan = retargetPeak(current, next.peakOn);
			savePlan(plan);
			persistRemote(plan);
		} else {
			savePlan(current);
			persistRemote(current);
		}
		saveAthleteProfileRemote({ data: { profile: next } }).catch(() => void 0);
		setTab("today");
	}
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-16 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-48 animate-pulse rounded bg-paper-warm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 h-40 animate-pulse rounded-2xl bg-paper-warm" })]
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, { to: pagePath(locale, "login") });
	const hasProfile = profileReady(profile);
	const tabs = [
		{
			id: "today",
			label: copy.appPage.tabs.today
		},
		{
			id: "plan",
			label: copy.appPage.tabs.plan
		},
		{
			id: "prep",
			label: copy.appPage.tabs.prep
		},
		{
			id: "log",
			label: copy.appPage.tabs.log
		},
		{
			id: "profile",
			label: copy.appPage.tabs.profile
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium uppercase tracking-wider text-accent",
				children: copy.appPage.kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl rounded-2xl border border-accent bg-paper-warm/70 px-4 py-3 text-sm leading-relaxed text-ink",
				"data-test-period": "1",
				children: copy.appPage.testBanner
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-semibold tracking-tight text-ink",
					children: copy.appPage.h1
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-ink-muted leading-relaxed",
					children: copy.appPage.lead
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-full border border-line bg-card px-3 py-1 text-xs font-medium text-ink-muted",
					children: copy.dashboard.billingTest
				})]
			}),
			loaded && enrollments.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				"aria-label": copy.dashboard.enrollments,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold uppercase tracking-wider text-ridge",
					children: copy.dashboard.enrollments
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 grid gap-3 sm:grid-cols-2",
					children: enrollments.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl border border-line bg-card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg font-semibold text-ink",
								children: copy.tools.plan.objectives[row.objective].name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-ink-muted",
								children: [
									copy.dashboard.peak,
									" ",
									row.peakOn
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs font-medium uppercase tracking-wider text-accent",
								children: copy.dashboard.statusTest
							})
						]
					}, row.id))
				})]
			}) : loaded && hasProfile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm text-ink-muted",
				children: copy.dashboard.empty
			}) : null,
			savedFlash ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-ridge",
				children: copy.dashboard.saved
			}) : null,
			!hasProfile || editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {
					copy,
					initial: profile ?? (enrollments[0] ? emptyProfile({
						goal: enrollments[0].objective,
						peakOn: enrollments[0].peakOn
					}) : null),
					onComplete: completeProfile,
					onCancel: hasProfile ? () => setEditing(false) : void 0
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex flex-wrap gap-2",
					role: "tablist",
					children: tabs.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						role: "tab",
						"aria-selected": tab === item.id,
						onClick: () => setTab(item.id),
						className: cn("min-h-11 rounded-lg px-4 py-2 text-sm font-medium", tab === item.id ? "bg-ridge text-paper" : "border border-line bg-card text-ink-muted hover:bg-paper-warm"),
						children: item.label
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [
						tab === "today" && profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodayDesk, {
							copy,
							profile,
							onPersist: (s) => void persistRemote(s),
							onEditProfile: () => setEditing(true)
						}) : null,
						tab === "plan" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RollingPlan, {
							copy,
							profile,
							onPersist: (s) => void persistRemote(s)
						}) : null,
						tab === "prep" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrepLists, { copy }) : null,
						tab === "log" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecisionLog, { copy }) : null,
						tab === "profile" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {
							copy,
							initial: profile,
							onComplete: completeProfile
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaceGuide, { copy })
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: homeHash(locale, "disclaimer"),
					className: "text-ridge underline-offset-2 hover:underline",
					children: copy.disclaimer.h2
				})
			})
		]
	});
}
//#endregion
export { AppPage as t };
