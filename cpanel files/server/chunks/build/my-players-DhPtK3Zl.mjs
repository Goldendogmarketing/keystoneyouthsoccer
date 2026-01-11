import { j as jsxRuntimeExports, r as reactExports, a as createServerFn } from "./server.mjs";
import { u as useQuery } from "./useQuery-Dr19c9_1.mjs";
import { u as useQueryClient } from "./router-gg-f3raf.mjs";
import { u as useMutation } from "./useMutation-CJftFGr9.mjs";
import { c as createSsrRpc } from "./middleware-BXaiHw3P.mjs";
import { ax as object, aC as array, ay as string, aB as _enum } from "./db-COtzJr4P.mjs";
import { C as Card, b as CardHeader, a as CardContent } from "./card-ClXHriap.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { U as User } from "./user-DvzdKynG.mjs";
import { S as SquarePen } from "./square-pen-XTP3BpHZ.mjs";
import { T as Trash2 } from "./trash-2-Dggu8vyh.mjs";
import { u as useForm, a, F as Form, c as FormField, d as FormItem, e as FormLabel, f as FormControl, g as FormMessage } from "./form-DK4w9Pw1.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription } from "./dialog-C5R0Rgtd.mjs";
import { I as Input } from "./input-D8ww6-y3.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BBeMvt5U.mjs";
import { P as Plus } from "./plus-DU_Oax2u.mjs";
import { A as Alert, a as AlertDescription } from "./alert-D4nBkVjz.mjs";
import { U as Users } from "./users-BvmkJGmf.mjs";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./useBaseQuery-DdO5QD3T.mjs";
import "./auth-DnREO_GR.mjs";
import "./aggregate-BaXeGeea.mjs";
import "./users.schema-CUS3FIEB.mjs";
import "os";
import "fs";
import "net";
import "tls";
import "perf_hooks";
import "./utils-D4_p2_-I.mjs";
import "./index-DzSr385F.mjs";
import "./label-C0ISNo_U.mjs";
import "./index-COg9yH5I.mjs";
import "./index-DXtQiGwN.mjs";
import "./x-qTweREMH.mjs";
const getPlayers = createServerFn({
  method: "GET"
}).handler(createSsrRpc("28e52e52c279cab55987489b3a1d4381b712869b124bd35357c40bb8dfc4a7d2"));
const deletePlayerSchema = object({
  id: string()
});
const deletePlayer = createServerFn({
  method: "POST"
}).inputValidator((data) => deletePlayerSchema.parse(data)).handler(createSsrRpc("4a4165c588a98d64015758a27896f41b9eb12cb679d09739c91fdd181e1ca5f7"));
function PlayerCard({ player, onEdit, onDelete }) {
  const age = (/* @__PURE__ */ new Date()).getFullYear() - new Date(player.dateOfBirth).getFullYear();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "transition-all hover:shadow-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-start justify-between space-y-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-primary/10", children: player.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: player.photoUrl,
            alt: `${player.firstName} ${player.lastName}`,
            className: "h-16 w-16 rounded-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-8 w-8 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold", children: [
            player.firstName,
            " ",
            player.lastName
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Age ",
            age,
            " • ",
            player.gender === "male" ? "Male" : "Female"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        onEdit && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: onEdit, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4" }) }),
        onDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: onDelete, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
      "Born: ",
      new Date(player.dateOfBirth).toLocaleDateString()
    ] }) })
  ] });
}
const createPlayerSchema = object({
  firstName: string().min(2),
  lastName: string().min(2),
  dateOfBirth: string().min(1),
  gender: _enum(["male", "female"]),
  photoUrl: string().optional(),
  guardians: array(object({
    firstName: string().min(2),
    lastName: string().min(2),
    email: string().email(),
    phone: string().min(10),
    relationship: string().min(1),
    address: string().min(5),
    city: string().min(2),
    state: string().length(2),
    zipCode: string().min(5)
  })).min(1).max(2),
  emergencyContacts: array(object({
    firstName: string().min(2),
    lastName: string().min(2),
    phone: string().min(10),
    relationship: string().min(1)
  })).min(1).max(2)
});
const createPlayer = createServerFn({
  method: "POST"
}).inputValidator((data) => createPlayerSchema.parse(data)).handler(createSsrRpc("90df1dfd59e8e91808cd03f42d0903675614a82e723cc7887622af93f4100380"));
const addPlayerSchema = object({
  firstName: string().min(2, "First name must be at least 2 characters"),
  lastName: string().min(2, "Last name must be at least 2 characters"),
  dateOfBirth: string().min(1, "Date of birth is required"),
  gender: _enum(["male", "female"], { required_error: "Please select a gender" }),
  photoUrl: string().optional(),
  guardian1FirstName: string().min(2, "First name is required"),
  guardian1LastName: string().min(2, "Last name is required"),
  guardian1Email: string().email("Invalid email address"),
  guardian1Phone: string().min(10, "Phone number is required"),
  guardian1Relationship: string().min(1, "Relationship is required"),
  guardian1Address: string().min(5, "Address is required"),
  guardian1City: string().min(2, "City is required"),
  guardian1State: string().length(2, "State must be 2 characters"),
  guardian1ZipCode: string().min(5, "Zip code is required"),
  emergencyContact1FirstName: string().min(2, "First name is required"),
  emergencyContact1LastName: string().min(2, "Last name is required"),
  emergencyContact1Phone: string().min(10, "Phone number is required"),
  emergencyContact1Relationship: string().min(1, "Relationship is required")
});
function AddPlayerDialog() {
  const [open, setOpen] = reactExports.useState(false);
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: a(addPlayerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: void 0,
      photoUrl: "",
      guardian1FirstName: "",
      guardian1LastName: "",
      guardian1Email: "",
      guardian1Phone: "",
      guardian1Relationship: "Parent",
      guardian1Address: "",
      guardian1City: "",
      guardian1State: "",
      guardian1ZipCode: "",
      emergencyContact1FirstName: "",
      emergencyContact1LastName: "",
      emergencyContact1Phone: "",
      emergencyContact1Relationship: ""
    }
  });
  const createPlayerMutation = useMutation({
    mutationFn: createPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      setOpen(false);
      form.reset();
    }
  });
  const onSubmit = (data) => {
    createPlayerMutation.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      photoUrl: data.photoUrl,
      guardians: [
        {
          firstName: data.guardian1FirstName,
          lastName: data.guardian1LastName,
          email: data.guardian1Email,
          phone: data.guardian1Phone,
          relationship: data.guardian1Relationship,
          address: data.guardian1Address,
          city: data.guardian1City,
          state: data.guardian1State,
          zipCode: data.guardian1ZipCode
        }
      ],
      emergencyContacts: [
        {
          firstName: data.emergencyContact1FirstName,
          lastName: data.emergencyContact1LastName,
          phone: data.emergencyContact1Phone,
          relationship: data.emergencyContact1Relationship
        }
      ]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
      "Add Player"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add New Player" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Create a new player profile. You can add more details later." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Player Information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "firstName",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "First Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "lastName",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Last Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "dateOfBirth",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Date of Birth" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "gender",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Gender" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select gender" }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "male", children: "Male" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "female", children: "Female" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Primary Guardian" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "guardian1FirstName",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "First Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "guardian1LastName",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Last Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "guardian1Email",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Email" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "guardian1Phone",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Phone" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "guardian1Address",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { className: "md:col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "guardian1City",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "City" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "guardian1State",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "State" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { maxLength: 2, ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "guardian1ZipCode",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Zip Code" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Emergency Contact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "emergencyContact1FirstName",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "First Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "emergencyContact1LastName",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Last Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "emergencyContact1Phone",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Phone" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                control: form.control,
                name: "emergencyContact1Relationship",
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Relationship" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setOpen(false), children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: createPlayerMutation.isPending, children: createPlayerMutation.isPending ? "Adding..." : "Add Player" })
        ] })
      ] }) })
    ] })
  ] });
}
function MyPlayersPage() {
  const queryClient = useQueryClient();
  const {
    data: players,
    isLoading
  } = useQuery({
    queryKey: ["players"],
    queryFn: async () => await getPlayers()
  });
  const deletePlayerMutation = useMutation({
    mutationFn: deletePlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["players"]
      });
    }
  });
  const handleDeletePlayer = async (playerId) => {
    if (confirm("Are you sure you want to delete this player? This action cannot be undone.")) {
      await deletePlayerMutation.mutateAsync({
        id: playerId
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "My Players" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage your player profiles" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AddPlayerDialog, {})
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Loading players..." }) }) : players && players.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2", children: players.map((player) => /* @__PURE__ */ jsxRuntimeExports.jsx(PlayerCard, { player, onEdit: () => {
      console.log("Edit player:", player.id);
    }, onDelete: () => handleDeletePlayer(player.id) }, player.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: 'No players yet. Click "Add Player" to create your first player profile.' })
    ] })
  ] });
}
export {
  MyPlayersPage as component
};
