import { j as jsxRuntimeExports } from "./server.mjs";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
function DocsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-6 font-bold text-4xl", children: "Documentation" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose dark:prose-invert max-w-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-lg text-muted-foreground", children: "Welcome to the documentation for the TanStack Starter project." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-8 mb-4 font-semibold text-2xl", children: "Getting Started" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This starter template provides a modern foundation for building web applications with TanStack Router, React Query, and other powerful tools." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-8 mb-4 font-semibold text-2xl", children: "Features" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-inside list-disc space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Type-safe routing with TanStack Router" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Server-side rendering (SSR) support" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Dark mode with theme persistence" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Tailwind CSS for styling" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "TypeScript for type safety" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-8 mb-4 font-semibold text-2xl", children: "Project Structure" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "overflow-x-auto rounded-lg bg-muted p-4", children: `src/
├── components/     # Reusable UI components
├── routes/         # Route definitions
├── styles/         # Global styles
├── lib/           # Utility functions
└── utils/         # Helper utilities` })
    ] })
  ] });
}
export {
  DocsPage as component
};
