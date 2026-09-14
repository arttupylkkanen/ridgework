import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as isPathLocale, u as Route$10, w as getCopy } from "./router-Crh4553Z.mjs";
import { n as SiteShell } from "./site-shell-D6MlXv5o.mjs";
import { t as AppPage } from "./app-page-C94Owwqs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-PKpo_HQi.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { locale: raw } = Route$10.useParams();
	const locale = isPathLocale(raw) ? raw : "fi";
	const copy = getCopy(locale);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, {
		locale,
		copy,
		page: "app",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppPage, {
			locale,
			copy
		})
	});
}
//#endregion
export { Page as component };
