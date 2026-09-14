import { n as OBJECTIVES } from "./rolling-plan-0XNML9Q3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/daily-readiness-DzLn9haq.js
var SPORTS = [
	"running",
	"mountaineering",
	"mixed"
];
var DISCIPLINES = [
	"trail",
	"ultra",
	"alpine",
	"road",
	"ski"
];
var EXPERIENCE = [
	"beginner",
	"intermediate",
	"experienced",
	"veteran"
];
var VOLUME_BANDS = [
	"h0_3",
	"h3_5",
	"h5_8",
	"h8_12",
	"h12p"
];
var LONGEST_BANDS = [
	"m60",
	"m90",
	"m150",
	"m240",
	"m240p"
];
var TERRAIN = [
	"flat",
	"rolling",
	"mountain",
	"highAlpine"
];
var EQUIPMENT = [
	"trailShoes",
	"poles",
	"pack",
	"gym",
	"crampons",
	"iceAxe"
];
var CONSTRAINTS = [
	"shiftWork",
	"travelHeavy",
	"youngKids",
	"shortSleep",
	"deskJob"
];
var UNITS = ["km", "miles"];
var ACCESS_FLAGS = [
	"trail",
	"mountain",
	"gym",
	"climbing"
];
var PROFILE_KEY = "ridgework-athlete-v1";
var PROFILE_EVENT = "ridgework-athlete";
var ALL_AVAILABLE = [
	true,
	true,
	true,
	true,
	true,
	true,
	true
];
function weeklyMinutes(band) {
	switch (band) {
		case "h0_3": return 120;
		case "h3_5": return 240;
		case "h5_8": return 390;
		case "h8_12": return 600;
		case "h12p": return 780;
	}
}
function longestMinutes(band) {
	switch (band) {
		case "m60": return 50;
		case "m90": return 80;
		case "m150": return 120;
		case "m240": return 195;
		case "m240p": return 270;
	}
}
function availableCount(days) {
	return days.filter(Boolean).length;
}
function emptyProfile(partial = {}) {
	return {
		sport: "running",
		discipline: "trail",
		goal: "fifty",
		peakOn: "",
		eventName: "",
		weeklyHours: "h5_8",
		longest: "m90",
		experience: "intermediate",
		availableDays: [...ALL_AVAILABLE],
		terrain: "rolling",
		equipment: ["trailShoes"],
		constraints: [],
		limitations: "",
		units: "km",
		completedAt: "",
		...partial
	};
}
function isStringArray(value, allowed) {
	return Array.isArray(value) && value.every((item) => typeof item === "string" && allowed.includes(item));
}
function isAthleteProfile(value) {
	if (!value || typeof value !== "object") return false;
	const p = value;
	return SPORTS.includes(p.sport) && DISCIPLINES.includes(p.discipline) && OBJECTIVES.includes(p.goal) && typeof p.peakOn === "string" && typeof p.eventName === "string" && VOLUME_BANDS.includes(p.weeklyHours) && LONGEST_BANDS.includes(p.longest) && EXPERIENCE.includes(p.experience) && Array.isArray(p.availableDays) && p.availableDays.length === 7 && p.availableDays.every((d) => typeof d === "boolean") && TERRAIN.includes(p.terrain) && isStringArray(p.equipment, EQUIPMENT) && isStringArray(p.constraints, CONSTRAINTS) && typeof p.limitations === "string" && UNITS.includes(p.units) && typeof p.completedAt === "string";
}
function profileReady(profile) {
	return Boolean(profile && profile.completedAt && profile.peakOn && availableCount(profile.availableDays) >= 2);
}
function canUseStorage$1() {
	return typeof window !== "undefined";
}
function loadProfile() {
	if (!canUseStorage$1()) return null;
	try {
		const raw = localStorage.getItem(PROFILE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		return isAthleteProfile(parsed) ? parsed : null;
	} catch {
		return null;
	}
}
function saveProfile(profile) {
	if (!canUseStorage$1()) return;
	try {
		if (profile) localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
		else localStorage.removeItem(PROFILE_KEY);
		window.dispatchEvent(new Event(PROFILE_EVENT));
	} catch {}
}
function toggleList(list, item) {
	return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}
var SCALE = [
	1,
	2,
	3,
	4,
	5
];
var DAILY_KEY = "ridgework-daily-v1";
var DAILY_EVENT = "ridgework-daily";
var CALL_RANK = {
	ready: 0,
	reduce: 1,
	easy: 2,
	rest: 3
};
function stricter(a, b) {
	return CALL_RANK[a] >= CALL_RANK[b] ? a : b;
}
function emptyInputs() {
	return {
		sleep: 3,
		soreness: 2,
		motivation: 3,
		fatigue: 2,
		stress: 2
	};
}
function isScale(value) {
	return typeof value === "number" && SCALE.includes(value);
}
function isDailyInputs(value) {
	if (!value || typeof value !== "object") return false;
	const d = value;
	return isScale(d.sleep) && isScale(d.soreness) && isScale(d.motivation) && isScale(d.fatigue) && isScale(d.stress);
}
/**
* Transparent, ordered rules. Every firing rule is returned as a reason with
* the actual numbers. The call is the strictest rule that fired. Never a
* hidden composite score. Never a diagnosis.
*/
function assessReadiness(inputs, load = emptyLoad()) {
	const reasons = [];
	const drivers = [];
	let call = "ready";
	function fire(next, reason) {
		call = stricter(call, next);
		reasons.push(reason);
		drivers.push(reason);
	}
	if (inputs.fatigue === 5) fire("rest", {
		id: "fatigueHigh",
		values: { n: inputs.fatigue }
	});
	else if (inputs.fatigue >= 4) fire("easy", {
		id: "fatigueHigh",
		values: { n: inputs.fatigue }
	});
	else reasons.push({
		id: "fatigueOk",
		values: { n: inputs.fatigue }
	});
	if (inputs.sleep <= 2 && inputs.fatigue >= 4) fire("rest", {
		id: "sleepLow",
		values: { n: inputs.sleep }
	});
	else if (inputs.sleep <= 2) fire("easy", {
		id: "sleepLow",
		values: { n: inputs.sleep }
	});
	else reasons.push({
		id: "sleepOk",
		values: { n: inputs.sleep }
	});
	if (inputs.soreness >= 5 && (inputs.lastEffort ?? 3) >= 4) fire("rest", {
		id: "sorenessHigh",
		values: { n: inputs.soreness }
	});
	else if (inputs.soreness >= 4) fire("easy", {
		id: "sorenessHigh",
		values: { n: inputs.soreness }
	});
	else if (inputs.soreness >= 3 && inputs.fatigue >= 3) fire("reduce", {
		id: "sorenessHigh",
		values: { n: inputs.soreness }
	});
	if (inputs.motivation <= 2 && inputs.fatigue >= 3) fire("reduce", {
		id: "motivationLow",
		values: { n: inputs.motivation }
	});
	if (inputs.stress >= 4 && inputs.sleep <= 3) fire("reduce", {
		id: "stressHigh",
		values: { n: inputs.stress }
	});
	if (load.hardOrLongLast3Days >= 2 && inputs.sleep <= 2) fire("easy", {
		id: "loadCluster",
		values: { n: load.hardOrLongLast3Days }
	});
	else if (load.hardOrLongLast3Days >= 2) fire("reduce", {
		id: "loadCluster",
		values: { n: load.hardOrLongLast3Days }
	});
	else reasons.push({
		id: "normalLoad",
		values: { n: load.hardOrLongLast3Days }
	});
	if (load.yesterdayHard && (inputs.fatigue >= 3 || inputs.soreness >= 3)) fire("reduce", {
		id: "yesterdayHard",
		values: { key: load.yesterdayKey ?? "quality" }
	});
	if (typeof inputs.rhr === "number" && typeof load.rhrBaseline === "number" && load.rhrBaseline > 0) {
		const delta = inputs.rhr - load.rhrBaseline;
		if (delta >= 7) fire("reduce", {
			id: "rhrUp",
			values: {
				rhr: inputs.rhr,
				baseline: load.rhrBaseline,
				delta
			}
		});
	}
	if (typeof inputs.hrv === "number" && typeof load.hrvBaseline === "number" && load.hrvBaseline > 0) {
		const drop = (load.hrvBaseline - inputs.hrv) / load.hrvBaseline;
		if (drop >= .2) fire("reduce", {
			id: "hrvDown",
			values: {
				hrv: inputs.hrv,
				baseline: load.hrvBaseline,
				pct: Math.round(drop * 100)
			}
		});
	}
	return {
		call,
		reasons,
		drivers: drivers.length ? drivers : reasons.slice(0, 2)
	};
}
function emptyLoad() {
	return {
		hardOrLongLast3Days: 0,
		hardOrLongThisWeek: 0,
		yesterdayHard: false
	};
}
function baselineFrom(history, key) {
	const values = history.map((row) => row[key]).filter((n) => typeof n === "number" && n > 0);
	if (values.length < 3) return void 0;
	const recent = values.slice(-7);
	return Math.round(recent.reduce((a, b) => a + b, 0) / recent.length);
}
function canUseStorage() {
	return typeof window !== "undefined";
}
function loadDailyLog() {
	if (!canUseStorage()) return {};
	try {
		const raw = localStorage.getItem(DAILY_KEY);
		if (!raw) return {};
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object") return {};
		return parsed;
	} catch {
		return {};
	}
}
function saveDailyEntry(entry) {
	if (!canUseStorage()) return;
	try {
		const all = loadDailyLog();
		all[entry.date] = entry;
		localStorage.setItem(DAILY_KEY, JSON.stringify(all));
		window.dispatchEvent(new Event(DAILY_EVENT));
	} catch {}
}
function recentDaily(limit = 21) {
	return Object.values(loadDailyLog()).sort((a, b) => a.date.localeCompare(b.date)).slice(-limit);
}
//#endregion
export { recentDaily as C, weeklyMinutes as D, toggleList as E, profileReady as S, saveProfile as T, emptyProfile as _, EXPERIENCE as a, loadProfile as b, SPORTS as c, VOLUME_BANDS as d, assessReadiness as f, emptyLoad as g, emptyInputs as h, EQUIPMENT as i, TERRAIN as l, baselineFrom as m, CONSTRAINTS as n, LONGEST_BANDS as o, availableCount as p, DISCIPLINES as r, SCALE as s, ACCESS_FLAGS as t, UNITS as u, isAthleteProfile as v, saveDailyEntry as w, longestMinutes as x, isDailyInputs as y };
