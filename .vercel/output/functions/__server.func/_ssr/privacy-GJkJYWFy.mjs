import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as copy$1 } from "./router-Crh4553Z.mjs";
import { n as SiteShell } from "./site-shell-D6MlXv5o.mjs";
import { t as LegalPage } from "./legal-page-Dz0pvwyJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-GJkJYWFy.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, {
		locale: "en",
		copy: copy$1,
		page: "privacy",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalPage, {
			copy: copy$1,
			title: copy$1.privacyPage.title,
			updated: copy$1.privacyPage.updated,
			body: copy$1.privacyPage.body
		})
	});
}
//#endregion
export { Page as component };
