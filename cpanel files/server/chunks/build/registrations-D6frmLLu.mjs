import { j as jsxRuntimeExports, a as createServerFn } from "./server.mjs";
import { u as useQuery } from "./useQuery-Dr19c9_1.mjs";
import { c as createSsrRpc } from "./middleware-BXaiHw3P.mjs";
import { C as Card, b as CardHeader, a as CardContent, c as CardFooter } from "./card-ClXHriap.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { B as Badge } from "./badge-C-B9-Nwc.mjs";
import { L as Link } from "./router-gg-f3raf.mjs";
import { U as User } from "./user-DvzdKynG.mjs";
import { C as Calendar } from "./calendar-CzOox_IF.mjs";
import { D as DollarSign } from "./dollar-sign-BzamVIyO.mjs";
import { A as Alert, a as AlertDescription } from "./alert-D4nBkVjz.mjs";
import { F as FileText } from "./file-text-CB-9r6-n.mjs";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./useBaseQuery-DdO5QD3T.mjs";
import "./utils-D4_p2_-I.mjs";
import "./index-DzSr385F.mjs";
import "./db-COtzJr4P.mjs";
import "os";
import "fs";
import "net";
import "tls";
import "perf_hooks";
import "./auth-DnREO_GR.mjs";
import "./aggregate-BaXeGeea.mjs";
import "./users.schema-CUS3FIEB.mjs";
const getDashboardRegistrations = createServerFn({
  method: "GET"
}).handler(createSsrRpc("f71bc694ce7412b4c9d3457f1a5fb6ed21543db26beddb65c47bdf2c3137546e"));
function RegistrationCard({ registration, player, season }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-500";
      case "pending_payment":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  const getStatusText = (status) => {
    switch (status) {
      case "paid":
        return "Confirmed";
      case "pending_payment":
        return "Pending Payment";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: season.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          player.firstName,
          " ",
          player.lastName
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: getStatusColor(registration.status), children: getStatusText(registration.status) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          player.firstName,
          " ",
          player.lastName
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Registered ",
          new Date(registration.createdAt).toLocaleDateString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "$",
          parseFloat(registration.amount).toFixed(2)
        ] })
      ] })
    ] }),
    registration.status === "pending_payment" && /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register/success", search: { registrationId: registration.id }, children: "Complete Payment" }) }) })
  ] });
}
function RegistrationsPage() {
  const {
    data: registrations,
    isLoading
  } = useQuery({
    queryKey: ["dashboard-registrations"],
    queryFn: async () => await getDashboardRegistrations()
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Registrations" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "View and manage your player registrations" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Loading registrations..." }) }) : registrations && registrations.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2", children: registrations.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(RegistrationCard, { registration: {
      id: item.registration.id,
      status: item.registration.status,
      paymentStatus: item.registration.paymentStatus,
      amount: item.registration.amount,
      createdAt: item.registration.createdAt
    }, player: {
      firstName: item.player.firstName,
      lastName: item.player.lastName
    }, season: {
      name: item.season.name
    } }, item.registration.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "No registrations yet. Start by registering a player for the current season." })
    ] })
  ] });
}
export {
  RegistrationsPage as component
};
