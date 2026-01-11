import { j as jsxRuntimeExports } from "./server.mjs";
import { u as useForm, a, F as Form, c as FormField, d as FormItem, e as FormLabel, f as FormControl, g as FormMessage } from "./form-DK4w9Pw1.mjs";
import { C as Card, b as CardHeader, d as CardTitle, e as CardDescription, a as CardContent, c as CardFooter } from "./card-ClXHriap.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { I as Input } from "./input-D8ww6-y3.mjs";
import { u as useSession } from "./client-z7rsOZm5.mjs";
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
import "./auth-DnREO_GR.mjs";
import "./aggregate-BaXeGeea.mjs";
import "./users.schema-CUS3FIEB.mjs";
import "os";
import "fs";
import "net";
import "tls";
import "perf_hooks";
const accountFormSchema = object({
  name: string().min(2, "Name must be at least 2 characters"),
  email: string().email("Invalid email address")
});
function AccountPage() {
  const {
    data: session
  } = useSession();
  const form = useForm({
    resolver: a(accountFormSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || ""
    }
  });
  const onSubmit = (data) => {
    console.log("Update account:", data);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Account Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage your account information and preferences" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Profile Information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Update your account details" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit(onSubmit), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "name", render: ({
              field
            }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...field }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "email", render: ({
              field
            }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", ...field }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: "Save Changes" }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Change Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Update your password to keep your account secure" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Current Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", placeholder: "Enter current password" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "New Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", placeholder: "Enter new password" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Confirm New Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", placeholder: "Confirm new password" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Update Password" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Account Information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Your account details" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "User ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-mono", children: session?.user?.id })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Member Since" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: session?.user?.createdAt ? new Date(session.user.createdAt).toLocaleDateString() : "Unknown" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Email Verified" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: session?.user?.emailVerified ? "✓ Verified" : "✗ Not Verified" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Notification Preferences" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Manage how you receive notifications" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Email Notifications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Receive email updates about your registrations" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", defaultChecked: true, className: "h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Game Reminders" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Get reminders before upcoming games" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", defaultChecked: true, className: "h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Payment Notifications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Receive alerts about payment confirmations" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", defaultChecked: true, className: "h-4 w-4" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Save Preferences" }) })
      ] })
    ] })
  ] });
}
export {
  AccountPage as component
};
