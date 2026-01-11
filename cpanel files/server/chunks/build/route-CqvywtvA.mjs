import { j as jsxRuntimeExports, r as reactExports, O as Outlet, u as useRouterState } from "./server.mjs";
import { d as useNavigate, L as Link, k as useTheme } from "./router-gg-f3raf.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { M as Menu, S as Sun, a as Moon } from "./sun-BdWbGnZg.mjs";
import { X } from "./x-qTweREMH.mjs";
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
import "./utils-D4_p2_-I.mjs";
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  const isDark = theme === "dark" || theme === "system" && false;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: toggleTheme,
      className: "h-9 w-9 rounded-full border border-white/30 text-white hover:bg-white/20",
      "aria-label": isDark ? "Switch to light mode" : "Switch to dark mode",
      children: isDark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4" })
    }
  );
}
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  const router = useRouterState();
  const navigate = useNavigate();
  const isHomePage = router.location.pathname === "/";
  reactExports.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleLogoClick = (e) => {
    if (isHomePage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const scrollToPrograms = (e) => {
    e.preventDefault();
    if (isHomePage) {
      const element = document.getElementById("programs");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate({ to: "/" }).then(() => {
        setTimeout(() => {
          const element = document.getElementById("programs");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      });
    }
  };
  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/#programs", onClick: scrollToPrograms },
    { name: "Schedule", href: "/schedule" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "Contact", href: "/contact" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-primary/85 backdrop-blur-md shadow-lg" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 items-center justify-between md:h-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", onClick: handleLogoClick, className: "group flex items-center gap-3 transition-opacity hover:opacity-80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-blue-900 transition-transform group-hover:scale-105 md:h-14 md:w-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl md:text-4xl", children: "⚽" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden text-base font-semibold text-white drop-shadow-md sm:inline md:text-lg", children: "Keystone Youth Soccer Club" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-2 lg:flex", children: navigation.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: item.href,
          onClick: item.onClick,
          className: "group relative px-4 py-2 text-base font-medium text-white/90 drop-shadow-md transition-colors duration-200 hover:text-sky-300",
          children: [
            item.name,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 left-4 right-4 h-0.5 origin-left scale-x-0 bg-sky-400 transition-transform duration-300 ease-out group-hover:scale-x-100" })
          ]
        },
        item.name
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", className: "hidden bg-white text-primary font-semibold hover:bg-white/90 md:inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: "Register Now" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "sm",
            variant: "ghost",
            className: "hidden border border-white/30 text-white hover:bg-white/20 md:inline-flex",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: "Sign In" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setMobileMenuOpen(!mobileMenuOpen),
            className: "inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/20 lg:hidden",
            "aria-label": "Toggle menu",
            children: mobileMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-6 w-6" })
          }
        )
      ] })
    ] }) }),
    mobileMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/20 bg-primary/90 backdrop-blur-xl lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto space-y-1 px-6 py-4", children: [
      navigation.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: item.href,
          onClick: (e) => {
            setMobileMenuOpen(false);
            if (item.onClick) item.onClick(e);
          },
          className: "group relative block rounded-lg px-4 py-3 text-lg font-medium text-white/90 transition-colors duration-200 hover:bg-sky-500/20 hover:text-sky-300",
          children: [
            item.name,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-2 left-4 right-4 h-0.5 origin-left scale-x-0 bg-sky-400 transition-transform duration-300 ease-out group-hover:scale-x-100" })
          ]
        },
        item.name
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "lg",
            className: "w-full bg-white text-primary font-semibold hover:bg-white/90",
            onClick: () => setMobileMenuOpen(false),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: "Register Now" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "lg",
            variant: "outline",
            className: "w-full border-white/30 text-white hover:bg-white/20",
            onClick: () => setMobileMenuOpen(false),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: "Sign In" })
          }
        )
      ] })
    ] }) })
  ] });
}
function RouteComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading..." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] });
}
export {
  RouteComponent as component
};
