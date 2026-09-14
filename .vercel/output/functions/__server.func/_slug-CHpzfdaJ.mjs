import { b as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { D as isPathLocale, n as Route$2, w as getCopy } from "./_ssr/router-Crh4553Z.mjs";
import { t as GuideArticle } from "./_ssr/guides-page-ChHQ20Rr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-CHpzfdaJ.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { locale: raw, slug } = Route$2.useParams();
	const locale = isPathLocale(raw) ? raw : "fi";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuideArticle, {
		locale,
		copy: getCopy(locale),
		slug
	});
}
//#endregion
export { Page as component };
