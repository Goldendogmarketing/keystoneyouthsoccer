import { j as jsxRuntimeExports } from "./server.mjs";
import { c as createLucideIcon, L as Link } from "./router-gg-f3raf.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { C as Card, a as CardContent } from "./card-ClXHriap.mjs";
import { H as Heart } from "./heart-DS7jD7C0.mjs";
import { T as Trophy } from "./trophy-CCj13N4N.mjs";
import { S as Star } from "./star-C7cGjP2m.mjs";
import { C as CircleCheckBig } from "./circle-check-big-BIKbtM5o.mjs";
import { U as Users } from "./users-BvmkJGmf.mjs";
import { M as Mail } from "./mail-0w0x2g5k.mjs";
import { P as Phone } from "./phone-D-ASpsNE.mjs";
import { A as ArrowRight } from "./arrow-right-CKVb4wuO.mjs";
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
const __iconNode$2 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M10 12h4", key: "a56b0p" }],
  ["path", { d: "M10 8h4", key: "1sr2af" }],
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
  [
    "path",
    {
      d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
      key: "secmi2"
    }
  ],
  ["path", { d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16", key: "16ra0t" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const currentSponsors = {
  platinum: [{
    name: "Trevor Waters Realty",
    logoUrl: "",
    websiteUrl: "https://www.trevorwatersrealty.com/"
  }],
  gold: [{
    name: "Lake Area Title Services, Inc",
    logoUrl: "",
    websiteUrl: "https://www.latsikh.com/"
  }, {
    name: "HCA Construction & Roofing",
    logoUrl: "",
    websiteUrl: "https://hcaconstructionandroofingfl.com/Middleburg"
  }, {
    name: "Florida Youth Soccer Association",
    logoUrl: "",
    websiteUrl: "https://www.fysa.com/"
  }],
  silver: [{
    name: "Elite Web Design Pros",
    logoUrl: "",
    websiteUrl: "https://elitewebdesignpros.com/"
  }, {
    name: "Johnny's BBQ & Catering",
    logoUrl: "",
    websiteUrl: "https://www.johnnysbbqcatering.com/"
  }, {
    name: "Whitton Roofing",
    logoUrl: "",
    websiteUrl: ""
  }, {
    name: "Companion Animal Clinic",
    logoUrl: "",
    websiteUrl: ""
  }, {
    name: "Guessford Elevators",
    logoUrl: "",
    websiteUrl: ""
  }],
  bronze: [{
    name: "Whitetail Construction",
    logoUrl: "",
    websiteUrl: ""
  }, {
    name: "Genesis Door",
    logoUrl: "",
    websiteUrl: ""
  }, {
    name: "BCR INC",
    logoUrl: "",
    websiteUrl: ""
  }, {
    name: "Legacy Home Health Care",
    logoUrl: "",
    websiteUrl: ""
  }, {
    name: "Keystone Plumbing",
    logoUrl: "",
    websiteUrl: ""
  }, {
    name: "Golden Dog Property",
    logoUrl: "",
    websiteUrl: ""
  }, {
    name: "Lake Region Monitor",
    logoUrl: "",
    websiteUrl: ""
  }, {
    name: "Three Sisters Coffee",
    logoUrl: "",
    websiteUrl: ""
  }, {
    name: "Knights of Columbus",
    logoUrl: "",
    websiteUrl: ""
  }, {
    name: "Covenant Roofing",
    logoUrl: "",
    websiteUrl: ""
  }, {
    name: "Shor E Nuff Fishing",
    logoUrl: "",
    websiteUrl: ""
  }, {
    name: "Preferred Property Mortgage",
    logoUrl: "",
    websiteUrl: ""
  }, {
    name: "Keystone Sporting Goods",
    logoUrl: "",
    websiteUrl: ""
  }]
};
const sponsorshipTiers = [{
  name: "Platinum",
  price: "$2,500",
  color: "bg-gradient-to-br from-slate-100 to-slate-300",
  textColor: "text-slate-800",
  borderColor: "border-slate-400",
  icon: Sparkles,
  benefits: ["Premium logo placement on all team jerseys", "Large banner at Twin Lakes Park fields", "Featured sponsor on website homepage", "Social media spotlight (monthly)", "Recognition at all games and events", "VIP seating at season tournaments", "10 complimentary season passes"]
}, {
  name: "Gold",
  price: "$1,500",
  color: "bg-gradient-to-br from-yellow-100 to-yellow-300",
  textColor: "text-yellow-800",
  borderColor: "border-yellow-500",
  icon: Trophy,
  benefits: ["Logo on select team jerseys", "Medium banner at fields", "Logo on website sponsors page", "Social media recognition (quarterly)", "Recognition at home games", "5 complimentary season passes"]
}, {
  name: "Silver",
  price: "$750",
  color: "bg-gradient-to-br from-gray-100 to-gray-300",
  textColor: "text-gray-700",
  borderColor: "border-gray-400",
  icon: Award,
  benefits: ["Logo on website sponsors page", "Small banner at fields", "Social media mention", "Recognition in newsletter", "2 complimentary season passes"]
}, {
  name: "Bronze",
  price: "$250",
  color: "bg-gradient-to-br from-orange-100 to-orange-200",
  textColor: "text-orange-800",
  borderColor: "border-orange-400",
  icon: Star,
  benefits: ["Name listed on website", "Recognition in season program", "Thank you on social media", "1 complimentary season pass"]
}];
function SponsorsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-primary pt-24 pb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container relative mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4 text-white" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-white", children: "Community Partners" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-8 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl", children: "Our Sponsors" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl", children: "Thank you to the amazing local businesses and organizations that support Keystone Youth Soccer and help us develop young athletes in our community." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-3xl font-bold tracking-tight md:text-4xl", children: "Thank You to Our Sponsors" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: "These generous partners make youth soccer possible in Keystone Heights" })
      ] }),
      currentSponsors.platinum.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-6 w-6 text-slate-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-slate-700", children: "Platinum Sponsors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-8", children: currentSponsors.platinum.map((sponsor) => {
          const CardWrapper = sponsor.websiteUrl ? "a" : "div";
          const linkProps = sponsor.websiteUrl ? {
            href: sponsor.websiteUrl,
            target: "_blank",
            rel: "noopener noreferrer"
          } : {};
          return /* @__PURE__ */ jsxRuntimeExports.jsx(CardWrapper, { ...linkProps, className: `group flex h-40 w-72 items-center justify-center rounded-2xl border-2 border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100 p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl ${sponsor.websiteUrl ? "cursor-pointer" : ""}`, children: sponsor.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: sponsor.logoUrl, alt: sponsor.name, className: "max-h-full max-w-full object-contain" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-slate-600 text-center group-hover:text-primary", children: sponsor.name }) }, sponsor.name);
        }) })
      ] }),
      currentSponsors.gold.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5 text-yellow-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-yellow-700", children: "Gold Sponsors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-6", children: currentSponsors.gold.map((sponsor) => {
          const CardWrapper = sponsor.websiteUrl ? "a" : "div";
          const linkProps = sponsor.websiteUrl ? {
            href: sponsor.websiteUrl,
            target: "_blank",
            rel: "noopener noreferrer"
          } : {};
          return /* @__PURE__ */ jsxRuntimeExports.jsx(CardWrapper, { ...linkProps, className: `group flex h-32 w-56 items-center justify-center rounded-xl border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 shadow-md transition-all hover:scale-105 hover:shadow-lg ${sponsor.websiteUrl ? "cursor-pointer" : ""}`, children: sponsor.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: sponsor.logoUrl, alt: sponsor.name, className: "max-h-full max-w-full object-contain" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-semibold text-yellow-700 text-center group-hover:text-primary", children: sponsor.name }) }, sponsor.name);
        }) })
      ] }),
      currentSponsors.silver.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5 text-gray-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-gray-600", children: "Silver Sponsors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-4", children: currentSponsors.silver.map((sponsor) => {
          const CardWrapper = sponsor.websiteUrl ? "a" : "div";
          const linkProps = sponsor.websiteUrl ? {
            href: sponsor.websiteUrl,
            target: "_blank",
            rel: "noopener noreferrer"
          } : {};
          return /* @__PURE__ */ jsxRuntimeExports.jsx(CardWrapper, { ...linkProps, className: `group flex h-24 w-44 items-center justify-center rounded-lg border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 p-3 shadow transition-all hover:scale-105 hover:shadow-md ${sponsor.websiteUrl ? "cursor-pointer" : ""}`, children: sponsor.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: sponsor.logoUrl, alt: sponsor.name, className: "max-h-full max-w-full object-contain" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center text-sm font-semibold text-gray-600 group-hover:text-primary", children: sponsor.name }) }, sponsor.name);
        }) })
      ] }),
      currentSponsors.bronze.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-5 w-5 text-orange-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-orange-700", children: "Bronze Sponsors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-3", children: currentSponsors.bronze.map((sponsor) => {
          const TagWrapper = sponsor.websiteUrl ? "a" : "span";
          const linkProps = sponsor.websiteUrl ? {
            href: sponsor.websiteUrl,
            target: "_blank",
            rel: "noopener noreferrer"
          } : {};
          return /* @__PURE__ */ jsxRuntimeExports.jsx(TagWrapper, { ...linkProps, className: `group rounded-lg border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 px-4 py-2 text-sm font-medium text-orange-700 transition-all hover:scale-105 hover:shadow-md hover:text-primary ${sponsor.websiteUrl ? "cursor-pointer" : ""}`, children: sponsor.name }, sponsor.name);
        }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-primary", children: "Partner With Us" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-3xl font-bold tracking-tight md:text-4xl", children: "Sponsorship Opportunities" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: "Join our community of sponsors and make a lasting impact on youth athletics while gaining valuable exposure for your business." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: sponsorshipTiers.map((tier) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `relative overflow-hidden border-2 ${tier.borderColor} transition-all hover:shadow-xl hover:-translate-y-1`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${tier.color} px-6 py-4`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: `text-xl font-bold ${tier.textColor}`, children: tier.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(tier.icon, { className: `h-6 w-6 ${tier.textColor}` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-2 text-3xl font-bold ${tier.textColor}`, children: tier.price }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-sm ${tier.textColor} opacity-80`, children: "per season" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: tier.benefits.map((benefit, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "mt-0.5 h-4 w-4 flex-shrink-0 text-success" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: benefit })
        ] }, index)) }) })
      ] }, tier.name)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-8 text-center text-2xl font-bold", children: "Why Sponsor Keystone Youth Soccer?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-background p-6 text-center shadow-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-7 w-7 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-2 text-lg font-semibold", children: "Community Reach" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Connect with 500+ families in the Keystone Heights area who attend games and events" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-background p-6 text-center shadow-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-7 w-7 text-success" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-2 text-lg font-semibold", children: "Support Youth" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Help provide equipment, fields, and programs that develop young athletes" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-background p-6 text-center shadow-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-7 w-7 text-secondary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-2 text-lg font-semibold", children: "Brand Visibility" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Gain exposure through jerseys, banners, website, and social media" })
          ] })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight text-white md:text-4xl", children: "Ready to Become a Sponsor?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-xl text-lg text-white/80", children: "Contact us today to discuss sponsorship opportunities and how we can partner together to support youth soccer in Keystone Heights." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "bg-white text-lg font-semibold text-primary hover:bg-white/90", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:sponsors@keystoneyouthsoccer.com", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "mr-2 h-5 w-5" }),
          "Email Us"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "ghost", className: "border-2 border-white/30 text-lg font-semibold text-white hover:bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+13522467776", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "mr-2 h-5 w-5" }),
          "352-246-7776"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-sm text-white/60", children: [
        "Or download our",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "underline hover:text-white", children: "Sponsorship Information Packet (PDF)" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "mr-2 h-4 w-4 rotate-180" }),
      "Back to Home"
    ] }) }) }) })
  ] });
}
export {
  SponsorsPage as component
};
