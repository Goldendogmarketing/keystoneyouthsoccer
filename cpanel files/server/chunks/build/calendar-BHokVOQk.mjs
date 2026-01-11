import { j as jsxRuntimeExports, C as ClientOnly } from "./server.mjs";
import { C as Card, a as CardContent } from "./card-ClXHriap.mjs";
import { b as LoaderCircle } from "./router-gg-f3raf.mjs";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./utils-D4_p2_-I.mjs";
import "./middleware-BXaiHw3P.mjs";
import "./db-COtzJr4P.mjs";
import "os";
import "fs";
import "net";
import "tls";
import "perf_hooks";
import "./auth-DnREO_GR.mjs";
import "./aggregate-BaXeGeea.mjs";
import "./users.schema-CUS3FIEB.mjs";
function AdminCalendar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ClientOnly, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarLoadingFallback, {}) });
}
function CalendarLoadingFallback() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Calendar" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) }) }) })
  ] });
}
export {
  AdminCalendar as component
};
