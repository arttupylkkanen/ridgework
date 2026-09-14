import { n as createMiddleware } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rolling-plan-0XNML9Q3.js
/**
* Auth middleware for server functions — the standard way to get the caller's
* verified user id. When deployed the session cookie is same-origin and rides
* along automatically. In the live preview the client also forwards the bearer
* token (partitioned cookies) via the `.client` hook below — call sites do not
* thread it themselves.
*
*   import { createServerFn } from "@tanstack/react-start";
*   import { getSql } from "@/lib/db";
*   import { authMiddleware } from "@/lib/auth/middleware";
*
*   export const listTodos = createServerFn({ method: "GET" })
*     .middleware([authMiddleware])
*     .handler(async ({ context }) => {
*       const sql = await getSql();
*       return sql`select * from todos where user_id = ${context.userId}`;
*     });
*
* Signed out with auth on (live preview included) -> throws `UnauthorizedError`
* (see `verify.server.ts`). With auth disabled (`VITE_AUTH_ENABLED=false`, the
* shipped default) it resolves the shared dev user — but throws instead when a
* `DATABASE_URL` is also set, so an app without sign-in must not use this at
* all. On the auth-on path, use it on every server function that touches
* per-user data and scope every query by `context.userId`.
*/
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-B40BzJxt.mjs").then((n) => n.n).then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { requireUserId } = await import("./verify.server-eZ4CrkMW.mjs");
	assertSameSiteRequest();
	return next({ context: { userId: await requireUserId(context.bearerToken) } });
});
var OBJECTIVES = [
	"engine",
	"trail20",
	"fifty",
	"ultra100",
	"alpine",
	"traverse",
	"expedition"
];
var KEY = "ridgework-rolling-v2";
var PLAN_EVENT = "ridgework-rolling";
/** Recommended full build — extra weeks beyond this stay in aerobic base. */
var SPECS = {
	engine: {
		base: 12,
		specific: 3,
		taper: 1
	},
	trail20: {
		base: 5,
		specific: 4,
		taper: 1
	},
	fifty: {
		base: 10,
		specific: 12,
		taper: 2
	},
	ultra100: {
		base: 14,
		specific: 18,
		taper: 4
	},
	alpine: {
		base: 6,
		specific: 3,
		taper: 1
	},
	traverse: {
		base: 20,
		specific: 10,
		taper: 2
	},
	expedition: {
		base: 22,
		specific: 14,
		taper: 4
	}
};
function canUseStorage() {
	return typeof window !== "undefined";
}
function parseIso(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return Date.UTC(y ?? 2026, (m ?? 1) - 1, d ?? 1);
}
function todayIso(now = /* @__PURE__ */ new Date()) {
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
function addDaysIso(fromIso, days) {
	const [y, m, d] = fromIso.split("-").map(Number);
	const dt = new Date(Date.UTC(y ?? 2026, (m ?? 1) - 1, d ?? 1));
	dt.setUTCDate(dt.getUTCDate() + days);
	return dt.toISOString().slice(0, 10);
}
function daysBetween(fromIso, toIso) {
	return Math.round((parseIso(toIso) - parseIso(fromIso)) / 864e5);
}
function weeksBetween(fromIso, toIso) {
	const days = daysBetween(fromIso, toIso);
	if (days < 1) return 0;
	return Math.max(1, Math.round(days / 7));
}
/** Monday of the week that contains iso (ISO week, Monday start). */
function weekMonday(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	const dt = new Date(Date.UTC(y ?? 2026, (m ?? 1) - 1, d ?? 1));
	const dow = dt.getUTCDay();
	const offset = dow === 0 ? 6 : dow - 1;
	dt.setUTCDate(dt.getUTCDate() - offset);
	return dt.toISOString().slice(0, 10);
}
function sessionDate(state, calendar, dayIndex) {
	return addDaysIso(weekMonday(state.startedOn), (calendar - 1) * 7 + dayIndex);
}
function pointerForDate(state, dateIso) {
	const diff = daysBetween(weekMonday(state.startedOn), dateIso);
	if (diff < 0) return {
		calendar: 1,
		dayIndex: 0
	};
	const calendar = Math.floor(diff / 7) + 1;
	if (calendar > planLength(state)) return null;
	return {
		calendar,
		dayIndex: diff % 7
	};
}
function recommendedWeeks(id) {
	const s = SPECS[id];
	return s.base + s.specific + s.taper;
}
function suggestedPeakOn(id, fromIso = todayIso()) {
	return addDaysIso(fromIso, recommendedWeeks(id) * 7);
}
function fitSpec(id, weeks) {
	const rec = SPECS[id];
	const W = Math.max(1, Math.floor(weeks));
	const recTotal = rec.base + rec.specific + rec.taper;
	if (W >= recTotal) return {
		base: rec.base + (W - recTotal),
		specific: rec.specific,
		taper: rec.taper
	};
	let base = rec.base;
	let specific = rec.specific;
	let taper = rec.taper;
	let deficit = recTotal - W;
	const fromBase = Math.min(deficit, base);
	base -= fromBase;
	deficit -= fromBase;
	if (deficit > 0) {
		const fromSpec = Math.min(deficit, specific);
		specific -= fromSpec;
		deficit -= fromSpec;
	}
	if (deficit > 0) taper -= Math.min(deficit, Math.max(0, taper - 1));
	return {
		base,
		specific,
		taper
	};
}
function qualityFor(id, weeks) {
	const rec = recommendedWeeks(id);
	if (weeks > rec) return "generous";
	if (weeks >= rec) return "full";
	if (weeks >= Math.ceil(rec * .7)) return "solid";
	if (weeks >= Math.ceil(rec * .4)) return "tight";
	return "short";
}
function planLength(state) {
	return Math.max(1, weeksBetween(state.startedOn, state.peakOn));
}
function remainingWeeks(state, calendar = state.calendar) {
	return planLength(state) - calendar + 1;
}
function phaseOf(state, calendar = state.calendar) {
	const rem = remainingWeeks(state, calendar);
	if (rem <= 0) return "done";
	const spec = fitSpec(state.objective, planLength(state));
	if (rem <= spec.taper) return "taper";
	if (rem <= spec.taper + spec.specific) return "specific";
	return "base";
}
function timeline(state) {
	const spec = fitSpec(state.objective, planLength(state));
	return {
		base: spec.base,
		specific: spec.specific,
		taper: spec.taper,
		total: planLength(state),
		progress: Math.min(state.calendar - 1, planLength(state)),
		phase: phaseOf(state),
		remaining: remainingWeeks(state),
		quality: qualityFor(state.objective, planLength(state)),
		peakOn: state.peakOn
	};
}
var EASY_WEEK = [
	{
		kind: "easy",
		key: "easy"
	},
	{
		kind: "easy",
		key: "easy"
	},
	{
		kind: "rest",
		key: "rest"
	},
	{
		kind: "easy",
		key: "easy"
	},
	{
		kind: "rest",
		key: "rest"
	},
	{
		kind: "easy",
		key: "long"
	},
	{
		kind: "easy",
		key: "easy"
	}
];
var EASED_WEEK = [
	{
		kind: "easy",
		key: "recovery"
	},
	{
		kind: "easy",
		key: "easy"
	},
	{
		kind: "rest",
		key: "rest"
	},
	{
		kind: "easy",
		key: "easy"
	},
	{
		kind: "rest",
		key: "rest"
	},
	{
		kind: "easy",
		key: "recovery"
	},
	{
		kind: "easy",
		key: "easy"
	}
];
var TAPER_WEEK = [
	{
		kind: "easy",
		key: "easy"
	},
	{
		kind: "hard",
		key: "sharpness"
	},
	{
		kind: "easy",
		key: "easy"
	},
	{
		kind: "rest",
		key: "rest"
	},
	{
		kind: "rest",
		key: "rest"
	},
	{
		kind: "easy",
		key: "easy"
	},
	{
		kind: "rest",
		key: "rest"
	}
];
function daysFor(phase, objective, eased) {
	if (eased) return EASED_WEEK;
	if (phase === "taper") {
		if (objective === "engine") return [
			{
				kind: "easy",
				key: "recovery"
			},
			{
				kind: "easy",
				key: "easy"
			},
			{
				kind: "rest",
				key: "rest"
			},
			{
				kind: "easy",
				key: "easy"
			},
			{
				kind: "rest",
				key: "rest"
			},
			{
				kind: "easy",
				key: "recovery"
			},
			{
				kind: "rest",
				key: "rest"
			}
		];
		return TAPER_WEEK;
	}
	if (objective === "engine") {
		if (phase === "base") return [
			{
				kind: "easy",
				key: "easy"
			},
			{
				kind: "easy",
				key: "engine"
			},
			{
				kind: "rest",
				key: "rest"
			},
			{
				kind: "easy",
				key: "easy"
			},
			{
				kind: "rest",
				key: "rest"
			},
			{
				kind: "easy",
				key: "long"
			},
			{
				kind: "easy",
				key: "easy"
			}
		];
		return [
			{
				kind: "easy",
				key: "easy"
			},
			{
				kind: "easy",
				key: "engine"
			},
			{
				kind: "rest",
				key: "rest"
			},
			{
				kind: "easy",
				key: "hike"
			},
			{
				kind: "rest",
				key: "rest"
			},
			{
				kind: "easy",
				key: "long"
			},
			{
				kind: "easy",
				key: "easy"
			}
		];
	}
	if (phase === "base") {
		if (objective === "expedition") return [
			{
				kind: "easy",
				key: "easy"
			},
			{
				kind: "easy",
				key: "hike"
			},
			{
				kind: "rest",
				key: "rest"
			},
			{
				kind: "easy",
				key: "easy"
			},
			{
				kind: "rest",
				key: "rest"
			},
			{
				kind: "easy",
				key: "long"
			},
			{
				kind: "easy",
				key: "easy"
			}
		];
		if (objective === "alpine" || objective === "traverse") return [
			{
				kind: "easy",
				key: "easy"
			},
			{
				kind: "steady",
				key: "climb"
			},
			{
				kind: "rest",
				key: "rest"
			},
			{
				kind: "easy",
				key: "easy"
			},
			{
				kind: "rest",
				key: "rest"
			},
			{
				kind: "easy",
				key: "hike"
			},
			{
				kind: "easy",
				key: "easy"
			}
		];
		return EASY_WEEK;
	}
	if (objective === "expedition") return [
		{
			kind: "easy",
			key: "easy"
		},
		{
			kind: "steady",
			key: "climb"
		},
		{
			kind: "easy",
			key: "easy"
		},
		{
			kind: "rest",
			key: "rest"
		},
		{
			kind: "rest",
			key: "rest"
		},
		{
			kind: "steady",
			key: "pack"
		},
		{
			kind: "easy",
			key: "hike"
		}
	];
	if (objective === "alpine" || objective === "traverse") return [
		{
			kind: "easy",
			key: "easy"
		},
		{
			kind: "hard",
			key: "climb"
		},
		{
			kind: "easy",
			key: "easy"
		},
		{
			kind: "hard",
			key: "strength"
		},
		{
			kind: "rest",
			key: "rest"
		},
		{
			kind: "steady",
			key: "mountain"
		},
		{
			kind: "easy",
			key: "easy"
		}
	];
	if (objective === "ultra100") return [
		{
			kind: "easy",
			key: "easy"
		},
		{
			kind: "hard",
			key: "quality"
		},
		{
			kind: "easy",
			key: "easy"
		},
		{
			kind: "easy",
			key: "easy"
		},
		{
			kind: "rest",
			key: "rest"
		},
		{
			kind: "easy",
			key: "long"
		},
		{
			kind: "easy",
			key: "easy"
		}
	];
	if (objective === "trail20") return [
		{
			kind: "easy",
			key: "easy"
		},
		{
			kind: "hard",
			key: "quality"
		},
		{
			kind: "easy",
			key: "easy"
		},
		{
			kind: "rest",
			key: "rest"
		},
		{
			kind: "easy",
			key: "easy"
		},
		{
			kind: "easy",
			key: "long"
		},
		{
			kind: "rest",
			key: "rest"
		}
	];
	return [
		{
			kind: "easy",
			key: "easy"
		},
		{
			kind: "hard",
			key: "quality"
		},
		{
			kind: "easy",
			key: "easy"
		},
		{
			kind: "steady",
			key: "steady"
		},
		{
			kind: "rest",
			key: "rest"
		},
		{
			kind: "easy",
			key: "long"
		},
		{
			kind: "easy",
			key: "easy"
		}
	];
}
function templateDays(phase, objective, eased = false) {
	return daysFor(phase, objective, eased).map((day) => ({ ...day }));
}
var HARD_KEYS = /* @__PURE__ */ new Set([
	"quality",
	"sharpness",
	"vert",
	"mountain",
	"pack",
	"long",
	"climb",
	"strength"
]);
/** Rewrite this week's days from how the body feels — preview before log. */
function adaptWeek(week, result, _objective) {
	if (result === "good" || result === "ok") return {
		...week,
		eased: false,
		days: week.days
	};
	if (result === "problem") return {
		...week,
		eased: true,
		days: week.days.map((day) => {
			if (day.kind === "hard" || day.kind === "steady") return {
				...day,
				kind: "easy",
				key: "easy"
			};
			if (HARD_KEYS.has(day.key)) return {
				...day,
				kind: "easy",
				key: "recovery"
			};
			return day;
		})
	};
	return {
		...week,
		eased: true,
		days: week.days.map((day) => {
			if (day.kind === "rest") return day;
			if (day.kind === "easy" && !HARD_KEYS.has(day.key)) return day;
			return {
				...day,
				kind: "rest",
				key: "rest",
				minutes: 0
			};
		})
	};
}
function weekChanges(written, shown) {
	const out = [];
	for (let i = 0; i < written.days.length; i += 1) {
		const from = written.days[i]?.key;
		const to = shown.days[i]?.key;
		if (from && to && from !== to) out.push({
			day: i,
			from,
			to
		});
	}
	return out;
}
function weekAt(state, calendar) {
	if (calendar - state.calendar < 0) return null;
	const phase = phaseOf(state, calendar);
	if (phase === "done") return null;
	return {
		calendar,
		phase,
		eased: false,
		days: daysFor(phase, state.objective, false)
	};
}
function visibleWeeks(state) {
	const out = [];
	for (let i = 0; i < 3; i += 1) {
		const week = weekAt(state, state.calendar + i);
		if (!week) break;
		out.push(week);
	}
	return out;
}
function startPlan(objective, peakOn, now = /* @__PURE__ */ new Date(), season = 1) {
	return {
		objective,
		startedOn: todayIso(now),
		peakOn,
		progress: 0,
		extraBase: 0,
		calendar: 1,
		checkins: [],
		season,
		logs: [],
		adjustments: [],
		travelUntil: null,
		blockedAccess: []
	};
}
function nextSeason(state, peakOn, now = /* @__PURE__ */ new Date()) {
	return startPlan(state.objective, peakOn, now, state.season + 1);
}
function applyCheckin(state, result, note) {
	if (phaseOf(state) === "done") return state;
	const next = {
		...state,
		checkins: [...state.checkins, {
			calendar: state.calendar,
			result,
			note: note.trim(),
			at: (/* @__PURE__ */ new Date()).toISOString()
		}],
		calendar: state.calendar + 1
	};
	if (result === "problem" || result === "wrecked") {
		next.extraBase = state.extraBase + 1;
		return next;
	}
	next.progress = state.progress + 1;
	return next;
}
/** Peak date only moves when the athlete sets a new one. Tired weeks do not. */
function retargetPeak(state, peakOn, at = (/* @__PURE__ */ new Date()).toISOString()) {
	if (peakOn === state.peakOn) return state;
	const extra = Math.max(0, weeksBetween(state.startedOn, peakOn) - weeksBetween(state.startedOn, state.peakOn));
	const adj = {
		at,
		date: todayIso(),
		trigger: "peak",
		from: "easy",
		to: "easy",
		reason: {
			id: "peakMoved",
			values: {
				from: state.peakOn,
				to: peakOn,
				extra
			}
		}
	};
	return {
		...state,
		peakOn,
		adjustments: [adj, ...state.adjustments ?? []].slice(0, 40)
	};
}
/** Slide the written week forward if the athlete skipped logging. No fake check-ins. */
function syncCalendarToToday(state, today = todayIso()) {
	const ptr = pointerForDate(state, today);
	if (!ptr || ptr.calendar <= state.calendar) return state;
	let next = state;
	while (next.calendar < ptr.calendar && phaseOf(next) !== "done") next = {
		...next,
		calendar: next.calendar + 1,
		progress: next.progress + 1
	};
	return next;
}
function logFor(state, date, dayIndex) {
	return (state.logs ?? []).find((row) => row.date === date && (dayIndex === void 0 || row.dayIndex === dayIndex));
}
function isRollingState(value) {
	if (!value || typeof value !== "object") return false;
	const parsed = value;
	return OBJECTIVES.includes(parsed.objective) && typeof parsed.startedOn === "string" && typeof parsed.peakOn === "string" && typeof parsed.progress === "number" && typeof parsed.extraBase === "number" && typeof parsed.calendar === "number" && Array.isArray(parsed.checkins);
}
function loadPlan() {
	if (!canUseStorage()) return null;
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!isRollingState(parsed)) return null;
		return {
			...parsed,
			season: parsed.season || 1,
			logs: parsed.logs ?? [],
			adjustments: parsed.adjustments ?? [],
			travelUntil: parsed.travelUntil ?? null,
			blockedAccess: parsed.blockedAccess ?? []
		};
	} catch {
		return null;
	}
}
function savePlan(state) {
	if (!canUseStorage()) return;
	try {
		if (state) localStorage.setItem(KEY, JSON.stringify(state));
		else localStorage.removeItem(KEY);
		window.dispatchEvent(new Event(PLAN_EVENT));
	} catch {}
}
//#endregion
export { weeksBetween as A, suggestedPeakOn as C, todayIso as D, timeline as E, visibleWeeks as O, startPlan as S, templateDays as T, recommendedWeeks as _, addDaysIso as a, savePlan as b, daysBetween as c, loadPlan as d, logFor as f, qualityFor as g, pointerForDate as h, adaptWeek as i, weekChanges as k, fitSpec as l, phaseOf as m, OBJECTIVES as n, applyCheckin as o, nextSeason as p, PLAN_EVENT as r, authMiddleware as s, HARD_KEYS as t, isRollingState as u, remainingWeeks as v, syncCalendarToToday as w, sessionDate as x, retargetPeak as y };
