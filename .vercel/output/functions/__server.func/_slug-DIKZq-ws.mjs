import { b as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { r as Route$3, w as getCopy } from "./_ssr/router-Crh4553Z.mjs";
import { t as GuideArticle } from "./_ssr/guides-page-ChHQ20Rr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DIKZq-ws.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { slug } = Route$3.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuideArticle, {
		locale: "en",
		copy: getCopy("en"),
		slug
	});
}
//#endregion
export { Page as component };
