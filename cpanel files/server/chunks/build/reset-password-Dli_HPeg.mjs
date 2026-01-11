import { j as jsxRuntimeExports, r as reactExports } from "./server.mjs";
import { u as useForm, a, F as Form, c as FormField, d as FormItem, e as FormLabel, f as FormControl, g as FormMessage } from "./form-DK4w9Pw1.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { I as Input } from "./input-D8ww6-y3.mjs";
import { A as Alert, a as AlertDescription } from "./alert-D4nBkVjz.mjs";
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
import "os";
import "fs";
import "net";
import "tls";
import "perf_hooks";
const resetSchema = object({
  email: string().email("Invalid email address")
});
function PasswordResetForm() {
  const [error, setError] = reactExports.useState(null);
  const [success, setSuccess] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const form = useForm({
    resolver: a(resetSchema),
    defaultValues: {
      email: ""
    }
  });
  const onSubmit = async (data) => {
    try {
      setError(null);
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send reset email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  if (success) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Check Your Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "We've sent you a password reset link. Please check your email and follow the instructions." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDescription, { children: [
        "If you don't see the email, check your spam folder or",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSuccess(false),
            className: "text-primary hover:underline",
            children: "try again"
          }
        ),
        "."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/auth/sign-in", className: "text-primary hover:underline", children: "Back to sign in" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Reset Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Enter your email address and we'll send you a link to reset your password" })
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? "Sending..." : "Send Reset Link" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-sm text-muted-foreground", children: [
      "Remember your password?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/auth/sign-in", className: "text-primary hover:underline", children: "Sign in" })
    ] })
  ] });
}
function RouteComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordResetForm, {}) });
}
export {
  RouteComponent as component
};
