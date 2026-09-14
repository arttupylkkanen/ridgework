import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as copy$7 } from "./router-Crh4553Z.mjs";
import { n as SiteShell } from "./site-shell-D6MlXv5o.mjs";
import { t as HomePage } from "./home-page-B1YtlBff.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CJLgdXuA.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, {
		locale: "en",
		copy: copy$7,
		page: "home",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomePage, {
			locale: "en",
			copy: copy$7
		})
	});
}
//#endregion
export { Home as component };
