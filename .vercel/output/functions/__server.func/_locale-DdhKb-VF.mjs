import { b as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { D as isPathLocale, d as Route$11, w as getCopy } from "./_ssr/router-Crh4553Z.mjs";
import { n as SiteShell } from "./_ssr/site-shell-D6MlXv5o.mjs";
import { t as HomePage } from "./_ssr/home-page-B1YtlBff.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_locale-DdhKb-VF.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { locale: raw } = Route$11.useParams();
	const locale = isPathLocale(raw) ? raw : "fi";
	const copy = getCopy(locale);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, {
		locale,
		copy,
		page: "home",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomePage, {
			locale,
			copy
		})
	});
}
//#endregion
export { Page as component };
