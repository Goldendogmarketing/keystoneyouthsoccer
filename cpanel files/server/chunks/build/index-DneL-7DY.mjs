import { j as jsxRuntimeExports, a as createServerFn } from "./server.mjs";
import { L as Link } from "./router-gg-f3raf.mjs";
import { u as useQuery } from "./useQuery-Dr19c9_1.mjs";
import { c as createSsrRpc } from "./middleware-BXaiHw3P.mjs";
import { C as Card, b as CardHeader, d as CardTitle, a as CardContent } from "./card-ClXHriap.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { U as Users } from "./users-BvmkJGmf.mjs";
import { F as FileText } from "./file-text-CB-9r6-n.mjs";
import { D as DollarSign } from "./dollar-sign-BzamVIyO.mjs";
import { C as Calendar } from "./calendar-CzOox_IF.mjs";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
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
import "./utils-D4_p2_-I.mjs";
import "./index-DzSr385F.mjs";
const getDashboardOverview = createServerFn({
  method: "GET"
}).handler(createSsrRpc("b5546efabdcf52d9cb1b19bd6fda7c334c93222a76e46fbd1dcda86daaaa6b5f"));
function DashboardOverview() {
  const {
    data: stats
  } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: async () => await getDashboardOverview()
  });
  const statCards = [{
    title: "Total Players",
    value: stats?.totalPlayers || 0,
    icon: Users,
    description: "Registered players",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  }, {
    title: "Active Registrations",
    value: stats?.activeRegistrations || 0,
    icon: FileText,
    description: "Current season",
    color: "text-green-600",
    bgColor: "bg-green-100"
  }, {
    title: "Pending Payments",
    value: stats?.pendingPayments || 0,
    icon: DollarSign,
    description: "Requires attention",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Dashboard Overview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Welcome back! Here's what's happening with your players." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-3", children: statCards.map((stat) => {
      const Icon = stat.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: stat.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-full p-2 ${stat.bgColor}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 ${stat.color}` }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: stat.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: stat.description })
        ] })
      ] }, stat.title);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Quick Actions" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "h-auto flex-col items-start p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/my-players", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "mb-2 h-6 w-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: "Manage Players" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Add or edit player profiles" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "h-auto flex-col items-start p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/register", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mb-2 h-6 w-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: "New Registration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Register for upcoming season" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "h-auto flex-col items-start p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/registrations", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mb-2 h-6 w-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: "View Registrations" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Check registration status" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "h-auto flex-col items-start p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/schedule", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "mb-2 h-6 w-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: "View Schedule" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "See upcoming games and practices" })
          ] })
        ] }) })
      ] })
    ] }),
    stats && stats.pendingPayments > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-yellow-500 bg-yellow-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-yellow-900", children: "Action Required: Pending Payments" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-4 text-yellow-900", children: [
          "You have ",
          stats.pendingPayments,
          " registration",
          stats.pendingPayments > 1 ? "s" : "",
          " with pending payments."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/registrations", children: "Complete Payments" }) })
      ] })
    ] })
  ] });
}
export {
  DashboardOverview as component
};
