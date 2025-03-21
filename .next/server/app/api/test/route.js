const CHUNK_PUBLIC_PATH = "server/app/api/test/route.js";
const runtime = require("../../../chunks/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/node_modules_14c8ad7d._.js");
runtime.loadChunk("server/chunks/node_modules_755be970._.js");
runtime.loadChunk("server/chunks/[root of the server]__6b42525d._.js");
runtime.getOrInstantiateRuntimeModule("[project]/.next-internal/server/app/api/test/route/actions.js [app-rsc] (server actions loader, ecmascript)", CHUNK_PUBLIC_PATH);
runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => \"[project]/app/api/test/route.js [app-route] (ecmascript)\" } [app-route] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => \"[project]/app/api/test/route.js [app-route] (ecmascript)\" } [app-route] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
