import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as isPathLocale, l as Route$9, w as getCopy } from "./router-Crh4553Z.mjs";
import { n as SiteShell } from "./site-shell-D6MlXv5o.mjs";
import { t as FieldPage } from "./field-page-CCAkmkNn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/field-D4UAW2FW.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { locale: raw } = Route$9.useParams();
	const locale = isPathLocale(raw) ? raw : "fi";
	const copy = getCopy(locale);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, {
		locale,
		copy,
		page: "field",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldPage, {
			locale,
			copy
		})
	});
}
//#endregion
export { Page as component };
