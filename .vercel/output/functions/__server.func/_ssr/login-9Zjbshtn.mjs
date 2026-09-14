import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as isPathLocale, o as Route$6, w as getCopy } from "./router-Crh4553Z.mjs";
import { t as LoginPage } from "./login-page-DBSdBHzc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-9Zjbshtn.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { locale: raw } = Route$6.useParams();
	const locale = isPathLocale(raw) ? raw : "fi";
	const copy = getCopy(locale);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginPage, {
		locale,
		copy
	});
}
//#endregion
export { Page as component };
