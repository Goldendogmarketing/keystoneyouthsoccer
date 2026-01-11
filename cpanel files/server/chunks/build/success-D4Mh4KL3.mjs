import { j as jsxRuntimeExports } from "./server.mjs";
import { R as Route$t, L as Link } from "./router-gg-f3raf.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { C as Card, b as CardHeader, a as CardContent } from "./card-ClXHriap.mjs";
import { C as CircleCheckBig } from "./circle-check-big-BIKbtM5o.mjs";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
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
import "./index-DzSr385F.mjs";
import "./utils-D4_p2_-I.mjs";
function RouteComponent() {
  const {
    registrationId
  } = Route$t.useSearch();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-2xl px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-10 w-10 text-green-600" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Registration Submitted!" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Your registration has been successfully submitted." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2", children: [
          "Registration ID: ",
          registrationId
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Next Steps:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "mt-2 list-inside list-decimal space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Complete payment to confirm your registration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Check your email for confirmation and payment instructions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Team assignments will be sent 2 weeks before the season starts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Bring your player to the first practice!" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: "View Dashboard" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Return Home" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground", children: "Questions? Contact us at 352.473.7777 or via email" })
    ] })
  ] }) });
}
export {
  RouteComponent as component
};
