import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as isPathLocale, c as Route$8, w as getCopy } from "./router-Crh4553Z.mjs";
import { n as SiteShell } from "./site-shell-D6MlXv5o.mjs";
import { t as FoundingInvite } from "./founding-invite-CzUE_e6V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/founding-Bd1ddBTL.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { locale: raw } = Route$8.useParams();
	const locale = isPathLocale(raw) ? raw : "fi";
	const copy = getCopy(locale);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, {
		locale,
		copy,
		page: "founding",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoundingInvite, {
			locale,
			copy
		})
	});
}
//#endregion
export { Page as component };
