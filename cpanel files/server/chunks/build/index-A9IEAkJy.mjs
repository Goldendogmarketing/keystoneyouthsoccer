import { j as jsxRuntimeExports } from "./server.mjs";
import { L as Link, q as queryOptions, g as getActiveSeasons } from "./router-gg-f3raf.mjs";
import { u as useSuspenseQuery } from "./useSuspenseQuery-Dsh8g2Xj.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { C as Card, a as CardContent, b as CardHeader, c as CardFooter } from "./card-ClXHriap.mjs";
import { B as Badge } from "./badge-C-B9-Nwc.mjs";
import { C as Calendar } from "./calendar-CzOox_IF.mjs";
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
import "./useBaseQuery-DdO5QD3T.mjs";
import "./index-DzSr385F.mjs";
import "./utils-D4_p2_-I.mjs";
const activeSeasonsQueryOptions = () => queryOptions({
  queryKey: ["seasons", "active"],
  queryFn: () => getActiveSeasons(),
  staleTime: 1e3 * 60 * 5
  // 5 minutes
});
function formatDate(dateString) {
  const date = /* @__PURE__ */ new Date(dateString + "T00:00:00");
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
function RouteComponent() {
  const {
    data: seasons
  } = useSuspenseQuery(activeSeasonsQueryOptions());
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-6xl px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold", children: "Youth Soccer Registration" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: "Join Keystone Youth Soccer and give your child an exciting season of fun, teamwork, and skill development!" })
    ] }),
    seasons.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mx-auto max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "mx-auto h-12 w-12 text-muted-foreground mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "No Open Registrations" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "There are no seasons with open registration at this time. Please check back later or contact us for more information." })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: seasons.map((season) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: season.name }),
          season.ageGroups && season.ageGroups.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
            "Ages: ",
            season.ageGroups.join(", ")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "bg-green-100 text-green-700", children: "Open" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex-1 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Season:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            formatDate(season.startDate),
            " - ",
            formatDate(season.endDate)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Registration Closes:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(season.registrationCloseDate) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-primary", children: [
            "$",
            season.registrationFee.toFixed(2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "per player" }),
          season.lateFee > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-orange-600 mt-1", children: [
            "Late fee: $",
            season.lateFee.toFixed(2),
            " after registration closes"
          ] })
        ] }),
        season.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground pt-2", children: season.description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "w-full", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register/$seasonId", params: {
        seasonId: season.id
      }, children: "Register Now" }) }) })
    ] }, season.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Have questions? Contact us at",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:info@keystoneyouthsoccer.org", className: "text-primary hover:underline", children: "info@keystoneyouthsoccer.org" })
    ] }) })
  ] }) });
}
export {
  RouteComponent as component
};
