import { r as reactExports, j as jsxRuntimeExports, a as createServerFn } from "./server.mjs";
import { u as useQuery } from "./useQuery-Dr19c9_1.mjs";
import { c as createSsrRpc } from "./middleware-BXaiHw3P.mjs";
import { C as Card, b as CardHeader, e as CardDescription, a as CardContent, d as CardTitle } from "./card-ClXHriap.mjs";
import { I as Input } from "./input-D8ww6-y3.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { U as Users } from "./users-BvmkJGmf.mjs";
import { U as UserPlus, S as Search, D as Download } from "./user-plus-DkJ6P9bg.mjs";
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
const getAllPlayers = createServerFn({
  method: "GET"
}).handler(createSsrRpc("cf6b519c28a7185c535ef2ecc880f9acdf3283dc72c040a449a8f6e9ee918fcd"));
function AdminPlayersPage() {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const {
    data: players,
    isLoading
  } = useQuery({
    queryKey: ["admin-players"],
    queryFn: async () => await getAllPlayers()
  });
  const filteredPlayers = players?.filter((p) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return p.player.firstName.toLowerCase().includes(query) || p.player.lastName.toLowerCase().includes(query) || p.parent.name?.toLowerCase().includes(query) || p.parent.email.toLowerCase().includes(query);
  });
  const calculateAge = (dateOfBirth) => {
    const today = /* @__PURE__ */ new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) {
      age--;
    }
    return age;
  };
  const totalPlayers = players?.length || 0;
  const maleCount = players?.filter((p) => p.player.gender === "male").length || 0;
  const femaleCount = players?.filter((p) => p.player.gender === "female").length || 0;
  const averageAge = players?.length ? Math.round(players.reduce((sum, p) => sum + calculateAge(p.player.dateOfBirth), 0) / players.length) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight md:text-4xl", children: "Players" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "View and manage all registered players in the system" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "enterprise-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-sm font-medium", children: "Total Players" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-primary" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold", children: totalPlayers }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Registered players" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "enterprise-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-sm font-medium", children: "Male" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-5 w-5 text-secondary" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold", children: maleCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
            totalPlayers > 0 ? Math.round(maleCount / totalPlayers * 100) : 0,
            "% of total"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "enterprise-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-sm font-medium", children: "Female" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-success/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-5 w-5 text-success" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold", children: femaleCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
            totalPlayers > 0 ? Math.round(femaleCount / totalPlayers * 100) : 0,
            "% of total"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "enterprise-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-sm font-medium", children: "Average Age" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-semibold text-accent", children: "#" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold", children: averageAge }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Years old" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search players by name or parent...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "hover-gold-bg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-2 h-4 w-4" }),
        "Export List"
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Loading players..." }) }) }) }) : filteredPlayers && filteredPlayers.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "enterprise-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { children: [
          "Player Directory (",
          filteredPlayers.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Complete list of all registered players" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 text-left text-sm font-semibold", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 text-left text-sm font-semibold", children: "Age" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 text-left text-sm font-semibold", children: "Gender" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 text-left text-sm font-semibold", children: "Date of Birth" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 text-left text-sm font-semibold", children: "Parent" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredPlayers.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border transition-colors hover:bg-muted/50 hover-gold-bg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
            p.player.firstName,
            " ",
            p.player.lastName
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: calculateAge(p.player.dateOfBirth) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium capitalize", children: p.player.gender }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-sm text-muted-foreground whitespace-nowrap", children: new Date(p.player.dateOfBirth).toLocaleDateString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: p.parent.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: p.parent.email })
          ] })
        ] }, p.player.id)) })
      ] }) }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-12 text-center text-muted-foreground", children: searchQuery ? "No players found matching your search." : "No players registered yet." }) })
  ] });
}
export {
  AdminPlayersPage as component
};
