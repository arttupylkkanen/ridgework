import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as copy$5 } from "./router-Crh4553Z.mjs";
import { n as SiteShell } from "./site-shell-D6MlXv5o.mjs";
import { t as FieldPage } from "./field-page-CCAkmkNn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/field-CykV6ZnK.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, {
		locale: "en",
		copy: copy$5,
		page: "field",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldPage, {
			locale: "en",
			copy: copy$5
		})
	});
}
//#endregion
export { Page as component };
