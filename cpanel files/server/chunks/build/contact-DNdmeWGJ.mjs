import { r as reactExports, j as jsxRuntimeExports } from "./server.mjs";
import { c as createLucideIcon, L as Link } from "./router-gg-f3raf.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { C as Card, b as CardHeader, a as CardContent } from "./card-ClXHriap.mjs";
import { M as MessageSquare } from "./message-square-xF6Yp3vk.mjs";
import { P as Phone } from "./phone-D-ASpsNE.mjs";
import { M as Mail } from "./mail-0w0x2g5k.mjs";
import { M as MapPin } from "./map-pin-iq44-sa-.mjs";
import { C as Clock } from "./clock-BEPwIiZV.mjs";
import { C as CalendarDays } from "./calendar-days-6ThVlXTP.mjs";
import { A as ArrowRight } from "./arrow-right-CKVb4wuO.mjs";
import { U as Users } from "./users-BvmkJGmf.mjs";
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
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleQuestionMark = createLucideIcon("circle-question-mark", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function ContactPage() {
  const [formData, setFormData] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-primary pt-24 pb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container relative mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4 text-white" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-white", children: "Get In Touch" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-8 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl", children: "Contact Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl", children: "Have questions about registration, programs, or volunteering? We're here to help. Reach out to the Keystone Youth Soccer team." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group text-center transition-all hover:shadow-lg hover:-translate-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-7 w-7 text-primary transition-colors group-hover:text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: "Phone" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+13522467776", className: "text-lg font-medium text-primary hover:underline", children: "352-246-7776" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Call or text us anytime" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group text-center transition-all hover:shadow-lg hover:-translate-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10 transition-colors group-hover:bg-success", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-7 w-7 text-success transition-colors group-hover:text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: "Email" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:info@keystoneyouthsoccer.com", className: "text-lg font-medium text-success hover:underline", children: "info@keystoneyouthsoccer.com" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "We'll respond within 24 hours" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group text-center transition-all hover:shadow-lg hover:-translate-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 transition-colors group-hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-7 w-7 text-secondary transition-colors group-hover:text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: "Location" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://maps.apple.com/?daddr=6065+Twin+Lakes+Rd,+Keystone+Heights,+FL+32656", onClick: (e) => {
            if (!/iPhone|iPad|iPod|Mac/i.test(navigator.userAgent)) {
              e.preventDefault();
              window.open("https://www.google.com/maps/dir/?api=1&destination=6065+Twin+Lakes+Rd,+Keystone+Heights,+FL+32656", "_blank");
            }
          }, className: "text-base font-medium text-secondary hover:underline", children: [
            "6065 Twin Lakes Rd",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Keystone Heights, FL 32656"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Twin Lakes Park" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group text-center transition-all hover:shadow-lg hover:-translate-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10 transition-colors group-hover:bg-orange-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-7 w-7 text-orange-500 transition-colors group-hover:text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: "Office Hours" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-medium", children: "Mon - Fri: 9am - 5pm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Games on Saturdays" })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-3xl font-bold tracking-tight", children: "Send Us a Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-8 text-muted-foreground", children: "Fill out the form below and we'll get back to you as soon as possible." }),
        submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-success/50 bg-success/10 p-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-8 w-8 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-success", children: "Message Sent!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Thank you for reaching out. We'll get back to you within 24 hours." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setSubmitted(false), variant: "outline", className: "mt-4", children: "Send Another Message" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "name", className: "mb-2 block text-sm font-medium", children: "Your Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", id: "name", name: "name", required: true, value: formData.name, onChange: handleChange, className: "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20", placeholder: "John Smith" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "mb-2 block text-sm font-medium", children: "Email Address *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", id: "email", name: "email", required: true, value: formData.email, onChange: handleChange, className: "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20", placeholder: "john@example.com" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "phone", className: "mb-2 block text-sm font-medium", children: "Phone Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", id: "phone", name: "phone", value: formData.phone, onChange: handleChange, className: "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20", placeholder: "(352) 555-1234" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "subject", className: "mb-2 block text-sm font-medium", children: "Subject *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { id: "subject", name: "subject", required: true, value: formData.subject, onChange: handleChange, className: "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a topic..." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "registration", children: "Registration Question" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "programs", children: "Programs & Age Groups" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "schedule", children: "Schedule & Games" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "volunteer", children: "Volunteer / Coach" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "sponsorship", children: "Sponsorship" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "other", children: "Other" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "message", className: "mb-2 block text-sm font-medium", children: "Message *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "message", name: "message", required: true, rows: 5, value: formData.message, onChange: handleChange, className: "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none", placeholder: "How can we help you?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "lg", className: "w-full", disabled: isSubmitting, children: isSubmitting ? "Sending..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Send Message",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "ml-2 h-4 w-4" })
          ] }) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-3xl font-bold tracking-tight", children: "Quick Links" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-8 text-muted-foreground", children: "Find answers to common questions or jump to what you need." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "group transition-all hover:shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/register", className: "flex items-center gap-4 p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-6 w-6 text-primary transition-colors group-hover:text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold group-hover:text-primary", children: "Register for a Season" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sign up your child for upcoming programs" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "group transition-all hover:shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/about", className: "flex items-center gap-4 p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-lg bg-success/10 transition-colors group-hover:bg-success", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-6 w-6 text-success transition-colors group-hover:text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold group-hover:text-success", children: "About Our Club" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Learn about our history and mission" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-success" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "group transition-all hover:shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/sponsors", className: "flex items-center gap-4 p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 transition-colors group-hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-6 w-6 text-secondary transition-colors group-hover:text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold group-hover:text-secondary", children: "Become a Sponsor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Support youth soccer in our community" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-secondary" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-xl bg-background p-6 shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-lg font-semibold", children: "Frequently Asked Questions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-primary", children: "When does registration open?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Registration typically opens 6-8 weeks before each season. Spring registration opens in February, Fall registration opens in August." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-primary", children: "What ages do you serve?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "We have programs for children ages 4-18, organized into age-appropriate divisions from U6 through High School." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-primary", children: "Do you need volunteers?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Yes! We're always looking for coaches, referees, and event volunteers. No experience necessary - we provide training." })
            ] })
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-3xl font-bold tracking-tight", children: "Find Us at Twin Lakes Park" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-8 text-lg text-muted-foreground", children: "Our home fields are located at Twin Lakes Park in Keystone Heights" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/hero-aerial.jpg", alt: "Aerial view of Twin Lakes Park soccer fields", className: "w-full object-cover" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://maps.apple.com/?daddr=6065+Twin+Lakes+Rd,+Keystone+Heights,+FL+32656", onClick: (e) => {
        if (!/iPhone|iPad|iPod|Mac/i.test(navigator.userAgent)) {
          e.preventDefault();
          window.open("https://www.google.com/maps/dir/?api=1&destination=6065+Twin+Lakes+Rd,+Keystone+Heights,+FL+32656", "_blank");
        }
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mr-2 h-5 w-5" }),
        "Get Directions"
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "mr-2 h-4 w-4 rotate-180" }),
      "Back to Home"
    ] }) }) }) })
  ] });
}
export {
  ContactPage as component
};
