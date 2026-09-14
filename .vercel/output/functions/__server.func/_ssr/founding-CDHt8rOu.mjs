//#region node_modules/.nitro/vite/services/ssr/assets/founding-CDHt8rOu.js
var KEY = "ridgework-founding-v1";
var FOUNDING_EVENT = "ridgework-founding";
function canUseStorage() {
	return typeof window !== "undefined";
}
function getFounding() {
	if (!canUseStorage()) return null;
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed?.email || !parsed?.startedAt) return null;
		return parsed;
	} catch {
		return null;
	}
}
function setFounding(record) {
	localStorage.setItem(KEY, JSON.stringify(record));
	window.dispatchEvent(new Event(FOUNDING_EVENT));
}
function subscribeFounding(onChange) {
	window.addEventListener(FOUNDING_EVENT, onChange);
	window.addEventListener("storage", onChange);
	return () => {
		window.removeEventListener(FOUNDING_EVENT, onChange);
		window.removeEventListener("storage", onChange);
	};
}
//#endregion
export { setFounding as n, subscribeFounding as r, getFounding as t };
