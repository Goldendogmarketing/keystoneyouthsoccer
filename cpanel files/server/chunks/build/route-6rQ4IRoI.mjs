import { j as jsxRuntimeExports, O as Outlet, u as useRouterState, r as reactExports } from "./server.mjs";
import { L as Link, k as useTheme, c as createLucideIcon } from "./router-gg-f3raf.mjs";
import { c as cn } from "./utils-D4_p2_-I.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { s as signOut } from "./client-z7rsOZm5.mjs";
import { g as getSession } from "./middleware-BXaiHw3P.mjs";
import { S as Settings, L as Layers } from "./settings-C6zIOl5N.mjs";
import { M as MobileNav, H as House, G as Gamepad2, a as Megaphone, C as ChartNoAxesColumnIncreasing, L as LogOut } from "./MobileNav-CM4S32In.mjs";
import { U as Users } from "./users-BvmkJGmf.mjs";
import { F as FileText } from "./file-text-CB-9r6-n.mjs";
import { C as CreditCard } from "./credit-card-pZFnxz0e.mjs";
import { C as Calendar } from "./calendar-CzOox_IF.mjs";
import { U as User } from "./user-DvzdKynG.mjs";
import { S as Shield } from "./shield-Dy22rVVt.mjs";
import { S as Sun, a as Moon } from "./sun-BdWbGnZg.mjs";
import { A as ArrowLeft } from "./arrow-left-CwA_o5qE.mjs";
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
import "./index-DzSr385F.mjs";
import "./index-COg9yH5I.mjs";
import "./index-DXtQiGwN.mjs";
import "./x-qTweREMH.mjs";
const __iconNode = [
  [
    "path",
    { d: "M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344", key: "2acyp4" }
  ],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const SquareCheckBig = createLucideIcon("square-check-big", __iconNode);
const parentNavigation = [
  { name: "Overview", href: "/dashboard", icon: House },
  { name: "My Players", href: "/dashboard/my-players", icon: Users },
  { name: "Registrations", href: "/dashboard/registrations", icon: FileText },
  { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
  { name: "To-Do List", href: "/dashboard/todos", icon: SquareCheckBig },
  { name: "Account", href: "/dashboard/account", icon: User }
];
const adminNavigation = [
  { name: "All Registrations", href: "/admin/registrations", icon: FileText },
  { name: "All Players", href: "/admin/players", icon: Users },
  { name: "Teams", href: "/admin/teams", icon: Shield },
  { name: "Games", href: "/admin/games", icon: Gamepad2 },
  { name: "Leagues", href: "/admin/leagues", icon: Layers },
  { name: "Seasons", href: "/admin/seasons", icon: Calendar },
  { name: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { name: "Reports", href: "/admin/reports", icon: ChartNoAxesColumnIncreasing }
];
function DashboardSidebar() {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const { theme, setTheme } = useTheme();
  const [session, setSession] = reactExports.useState(null);
  reactExports.useEffect(() => {
    getSession().then(setSession).catch(() => setSession(null));
  }, []);
  const isAdmin = session?.user?.role === "admin";
  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "";
  const userInitials = userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const isDark = theme === "dark" || theme === "system" && false;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col border-r border-border/40 bg-card/30 backdrop-blur-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border/40 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "group flex items-center gap-3 transition-all hover:opacity-80", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-success transition-transform group-hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: "⚽" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-semibold leading-tight", children: "Keystone Youth" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground leading-tight", children: isAdmin ? "Admin Dashboard" : "Parent Dashboard" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border/40 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
      "rounded-lg p-3",
      isAdmin ? "bg-gradient-to-br from-primary/10 to-success/10 border border-primary/20" : "bg-muted/50"
    ), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
        "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
        isAdmin ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
      ), children: isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-5 w-5" }) : userInitials }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-sm font-medium truncate", isAdmin && "text-primary"), children: isAdmin ? "Administrator" : userName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: isAdmin ? "Full Access" : userEmail })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 space-y-4 overflow-y-auto p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: isAdmin ? "Personal" : "Navigation" }),
        parentNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href || currentPath.startsWith(item.href + "/") && item.href !== "/dashboard";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: item.href,
              className: cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/70 hover:bg-muted hover:text-foreground hover-gold"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-foreground/50 group-hover:text-accent") }),
                item.name
              ]
            },
            item.name
          );
        })
      ] }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Administration" }),
        adminNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href || currentPath.startsWith(item.href + "/") && item.href !== "/admin";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: item.href,
              className: cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/70 hover:bg-muted hover:text-foreground hover-gold"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-foreground/50 group-hover:text-accent") }),
                item.name
              ]
            },
            item.name
          );
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/40 p-4 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Quick Actions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "w-full justify-start hover-gold-bg",
          onClick: toggleTheme,
          children: [
            isDark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "mr-2 h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "mr-2 h-4 w-4" }),
            isDark ? "Light Mode" : "Dark Mode"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          variant: "outline",
          size: "sm",
          className: "w-full justify-start hover-gold-bg",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
            "Back to Website"
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10",
          onClick: handleSignOut,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "mr-2 h-4 w-4" }),
            "Sign Out"
          ]
        }
      )
    ] })
  ] });
}
const navigation = [{
  name: "Overview",
  href: "/dashboard",
  icon: House
}, {
  name: "My Players",
  href: "/dashboard/my-players",
  icon: Users
}, {
  name: "Registrations",
  href: "/dashboard/registrations",
  icon: FileText
}, {
  name: "Payments",
  href: "/dashboard/payments",
  icon: CreditCard
}, {
  name: "Schedule",
  href: "/dashboard/schedule",
  icon: Calendar
}, {
  name: "Account",
  href: "/dashboard/account",
  icon: User
}];
function DashboardLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-screen flex-col overflow-hidden bg-background md:flex-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between border-b border-border/40 bg-card/50 backdrop-blur-xl p-4 md:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-success", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "⚽" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold leading-tight", children: "Keystone Youth" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground leading-tight", children: "Parent Dashboard" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, { navigation, title: "Dashboard", subtitle: "Parent Dashboard" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden md:block md:w-64 lg:w-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardSidebar, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-y-auto bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto p-6 md:p-8 lg:p-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) })
  ] });
}
export {
  DashboardLayout as component
};
