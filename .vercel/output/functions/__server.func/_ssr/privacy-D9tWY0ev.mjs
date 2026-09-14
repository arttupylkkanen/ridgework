import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as isPathLocale, a as Route$5, w as getCopy } from "./router-Crh4553Z.mjs";
import { n as SiteShell } from "./site-shell-D6MlXv5o.mjs";
import { t as LegalPage } from "./legal-page-Dz0pvwyJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-D9tWY0ev.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { locale: raw } = Route$5.useParams();
	const locale = isPathLocale(raw) ? raw : "fi";
	const copy = getCopy(locale);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, {
		locale,
		copy,
		page: "privacy",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalPage, {
			copy,
			title: copy.privacyPage.title,
			updated: copy.privacyPage.updated,
			body: copy.privacyPage.body
		})
	});
}
//#endregion
export { Page as component };
