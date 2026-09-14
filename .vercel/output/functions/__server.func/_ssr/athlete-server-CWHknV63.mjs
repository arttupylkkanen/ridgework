import { r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-CWLrYAZJ.mjs";
import { It as object, Ot as _enum, Vt as unknown, jt as boolean, zt as string } from "../_libs/@better-auth/core+[...].mjs";
import { s as authMiddleware } from "./rolling-plan-0XNML9Q3.mjs";
import { v as isAthleteProfile, y as isDailyInputs } from "./daily-readiness-DzLn9haq.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/athlete-server-CWHknV63.js
function parseProfile(raw) {
	const value = typeof raw === "string" ? JSON.parse(raw) : raw;
	return isAthleteProfile(value) ? value : null;
}
function parseDaily(row) {
	const payload = typeof row.payload === "string" ? JSON.parse(row.payload) : row.payload;
	if (!isDailyInputs(payload)) return null;
	return {
		...payload,
		date: String(row.on_date).slice(0, 10),
		call: row.call,
		overridden: Boolean(row.overridden),
		at: String(row.created_at)
	};
}
var loadAthleteBundle_createServerFn_handler = createServerRpc({
	id: "529229eddb1c1e5b9b147217fb666457f4a533b531928878449858983009855e",
	name: "loadAthleteBundle",
	filename: "src/lib/athlete-server.ts"
}, (opts) => loadAthleteBundle.__executeServer(opts));
var loadAthleteBundle = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(loadAthleteBundle_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const profiles = await sql`
      select user_id, profile, updated_at from athlete_profiles where user_id = ${context.userId}
    `;
	const dailies = await sql`
      select on_date, payload, call, overridden, created_at
        from daily_checkins
       where user_id = ${context.userId}
       order by on_date desc
       limit 28
    `;
	return {
		profile: profiles[0] ? parseProfile(profiles[0].profile) : null,
		daily: dailies.map(parseDaily).filter((row) => Boolean(row))
	};
});
var saveAthleteProfileRemote_createServerFn_handler = createServerRpc({
	id: "6d950b74d5f28d447f0bea22b7ddde338b10396def3627fa296e74ff9b4289be",
	name: "saveAthleteProfileRemote",
	filename: "src/lib/athlete-server.ts"
}, (opts) => saveAthleteProfileRemote.__executeServer(opts));
var saveAthleteProfileRemote = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ profile: unknown() })).handler(saveAthleteProfileRemote_createServerFn_handler, async ({ context, data }) => {
	if (!isAthleteProfile(data.profile)) throw new Error("Invalid athlete profile");
	const sql = await getSql();
	const payload = JSON.stringify(data.profile);
	await sql.query(`insert into athlete_profiles (user_id, profile, updated_at)
       values ($1, $2::jsonb, now())
       on conflict (user_id) do update set profile = excluded.profile, updated_at = now()`, [context.userId, payload]);
	return { ok: true };
});
var saveDailyRemote_createServerFn_handler = createServerRpc({
	id: "e447276f4e112ba68748517e2cc82ebbf20d4313129a22dd5315b92080725dbf",
	name: "saveDailyRemote",
	filename: "src/lib/athlete-server.ts"
}, (opts) => saveDailyRemote.__executeServer(opts));
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
})).handler(saveDailyRemote_createServerFn_handler, async ({ context, data }) => {
	if (!isDailyInputs(data.payload)) throw new Error("Invalid daily check-in");
	const sql = await getSql();
	const payload = JSON.stringify(data.payload);
	await sql.query(`insert into daily_checkins (user_id, on_date, payload, call, overridden, created_at)
       values ($1, $2::date, $3::jsonb, $4, $5, now())
       on conflict (user_id, on_date) do update set
         payload = excluded.payload,
         call = excluded.call,
         overridden = excluded.overridden,
         created_at = now()`, [
		context.userId,
		data.date,
		payload,
		data.call,
		data.overridden
	]);
	return { ok: true };
});
//#endregion
export { loadAthleteBundle_createServerFn_handler, saveAthleteProfileRemote_createServerFn_handler, saveDailyRemote_createServerFn_handler };
