import { r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-CWLrYAZJ.mjs";
import { It as object, Ot as _enum, Vt as unknown, zt as string } from "../_libs/@better-auth/core+[...].mjs";
import { n as canCharge, t as TEST_BILLING_STATUS } from "./billing-BeRFwJx3.mjs";
import { n as OBJECTIVES, s as authMiddleware, u as isRollingState } from "./rolling-plan-0XNML9Q3.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/training-D4orwy-R.js
function parseState(raw) {
	const value = typeof raw === "string" ? JSON.parse(raw) : raw;
	if (!isRollingState(value)) throw new Error("Invalid training state");
	return value;
}
function toRecord(row) {
	return {
		id: Number(row.id),
		userId: row.user_id,
		objective: row.objective,
		peakOn: String(row.peak_on).slice(0, 10),
		startedOn: String(row.started_on).slice(0, 10),
		billingStatus: row.billing_status,
		stripeCustomerId: row.stripe_customer_id,
		stripeSubscriptionId: row.stripe_subscription_id,
		state: parseState(row.state),
		updatedAt: String(row.updated_at)
	};
}
var objectiveSchema = _enum(OBJECTIVES);
var listEnrollments_createServerFn_handler = createServerRpc({
	id: "5f2d596c2f9c9e5b0628e306e83637da508189d885368633489f5c298d91f7e2",
	name: "listEnrollments",
	filename: "src/lib/training.ts"
}, (opts) => listEnrollments.__executeServer(opts));
var listEnrollments = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listEnrollments_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select id, user_id, objective, peak_on, started_on, billing_status,
             stripe_customer_id, stripe_subscription_id, state, updated_at
      from enrollments
      where user_id = ${context.userId}
      order by updated_at desc
    `).map(toRecord);
});
var upsertEnrollment_createServerFn_handler = createServerRpc({
	id: "1f5538ff14e8735b17a022c766fbb83bd228d4402f02cee60c6c506b1bab9643",
	name: "upsertEnrollment",
	filename: "src/lib/training.ts"
}, (opts) => upsertEnrollment.__executeServer(opts));
var upsertEnrollment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	objective: objectiveSchema,
	peakOn: string().regex(/^\d{4}-\d{2}-\d{2}$/),
	startedOn: string().regex(/^\d{4}-\d{2}-\d{2}$/),
	state: unknown()
})).handler(upsertEnrollment_createServerFn_handler, async ({ context, data }) => {
	if (!isRollingState(data.state)) throw new Error("Invalid training state");
	const billing = canCharge() ? "active" : TEST_BILLING_STATUS;
	const sql = await getSql();
	const payload = JSON.stringify(data.state);
	const row = (await sql.query(`insert into enrollments
         (user_id, objective, peak_on, started_on, billing_status, state, updated_at)
       values ($1, $2, $3::date, $4::date, $5, $6::jsonb, now())
       on conflict (user_id, objective) do update set
         peak_on = excluded.peak_on,
         started_on = excluded.started_on,
         state = excluded.state,
         updated_at = now()
       returning id, user_id, objective, peak_on, started_on, billing_status,
                 stripe_customer_id, stripe_subscription_id, state, updated_at`, [
		context.userId,
		data.objective,
		data.peakOn,
		data.startedOn,
		billing,
		payload
	]))[0];
	if (!row) throw new Error("Enrollment failed");
	return toRecord(row);
});
var saveEnrollmentState_createServerFn_handler = createServerRpc({
	id: "a0d8777a2a078c473b662bb5af6b96c1c0a5caffe73e269b8b8e1b36a7ce6f6e",
	name: "saveEnrollmentState",
	filename: "src/lib/training.ts"
}, (opts) => saveEnrollmentState.__executeServer(opts));
var saveEnrollmentState = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	objective: objectiveSchema,
	state: unknown()
})).handler(saveEnrollmentState_createServerFn_handler, async ({ context, data }) => {
	if (!isRollingState(data.state)) throw new Error("Invalid training state");
	const sql = await getSql();
	const payload = JSON.stringify(data.state);
	const row = (await sql.query(`update enrollments
          set state = $1::jsonb,
              peak_on = $2::date,
              started_on = $3::date,
              updated_at = now()
        where user_id = $4 and objective = $5
        returning id, user_id, objective, peak_on, started_on, billing_status,
                  stripe_customer_id, stripe_subscription_id, state, updated_at`, [
		payload,
		data.state.peakOn,
		data.state.startedOn,
		context.userId,
		data.objective
	]))[0];
	if (!row) {
		const created = await sql.query(`insert into enrollments
           (user_id, objective, peak_on, started_on, billing_status, state, updated_at)
         values ($1, $2, $3::date, $4::date, $5, $6::jsonb, now())
         returning id, user_id, objective, peak_on, started_on, billing_status,
                   stripe_customer_id, stripe_subscription_id, state, updated_at`, [
			context.userId,
			data.objective,
			data.state.peakOn,
			data.state.startedOn,
			TEST_BILLING_STATUS,
			payload
		]);
		if (!created[0]) throw new Error("Save failed");
		return toRecord(created[0]);
	}
	return toRecord(row);
});
//#endregion
export { listEnrollments_createServerFn_handler, saveEnrollmentState_createServerFn_handler, upsertEnrollment_createServerFn_handler };
