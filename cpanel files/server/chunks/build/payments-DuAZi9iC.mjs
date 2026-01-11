import { j as jsxRuntimeExports, a as createServerFn } from "./server.mjs";
import { u as useQuery } from "./useQuery-Dr19c9_1.mjs";
import { c as createSsrRpc } from "./middleware-BXaiHw3P.mjs";
import { C as Card, b as CardHeader, a as CardContent } from "./card-ClXHriap.mjs";
import { B as Badge } from "./badge-C-B9-Nwc.mjs";
import { A as Alert, a as AlertDescription } from "./alert-D4nBkVjz.mjs";
import { U as User } from "./user-DvzdKynG.mjs";
import { D as DollarSign } from "./dollar-sign-BzamVIyO.mjs";
import { C as Calendar } from "./calendar-CzOox_IF.mjs";
import { C as CreditCard } from "./credit-card-pZFnxz0e.mjs";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./useBaseQuery-DdO5QD3T.mjs";
import "./router-gg-f3raf.mjs";
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
const getDashboardPayments = createServerFn({
  method: "GET"
}).handler(createSsrRpc("202b93ba162f52067a1349aa56b6ff90af509ee6d2432830b5f17a120817708f"));
function PaymentsPage() {
  const {
    data: payments,
    isLoading
  } = useQuery({
    queryKey: ["dashboard-payments"],
    queryFn: async () => await getDashboardPayments()
  });
  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-500";
      case "pending_payment":
        return "bg-yellow-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  const getPaymentStatusText = (status) => {
    switch (status) {
      case "paid":
        return "Paid";
      case "pending_payment":
        return "Pending";
      case "failed":
        return "Failed";
      default:
        return status;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Payment History" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "View all your payment transactions" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Loading payments..." }) }) : payments && payments.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: payments.map((payment) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: payment.season.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            payment.player.firstName,
            " ",
            payment.player.lastName
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: getPaymentStatusColor(payment.paymentStatus), children: getPaymentStatusText(payment.paymentStatus) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            payment.player.firstName,
            " ",
            payment.player.lastName
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
            "$",
            parseFloat(payment.amount).toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(payment.createdAt).toLocaleDateString() })
        ] }),
        payment.paymentIntentId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate text-muted-foreground", children: [
            "Payment ID: ",
            payment.paymentIntentId
          ] })
        ] })
      ] })
    ] }, payment.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "No payment history yet." })
    ] })
  ] });
}
export {
  PaymentsPage as component
};
