import { j as jsxRuntimeExports, r as reactExports } from "./server.mjs";
import { u as useForm, a, F as Form, c as FormField, d as FormItem, e as FormLabel, f as FormControl, g as FormMessage } from "./form-DK4w9Pw1.mjs";
import { d as useNavigate, c as createLucideIcon } from "./router-gg-f3raf.mjs";
import { b as signIn } from "./client-z7rsOZm5.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { I as Input } from "./input-D8ww6-y3.mjs";
import { A as Alert, a as AlertDescription } from "./alert-D4nBkVjz.mjs";
import { E as Eye } from "./eye-CaaJptZy.mjs";
import { ax as object, ay as string } from "./db-COtzJr4P.mjs";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./utils-D4_p2_-I.mjs";
import "./label-C0ISNo_U.mjs";
import "./index-DzSr385F.mjs";
import "./middleware-BXaiHw3P.mjs";
import "./auth-DnREO_GR.mjs";
import "./aggregate-BaXeGeea.mjs";
import "./users.schema-CUS3FIEB.mjs";
import "os";
import "fs";
import "net";
import "tls";
import "perf_hooks";
const __iconNode = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode);
const signInSchema = object({
  email: string().email("Invalid email address"),
  password: string().min(8, "Password must be at least 8 characters")
});
function SignInForm() {
  const navigate = useNavigate();
  const [error, setError] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const form = useForm({
    resolver: a(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const onSubmit = async (data) => {
    try {
      setError(null);
      setIsLoading(true);
      await signIn.email({
        email: data.email,
        password: data.password
      });
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Welcome Back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Sign in to your parent account" })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { variant: "destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: error }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FormField,
        {
          control: form.control,
          name: "email",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "email",
                placeholder: "parent@example.com",
                autoComplete: "email",
                ...field
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FormField,
        {
          control: form.control,
          name: "password",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: showPassword ? "text" : "password",
                  autoComplete: "current-password",
                  ...field
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  className: "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",
                  onClick: () => setShowPassword(!showPassword),
                  children: [
                    showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: showPassword ? "Hide password" : "Show password" })
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? "Signing in..." : "Sign In" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-center text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/auth/reset-password",
          className: "text-primary hover:underline",
          children: "Forgot your password?"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/auth/sign-up", className: "text-primary hover:underline", children: "Sign up" })
      ] })
    ] })
  ] });
}
function RouteComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignInForm, {}) });
}
export {
  RouteComponent as component
};
