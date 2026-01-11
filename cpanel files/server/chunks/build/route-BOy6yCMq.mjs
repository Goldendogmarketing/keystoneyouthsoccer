import { j as jsxRuntimeExports, O as Outlet, u as useRouterState } from "./server.mjs";
import { L as Link, c as createLucideIcon, k as useTheme } from "./router-gg-f3raf.mjs";
import { c as cn } from "./utils-D4_p2_-I.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { s as signOut } from "./client-z7rsOZm5.mjs";
import { S as Settings, L as Layers } from "./settings-C6zIOl5N.mjs";
import { M as MobileNav, H as House, C as ChartNoAxesColumnIncreasing, G as Gamepad2, a as Megaphone, L as LogOut } from "./MobileNav-CM4S32In.mjs";
import { C as CalendarDays } from "./calendar-days-6ThVlXTP.mjs";
import { F as FileText } from "./file-text-CB-9r6-n.mjs";
import { U as Users } from "./users-BvmkJGmf.mjs";
import { S as Shield } from "./shield-Dy22rVVt.mjs";
import { C as Calendar } from "./calendar-CzOox_IF.mjs";
import { T as Trophy } from "./trophy-CCj13N4N.mjs";
import { H as Heart } from "./heart-DS7jD7C0.mjs";
import { M as MessageSquare } from "./message-square-xF6Yp3vk.mjs";
import { M as Mail } from "./mail-0w0x2g5k.mjs";
import { S as Sun, a as Moon } from "./sun-BdWbGnZg.mjs";
import { A as ArrowLeft } from "./arrow-left-CwA_o5qE.mjs";
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
import "./index-DzSr385F.mjs";
import "./index-COg9yH5I.mjs";
import "./index-DXtQiGwN.mjs";
import "./x-qTweREMH.mjs";
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ["path", { d: "M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662", key: "154egf" }]
];
const CircleUser = createLucideIcon("circle-user", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 12.5 8 15l2 2.5", key: "1tg20x" }],
  ["path", { d: "m14 12.5 2 2.5-2 2.5", key: "yinavb" }]
];
const FileCode = createLucideIcon("file-code", __iconNode);
const navigationSections = [
  {
    title: "Dashboard",
    items: [
      { name: "Overview", href: "/admin", icon: House },
      { name: "Calendar", href: "/admin/calendar", icon: CalendarDays },
      { name: "Reports", href: "/admin/reports", icon: ChartNoAxesColumnIncreasing }
    ]
  },
  {
    title: "Management",
    items: [
      { name: "Registrations", href: "/admin/registrations", icon: FileText },
      { name: "Players", href: "/admin/players", icon: Users },
      { name: "Teams", href: "/admin/teams", icon: Shield },
      { name: "Games", href: "/admin/games", icon: Gamepad2 },
      { name: "Leagues", href: "/admin/leagues", icon: Layers },
      { name: "Seasons", href: "/admin/seasons", icon: Calendar }
    ]
  },
  {
    title: "Organization",
    items: [
      { name: "Tournaments", href: "/admin/tournaments", icon: Trophy },
      { name: "Sponsors", href: "/admin/sponsors", icon: Heart },
      { name: "Board Members", href: "/admin/board-members", icon: CircleUser }
    ]
  },
  {
    title: "Content & Communication",
    items: [
      { name: "Announcements", href: "/admin/announcements", icon: Megaphone },
      { name: "Communications", href: "/admin/communications", icon: MessageSquare },
      { name: "Content", href: "/admin/content", icon: FileCode },
      { name: "Emails", href: "/admin/emails", icon: Mail }
    ]
  }
];
function AdminSidebar() {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const { theme, setTheme } = useTheme();
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground leading-tight", children: "Admin Dashboard" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border/40 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-gradient-to-br from-primary/10 to-success/10 p-3 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary", children: "Administrator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: "Full Access" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 space-y-6 overflow-y-auto p-4", children: navigationSections.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: section.title }),
      section.items.map((item) => {
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Icon,
                {
                  className: cn(
                    "h-5 w-5",
                    isActive ? "text-primary-foreground" : "text-foreground/50 group-hover:text-accent"
                  )
                }
              ),
              item.name
            ]
          },
          item.name
        );
      })
    ] }, section.title)) }),
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "w-full justify-start hover-gold-bg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
        "Back to Website"
      ] }) }),
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
  href: "/admin",
  icon: House
}, {
  name: "Registrations",
  href: "/admin/registrations",
  icon: FileText
}, {
  name: "Players",
  href: "/admin/players",
  icon: Users
}, {
  name: "Teams",
  href: "/admin/teams",
  icon: Shield
}, {
  name: "Seasons",
  href: "/admin/seasons",
  icon: Calendar
}, {
  name: "Tournaments",
  href: "/admin/tournaments",
  icon: Trophy
}, {
  name: "Sponsors",
  href: "/admin/sponsors",
  icon: Heart
}, {
  name: "Content",
  href: "/admin/content",
  icon: FileCode
}, {
  name: "Board Members",
  href: "/admin/board-members",
  icon: CircleUser
}, {
  name: "Emails",
  href: "/admin/emails",
  icon: Mail
}, {
  name: "Reports",
  href: "/admin/reports",
  icon: ChartNoAxesColumnIncreasing
}];
function AdminLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-screen flex-col overflow-hidden bg-background md:flex-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between border-b border-border/40 bg-card/50 backdrop-blur-xl p-4 md:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-success", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "⚽" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold leading-tight", children: "Keystone Admin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground leading-tight", children: "Admin Dashboard" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, { navigation, title: "Admin", subtitle: "Admin Dashboard" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden md:block md:w-64 lg:w-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminSidebar, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-y-auto bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto p-6 md:p-8 lg:p-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) })
  ] });
}
export {
  AdminLayout as component
};
