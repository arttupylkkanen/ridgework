//#region node_modules/.nitro/vite/services/ssr/assets/billing-BeRFwJx3.js
var TEST_BILLING_STATUS = "test";
function polarWebhookSecret() {
	return (typeof process !== "undefined" ? process.env.POLAR_WEBHOOK_SECRET?.trim() : void 0) || null;
}
function canCharge() {
	return false;
}
//#endregion
export { canCharge as n, polarWebhookSecret as r, TEST_BILLING_STATUS as t };
