import { j as jsxRuntimeExports, r as reactExports } from "./server.mjs";
import { u as useForm, a, F as Form, c as FormField, d as FormItem, e as FormLabel, f as FormControl, g as FormMessage } from "./form-DK4w9Pw1.mjs";
import { d as useNavigate } from "./router-gg-f3raf.mjs";
import { a as signUp } from "./client-z7rsOZm5.mjs";
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
import "./middleware-BXaiHw3P.mjs";
import "./auth-DnREO_GR.mjs";
import "./aggregate-BaXeGeea.mjs";
import "./users.schema-CUS3FIEB.mjs";
import "os";
import "fs";
import "net";
import "tls";
import "perf_hooks";
const signUpSchema = object({
  name: string().min(2, "Name must be at least 2 characters"),
  email: string().email("Invalid email address"),
  phone: string().optional(),
  password: string().min(8, "Password must be at least 8 characters"),
  confirmPassword: string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
function SignUpForm() {
  const navigate = useNavigate();
  const [error, setError] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const form = useForm({
    resolver: a(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    }
  });
  const onSubmit = async (data) => {
    try {
      setError(null);
      setIsLoading(true);
      await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password
      });
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Create Parent Account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Get started with registering your child for soccer" })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { variant: "destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: error }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FormField,
        {
          control: form.control,
          name: "name",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Full Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "text", placeholder: "John Doe", autoComplete: "name", ...field }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
          ] })
        }
      ),
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
          name: "phone",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Phone (Optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "tel", placeholder: "(555) 123-4567", autoComplete: "tel", ...field }) }),
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", autoComplete: "new-password", ...field }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FormField,
        {
          control: form.control,
          name: "confirmPassword",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Confirm Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", autoComplete: "new-password", ...field }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? "Creating account..." : "Create Account" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-sm text-muted-foreground", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/auth/sign-in", className: "text-primary hover:underline", children: "Sign in" })
    ] })
  ] });
}
function RouteComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignUpForm, {}) });
}
export {
  RouteComponent as component
};
