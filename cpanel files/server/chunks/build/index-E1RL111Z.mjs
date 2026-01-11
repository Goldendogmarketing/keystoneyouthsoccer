import { j as jsxRuntimeExports, a as createServerFn } from "./server.mjs";
import { u as useQuery } from "./useQuery-Dr19c9_1.mjs";
import { c as createSsrRpc } from "./middleware-BXaiHw3P.mjs";
import { C as Card, b as CardHeader, d as CardTitle, a as CardContent } from "./card-ClXHriap.mjs";
import { F as FileText } from "./file-text-CB-9r6-n.mjs";
import { U as Users } from "./users-BvmkJGmf.mjs";
import { S as Shield } from "./shield-Dy22rVVt.mjs";
import { C as CircleAlert } from "./circle-alert-DfwXxVVq.mjs";
import { C as CircleCheckBig } from "./circle-check-big-BIKbtM5o.mjs";
import { c as createLucideIcon } from "./router-gg-f3raf.mjs";
import { D as DollarSign } from "./dollar-sign-BzamVIyO.mjs";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./useBaseQuery-DdO5QD3T.mjs";
import "./utils-D4_p2_-I.mjs";
import "./db-COtzJr4P.mjs";
import "os";
import "fs";
import "net";
import "tls";
import "perf_hooks";
import "./auth-DnREO_GR.mjs";
import "./aggregate-BaXeGeea.mjs";
import "./users.schema-CUS3FIEB.mjs";
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const getAdminStats = createServerFn({
  method: "GET"
}).handler(createSsrRpc("803b5106941e8bcd09627784f4f3d57113ddc4dbeb194503db7a2db04c3f4bd6"));
function AdminOverview() {
  const {
    data: stats
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => await getAdminStats()
  });
  const statCards = [{
    title: "Total Registrations",
    value: stats?.totalRegistrations || 0,
    icon: FileText,
    description: "All time",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  }, {
    title: "Total Players",
    value: stats?.totalPlayers || 0,
    icon: Users,
    description: "Registered players",
    color: "text-green-600",
    bgColor: "bg-green-100"
  }, {
    title: "Total Parents",
    value: stats?.totalUsers || 0,
    icon: Users,
    description: "User accounts",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  }, {
    title: "Total Teams",
    value: stats?.totalTeams || 0,
    icon: Shield,
    description: "Active teams",
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }, {
    title: "Pending Payments",
    value: stats?.pendingPayments || 0,
    icon: CircleAlert,
    description: "Awaiting payment",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100"
  }, {
    title: "Paid Registrations",
    value: stats?.paidRegistrations || 0,
    icon: CircleCheckBig,
    description: "Completed",
    color: "text-green-600",
    bgColor: "bg-green-100"
  }, {
    title: "Recent Registrations",
    value: stats?.recentRegistrations || 0,
    icon: TrendingUp,
    description: "Last 7 days",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100"
  }, {
    title: "Total Revenue",
    value: `$${(stats?.totalRevenue || 0).toFixed(2)}`,
    icon: DollarSign,
    description: "All paid registrations",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Admin Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Overview of Keystone Youth Soccer operations" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: statCards.map((stat) => {
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Quick Actions" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/admin/registrations", className: "block rounded-lg border p-4 transition-colors hover:bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: "View All Registrations" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Manage player registrations" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/admin/teams", className: "block rounded-lg border p-4 transition-colors hover:bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: "Manage Teams" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Create and organize teams" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/admin/seasons", className: "block rounded-lg border p-4 transition-colors hover:bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: "Season Management" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Configure active seasons" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Recent Activity" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-green-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              stats?.recentRegistrations || 0,
              " new registrations this week"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 text-yellow-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              stats?.pendingPayments || 0,
              " pending payments"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4 text-emerald-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "$",
              (stats?.totalRevenue || 0).toFixed(2),
              " total revenue"
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "System Status" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Registration System" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-600", children: "✓ Active" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Payment Processing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-600", children: "✓ Active" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Email Notifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-600", children: "✓ Active" })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  AdminOverview as component
};
