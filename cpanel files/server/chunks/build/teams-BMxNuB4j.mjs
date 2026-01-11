import { j as jsxRuntimeExports } from "./server.mjs";
import { u as useQuery } from "./useQuery-Dr19c9_1.mjs";
import { g as getAllTeams } from "./get-all-teams-DJAhV5d6.mjs";
import { C as Card, b as CardHeader, d as CardTitle, a as CardContent } from "./card-ClXHriap.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { B as Badge } from "./badge-C-B9-Nwc.mjs";
import { P as Plus } from "./plus-DU_Oax2u.mjs";
import { S as SquarePen } from "./square-pen-XTP3BpHZ.mjs";
import { U as Users } from "./users-BvmkJGmf.mjs";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./useBaseQuery-DdO5QD3T.mjs";
import "./router-gg-f3raf.mjs";
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
import "./utils-D4_p2_-I.mjs";
import "./index-DzSr385F.mjs";
function AdminTeamsPage() {
  const {
    data: teams,
    isLoading
  } = useQuery({
    queryKey: ["admin-teams"],
    queryFn: async () => await getAllTeams()
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Teams Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
          "Manage teams and rosters (",
          teams?.length || 0,
          " teams)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
        "Create Team"
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Loading teams..." }) }) : teams && teams.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: teams.map((team) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: team.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: team.ageGroup })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Division" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: team.division || "Not assigned" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Season" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: team.season || "Not assigned" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Head Coach" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: team.headCoach || "Not assigned" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-t pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
            team.rosterCount,
            " player",
            team.rosterCount !== 1 ? "s" : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full", children: "Manage Roster" })
      ] })
    ] }, team.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "No teams created yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
        "Create Your First Team"
      ] })
    ] }) })
  ] });
}
export {
  AdminTeamsPage as component
};
