import { r as reactExports, j as jsxRuntimeExports, a as createServerFn } from "./server.mjs";
import { u as useQuery } from "./useQuery-Dr19c9_1.mjs";
import { c as createSsrRpc } from "./middleware-BXaiHw3P.mjs";
import { C as Card, b as CardHeader, a as CardContent } from "./card-ClXHriap.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { c as cn } from "./utils-D4_p2_-I.mjs";
import { C as Calendar } from "./calendar-CzOox_IF.mjs";
import { c as createLucideIcon } from "./router-gg-f3raf.mjs";
import { C as ChevronRight } from "./chevron-right-CIxPr743.mjs";
import { C as Clock } from "./clock-BEPwIiZV.mjs";
import { M as MapPin } from "./map-pin-iq44-sa-.mjs";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./useBaseQuery-DdO5QD3T.mjs";
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
const __iconNode = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode);
const getScheduleGames = createServerFn({
  method: "GET"
}).handler(createSsrRpc("1f58016084030aaf026c40fb370b68de1276598da27814922740992da993655c"));
function SchedulePage() {
  const [selectedLeague, setSelectedLeague] = reactExports.useState(null);
  const [currentMonth, setCurrentMonth] = reactExports.useState(/* @__PURE__ */ new Date());
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["schedule-games"],
    queryFn: async () => await getScheduleGames()
  });
  const leagues = data?.leagues || [];
  const season = data?.season;
  const activeLeague = selectedLeague || leagues[0]?.ageGroup || null;
  const currentLeagueData = leagues.find((l) => l.ageGroup === activeLeague);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative bg-primary pt-32 pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-4 text-4xl font-bold tracking-tight md:text-5xl", children: "Game Schedule" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto max-w-2xl text-lg text-white/80", children: season ? `${season.name} Season Schedule` : "View all upcoming games and results" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b bg-card sticky top-16 md:top-20 z-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide", children: [
      leagues.map((league) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: activeLeague === league.ageGroup ? "default" : "outline", size: "sm", onClick: () => setSelectedLeague(league.ageGroup), className: "whitespace-nowrap", children: league.ageGroup }, league.ageGroup)),
      leagues.length === 0 && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No leagues available" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" }) }) : currentLeagueData ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Teams" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
          currentLeagueData.teams.map((team) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 rounded-full flex-shrink-0", style: {
              backgroundColor: team.color
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm truncate", children: team.name })
          ] }, team.id)),
          currentLeagueData.teams.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No teams yet" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScheduleCalendar, { games: currentLeagueData.games, currentMonth, onMonthChange: setCurrentMonth }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "mx-auto h-12 w-12 text-muted-foreground mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold mb-2", children: "No Schedule Available" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "The schedule for this season hasn't been posted yet." })
    ] }) }) })
  ] });
}
function ScheduleCalendar({
  games,
  currentMonth,
  onMonthChange
}) {
  const [selectedDate, setSelectedDate] = reactExports.useState(null);
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  const getGamesForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return games.filter((game) => game.scheduledAt.startsWith(dateStr));
  };
  const prevMonth = () => {
    onMonthChange(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    onMonthChange(new Date(year, month + 1, 1));
  };
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const selectedDateGames = selectedDate ? games.filter((game) => game.scheduledAt.startsWith(selectedDate)) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: prevMonth, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-semibold", children: [
          monthNames[month],
          " ",
          year
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: nextMonth, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1 mb-2", children: dayNames.map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-sm font-medium text-muted-foreground py-2", children: day }, day)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1", children: days.map((day, index) => {
        if (day === null) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square" }, `empty-${index}`);
        }
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const dayGames = getGamesForDate(day);
        const isSelected = selectedDate === dateStr;
        const isToday = (/* @__PURE__ */ new Date()).toISOString().split("T")[0] === dateStr;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelectedDate(isSelected ? null : dateStr), className: cn("aspect-square p-1 rounded-lg border transition-all relative", isSelected ? "border-primary bg-primary/10" : "border-transparent hover:bg-muted", isToday && !isSelected && "border-primary/50"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-sm", isToday && "font-bold text-primary"), children: day }),
          dayGames.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-1 left-1 right-1 flex justify-center gap-0.5 flex-wrap", children: [
            dayGames.slice(0, 3).map((game) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-1.5 rounded-full", style: {
              backgroundColor: game.homeTeam?.color || "#6B7280"
            } }, game.id)),
            dayGames.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[8px] text-muted-foreground", children: [
              "+",
              dayGames.length - 3
            ] })
          ] })
        ] }, day);
      }) })
    ] }) }),
    selectedDate && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold", children: [
        "Games on ",
        (/* @__PURE__ */ new Date(selectedDate + "T12:00:00")).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric"
        })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: selectedDateGames.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: selectedDateGames.map((game) => /* @__PURE__ */ jsxRuntimeExports.jsx(GameCard, { game }, game.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No games scheduled for this date." }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Upcoming Games" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: games.filter((g) => g.status === "scheduled" && new Date(g.scheduledAt) >= /* @__PURE__ */ new Date()).length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: games.filter((g) => g.status === "scheduled" && new Date(g.scheduledAt) >= /* @__PURE__ */ new Date()).slice(0, 5).map((game) => /* @__PURE__ */ jsxRuntimeExports.jsx(GameCard, { game }, game.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No upcoming games scheduled." }) })
    ] })
  ] });
}
function GameCard({
  game
}) {
  const gameDate = new Date(game.scheduledAt);
  const isCompleted = game.status === "completed";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-3 rounded-lg bg-muted/50 border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-full flex-shrink-0", style: {
          backgroundColor: game.homeTeam?.color || "#6B7280"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium truncate", children: game.homeTeam?.name || "TBD" }),
        isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm", children: game.homeScore })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-full flex-shrink-0", style: {
          backgroundColor: game.awayTeam?.color || "#6B7280"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium truncate", children: game.awayTeam?.name || "TBD" }),
        isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm", children: game.awayScore })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right text-sm flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: gameDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit"
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-24", children: game.field || game.location })
      ] })
    ] }),
    isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", children: "Final" })
  ] });
}
export {
  SchedulePage as component
};
