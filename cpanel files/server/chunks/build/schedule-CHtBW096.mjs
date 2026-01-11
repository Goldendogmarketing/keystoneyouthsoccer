import { j as jsxRuntimeExports, a as createServerFn } from "./server.mjs";
import { u as useQuery } from "./useQuery-Dr19c9_1.mjs";
import { c as createSsrRpc } from "./middleware-BXaiHw3P.mjs";
import { C as Card, b as CardHeader, a as CardContent } from "./card-ClXHriap.mjs";
import { B as Badge } from "./badge-C-B9-Nwc.mjs";
import { A as Alert, a as AlertDescription } from "./alert-D4nBkVjz.mjs";
import { C as Calendar } from "./calendar-CzOox_IF.mjs";
import { C as Clock } from "./clock-BEPwIiZV.mjs";
import { M as MapPin } from "./map-pin-iq44-sa-.mjs";
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
const getPlayerSchedule = createServerFn({
  method: "GET"
}).handler(createSsrRpc("a721d45d6d185a17bada63139cac8fe3b646365e6fad3dbd2a07af3e4906f41a"));
function SchedulePage() {
  const {
    data: schedule,
    isLoading
  } = useQuery({
    queryKey: ["player-schedule"],
    queryFn: async () => await getPlayerSchedule()
  });
  const getEventTypeColor = (type) => {
    switch (type) {
      case "game":
        return "bg-blue-500";
      case "practice":
        return "bg-green-500";
      case "tournament":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
      })
    };
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Schedule" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Upcoming games and practices for your players" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Loading schedule..." }) }) : schedule && schedule.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: schedule.map((event) => {
      const {
        date,
        time
      } = formatDateTime(event.schedule.gameDate);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: getEventTypeColor(event.schedule.eventType), children: event.schedule.eventType.charAt(0).toUpperCase() + event.schedule.eventType.slice(1) }),
            event.schedule.homeTeam === event.team.name && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "Home" }),
            event.schedule.awayTeam === event.team.name && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "Away" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold", children: [
            event.schedule.homeTeam,
            " vs ",
            event.schedule.awayTeam
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            event.player.firstName,
            " ",
            event.player.lastName,
            " • ",
            event.team.name
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: date })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: time })
          ] }),
          event.schedule.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: event.schedule.location })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: event.team.ageGroup })
          ] })
        ] })
      ] }, event.schedule.id);
    }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "No upcoming games or practices scheduled yet. Check back later or contact your coach." })
    ] })
  ] });
}
export {
  SchedulePage as component
};
