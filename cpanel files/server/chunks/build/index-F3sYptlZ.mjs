import { j as jsxRuntimeExports, r as reactExports, a as createServerFn } from "./server.mjs";
import { u as useQuery } from "./useQuery-Dr19c9_1.mjs";
import { L as Link, c as createLucideIcon } from "./router-gg-f3raf.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { A as ArrowRight } from "./arrow-right-CKVb4wuO.mjs";
import { C as CircleCheckBig } from "./circle-check-big-BIKbtM5o.mjs";
import { U as Users } from "./users-BvmkJGmf.mjs";
import { T as Trophy } from "./trophy-CCj13N4N.mjs";
import { C as Calendar } from "./calendar-CzOox_IF.mjs";
import { c as cn } from "./utils-D4_p2_-I.mjs";
import { C as Card, b as CardHeader, a as CardContent } from "./card-ClXHriap.mjs";
import { S as Shield } from "./shield-Dy22rVVt.mjs";
import { H as Heart } from "./heart-DS7jD7C0.mjs";
import { S as Star } from "./star-C7cGjP2m.mjs";
import { c as createSsrRpc } from "./middleware-BXaiHw3P.mjs";
import { M as MapPin } from "./map-pin-iq44-sa-.mjs";
import { P as Phone } from "./phone-D-ASpsNE.mjs";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./useBaseQuery-DdO5QD3T.mjs";
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
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 bg-cover bg-center bg-no-repeat",
        style: {
          backgroundImage: `url('/hero-aerial.jpg')`
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/50" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container relative mx-auto px-6 pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-44 lg:pb-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 backdrop-blur-sm shadow-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-white drop-shadow-md", children: "Spring 2026 Registration Open" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl [text-shadow:_0_2px_12px_rgb(0_0_0_/_40%)]", children: [
            "Building Young Athletes",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Through Soccer"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto max-w-2xl text-lg font-medium leading-relaxed text-white drop-shadow-md md:text-xl [text-shadow:_0_1px_8px_rgb(0_0_0_/_40%)]", children: "Dedicated coaches, character development, and competitive play for ages 4-18. Join Keystone Youth Soccer's Spring 2026 season." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              size: "lg",
              className: "group bg-white text-lg font-semibold text-primary shadow-xl hover:bg-white/95",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/register", children: [
                "Register Your Player",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              size: "lg",
              variant: "ghost",
              className: "border-2 border-white/30 bg-transparent text-lg font-semibold text-white hover:bg-white/10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#programs", children: "View Programs" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 text-sm font-medium text-white drop-shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5 text-green-400 drop-shadow-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "500+ Players" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5 text-green-400 drop-shadow-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "20+ Years" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5 text-green-400 drop-shadow-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Professional Coaches" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20 grid grid-cols-3 gap-8 border-t border-white/10 pt-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-6 w-6 text-white/60" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-bold text-white", children: "500+" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white/60", children: "Active Players" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-6 w-6 text-white/60" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-bold text-white", children: "12" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white/60", children: "Championships" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-6 w-6 text-white/60" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-bold text-white", children: "20+" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white/60", children: "Years" })
        ] })
      ] })
    ] }) })
  ] });
}
function ScrollingTicker({ items, className }) {
  const tickerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;
    const scroll = () => {
      if (ticker.scrollLeft >= ticker.scrollWidth / 2) {
        ticker.scrollLeft = 0;
      } else {
        ticker.scrollLeft += 1;
      }
    };
    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);
  const duplicatedItems = [...items, ...items];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("relative overflow-hidden border-y border-border/40 bg-charcoal py-2.5", className), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: tickerRef, className: "flex gap-8 overflow-hidden whitespace-nowrap", children: duplicatedItems.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-3 px-4", children: [
    item.type === "result" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-destructive px-2 py-0.5 text-xs font-bold text-white", children: "FINAL" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-white", children: item.homeTeam }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-success", children: item.homeScore }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-white", children: item.awayScore }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-white", children: item.awayTeam })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-primary px-2 py-0.5 text-xs font-bold text-white", children: item.time }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-white", children: item.homeTeam }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "vs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-white", children: item.awayTeam }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-white/60", children: item.location })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/20", children: "•" })
  ] }, `${item.id}-${index}`)) }) });
}
const benefits = [
  {
    icon: Shield,
    title: "Dedicated Coaches",
    description: "Certified coaches dedicated to developing skills and building confidence",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Heart,
    title: "Safe Environment",
    description: "Background-checked staff and comprehensive safety protocols",
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  },
  {
    icon: Star,
    title: "Skill Development",
    description: "Age-appropriate training that builds technique, teamwork, and sportsmanship",
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    icon: Zap,
    title: "Competitive Play",
    description: "Exciting games and tournaments to put skills into action",
    color: "text-success",
    bgColor: "bg-success/10"
  }
];
function WhyJoinSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl", children: "Why Choose Keystone Youth Soccer?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground", children: "We're more than just a soccer league—we're a community dedicated to developing young athletes both on and off the field." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: benefits.map((benefit) => {
      const Icon = benefit.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "group enterprise-card hover-gold-bg",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${benefit.bgColor} transition-colors group-hover:bg-${benefit.color.replace("text-", "")}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-6 w-6 ${benefit.color} transition-colors group-hover:text-white` }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold", children: benefit.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: benefit.description }) })
          ]
        },
        benefit.title
      );
    }) })
  ] }) });
}
const ageGroups = [
  { name: "U6 Coed League", slug: "u6", ages: "Ages 4-5", birthYears: "Birth Years 2020 & 2021", description: "Introduction to soccer basics and fun!" },
  { name: "U8 Coed League", slug: "u8", ages: "Ages 6-7", birthYears: "Birth Years 2018 & 2019", description: "Building coordination and teamwork" },
  { name: "U10 Coed League", slug: "u10", ages: "Ages 8-9", birthYears: "Birth Years 2016 & 2017", description: "Developing fundamental skills" },
  { name: "12U Coed League", slug: "12u", ages: "Ages 10-12", birthYears: "Birth Years 2013 - 2015", description: "Teamwork and strategy development" },
  { name: "15U Coed League", slug: "15u", ages: "Ages 12-15", birthYears: "Birth Years 2011 - 2013", description: "Competitive play and advanced tactics" },
  { name: "High School Coed League", slug: "high-school", ages: "Ages 15-18", birthYears: "Birth Years 2007 - 2010", description: "Elite youth soccer competition" }
];
function AgeGroupsSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "programs", className: "bg-muted/30 py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl", children: "Programs for Every Age" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground", children: "Co-ed leagues designed to match your child's age and skill level" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: ageGroups.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/divisions/$slug", params: { slug: group.slug }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group h-full enterprise-card border-l-4 border-l-primary/20 transition-all duration-300 hover:border-l-primary hover:shadow-lg hover:-translate-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold tracking-tight", children: group.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground", children: group.ages })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: group.birthYears })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-sm leading-relaxed text-muted-foreground", children: group.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-sm font-medium text-primary transition-all group-hover:text-primary", children: [
          "Learn more",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" })
        ] })
      ] })
    ] }) }, group.slug)) })
  ] }) });
}
const getTickerGames = createServerFn({
  method: "GET"
}).handler(createSsrRpc("6daffac9f9b4a709c0170d9d88c5602c14256abbc549af82a8331ac1f923d9fe"));
function Home() {
  const {
    data: tickerItems = []
  } = useQuery({
    queryKey: ["ticker-games"],
    queryFn: async () => {
      try {
        return await getTickerGames();
      } catch (error) {
        console.error("Failed to fetch ticker games:", error);
        return [];
      }
    },
    refetchInterval: 6e4,
    // Refresh every minute
    retry: false
    // Don't retry on error
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    tickerItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollingTicker, { items: tickerItems }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhyJoinSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AgeGroupsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-4xl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full bg-success animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-primary", children: "Limited Spots Available" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl", children: [
        "Ready to Join the",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Keystone Family?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl", children: "Registration for Spring 2026 is now open. Secure your child's spot today—our teams fill up fast." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "group bg-primary text-lg font-semibold text-white shadow-lg hover:bg-primary/90", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/register", children: [
          "Register Your Child",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "border-2 text-lg font-semibold hover-gold-bg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", children: "Learn More" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-success" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "500+ Happy Families" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-success" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "20+ Years Experience" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-success" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Dedicated Coaches" })
        ] })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-3xl font-bold tracking-tight md:text-4xl", children: "Important Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: "Everything you need to know about our Spring 2026 season" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group enterprise-card hover-gold-bg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-6 w-6 text-primary transition-colors group-hover:text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold", children: "Season Dates" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: "Spring 2026 Season" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "April 1 - June 30, 2026" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: "Training Schedule" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Games & practices twice weekly" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 inline-flex items-center text-sm font-medium text-primary hover-gold", children: [
              "View full schedule",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group enterprise-card hover-gold-bg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 transition-colors group-hover:bg-success", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-6 w-6 text-success transition-colors group-hover:text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold", children: "Location" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://maps.apple.com/?daddr=6065+Twin+Lakes+Rd,+Keystone+Heights,+FL+32656", onClick: (e) => {
              if (!/iPhone|iPad|iPod|Mac/i.test(navigator.userAgent)) {
                e.preventDefault();
                window.open("https://www.google.com/maps/dir/?api=1&destination=6065+Twin+Lakes+Rd,+Keystone+Heights,+FL+32656", "_blank");
              }
            }, className: "block space-y-1 hover:opacity-80 transition-opacity cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: "Twin Lakes Park" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
                "6065 Twin Lakes Rd",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "Keystone Heights, FL 32656"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://maps.apple.com/?daddr=6065+Twin+Lakes+Rd,+Keystone+Heights,+FL+32656", onClick: (e) => {
              if (!/iPhone|iPad|iPod|Mac/i.test(navigator.userAgent)) {
                e.preventDefault();
                window.open("https://www.google.com/maps/dir/?api=1&destination=6065+Twin+Lakes+Rd,+Keystone+Heights,+FL+32656", "_blank");
              }
            }, className: "mt-4 inline-flex items-center text-sm font-medium text-success hover-gold", children: [
              "Get directions",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group enterprise-card hover-gold-bg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 transition-colors group-hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-6 w-6 text-secondary transition-colors group-hover:text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold", children: "Contact Us" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: "Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+13522467776", className: "text-sm text-muted-foreground hover:text-primary transition-colors", children: "352-246-7776" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "info@keystoneyouthsoccer.com" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: "Hours" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Monday-Friday, 9am-5pm" })
            ] })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Home as component
};
