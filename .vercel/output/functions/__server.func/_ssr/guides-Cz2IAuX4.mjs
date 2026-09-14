import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as isPathLocale, s as Route$7, w as getCopy } from "./router-Crh4553Z.mjs";
import { n as GuidesIndex } from "./guides-page-ChHQ20Rr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guides-Cz2IAuX4.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { locale: raw } = Route$7.useParams();
	const locale = isPathLocale(raw) ? raw : "fi";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuidesIndex, {
		locale,
		copy: getCopy(locale)
	});
}
//#endregion
export { Page as component };
