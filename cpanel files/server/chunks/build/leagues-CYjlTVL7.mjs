import { r as reactExports, j as jsxRuntimeExports } from "./server.mjs";
import { u as useQuery } from "./useQuery-Dr19c9_1.mjs";
import { u as useQueryClient, b as LoaderCircle } from "./router-gg-f3raf.mjs";
import { u as useMutation } from "./useMutation-CJftFGr9.mjs";
import { C as Card, b as CardHeader, d as CardTitle, e as CardDescription, a as CardContent } from "./card-ClXHriap.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { I as Input } from "./input-D8ww6-y3.mjs";
import { L as Label } from "./label-C0ISNo_U.mjs";
import { T as Textarea } from "./textarea-1TG3IgRf.mjs";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-C5R0Rgtd.mjs";
import { c as createLeague, u as updateLeague, t as toggleLeagueActive, d as deleteLeague, l as leaguesQueries } from "./queries-BmdhOxyw.mjs";
import { P as Plus } from "./plus-DU_Oax2u.mjs";
import { L as Layers, S as Settings } from "./settings-C6zIOl5N.mjs";
import { S as SquarePen } from "./square-pen-XTP3BpHZ.mjs";
import { S as Shield } from "./shield-Dy22rVVt.mjs";
import { U as Users } from "./users-BvmkJGmf.mjs";
import { C as ChevronRight } from "./chevron-right-CIxPr743.mjs";
import { C as Calendar } from "./calendar-CzOox_IF.mjs";
import { T as Trash2 } from "./trash-2-Dggu8vyh.mjs";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./useBaseQuery-DdO5QD3T.mjs";
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
import "./utils-D4_p2_-I.mjs";
import "./index-DzSr385F.mjs";
import "./index-COg9yH5I.mjs";
import "./index-DXtQiGwN.mjs";
import "./x-qTweREMH.mjs";
const initialFormData = {
  name: "",
  startDate: "",
  endDate: "",
  registrationOpenDate: "",
  registrationCloseDate: "",
  registrationFee: "75.00",
  description: ""
};
function AdminLeagues() {
  const queryClient = useQueryClient();
  const {
    data: leagues = [],
    isLoading
  } = useQuery(leaguesQueries.all());
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [expandedLeague, setExpandedLeague] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState(initialFormData);
  const createMutation = useMutation({
    mutationFn: async (data) => {
      return await createLeague({
        data: {
          name: data.name,
          startDate: data.startDate,
          endDate: data.endDate,
          registrationOpenDate: data.registrationOpenDate,
          registrationCloseDate: data.registrationCloseDate,
          registrationFee: data.registrationFee,
          description: data.description || void 0
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leagues"]
      });
      resetForm();
    }
  });
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data
    }) => {
      return await updateLeague({
        data: {
          id,
          name: data.name,
          startDate: data.startDate,
          endDate: data.endDate,
          registrationOpenDate: data.registrationOpenDate,
          registrationCloseDate: data.registrationCloseDate,
          registrationFee: data.registrationFee,
          description: data.description || void 0
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leagues"]
      });
      resetForm();
    }
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteLeague({
        data: {
          id
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leagues"]
      });
    }
  });
  const toggleMutation = useMutation({
    mutationFn: async (id) => {
      return await toggleLeagueActive({
        data: {
          id
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leagues"]
      });
    }
  });
  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(initialFormData);
  };
  const handleEdit = (league) => {
    setEditingId(league.id);
    setFormData({
      name: league.name,
      startDate: league.startDate,
      endDate: league.endDate,
      registrationOpenDate: league.registrationOpenDate,
      registrationCloseDate: league.registrationCloseDate,
      registrationFee: league.registrationFee,
      description: league.description || ""
    });
    setShowForm(true);
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this league? This will also delete all associated teams.")) {
      deleteMutation.mutate(id);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({
        id: editingId,
        data: formData
      });
    } else {
      createMutation.mutate(formData);
    }
  };
  const activeLeagues = leagues.filter((l) => l.isActive);
  const pastLeagues = leagues.filter((l) => !l.isActive);
  const isPending = createMutation.isPending || updateMutation.isPending;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Leagues" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage leagues, divisions, and team assignments" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
        setShowForm(true);
        setEditingId(null);
        setFormData(initialFormData);
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
        "Create League"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showForm, onOpenChange: (open) => !open && resetForm(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[550px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingId ? "Edit League" : "Create New League" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Set up a new league for an upcoming season" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "League Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", value: formData.name, onChange: (e) => setFormData({
            ...formData,
            name: e.target.value
          }), placeholder: "e.g., Spring 2026", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "startDate", children: "Season Start" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "startDate", type: "date", value: formData.startDate, onChange: (e) => setFormData({
              ...formData,
              startDate: e.target.value
            }), required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "endDate", children: "Season End" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "endDate", type: "date", value: formData.endDate, onChange: (e) => setFormData({
              ...formData,
              endDate: e.target.value
            }), required: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "registrationOpenDate", children: "Registration Opens" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "registrationOpenDate", type: "date", value: formData.registrationOpenDate, onChange: (e) => setFormData({
              ...formData,
              registrationOpenDate: e.target.value
            }), required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "registrationCloseDate", children: "Registration Closes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "registrationCloseDate", type: "date", value: formData.registrationCloseDate, onChange: (e) => setFormData({
              ...formData,
              registrationCloseDate: e.target.value
            }), required: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "registrationFee", children: "Registration Fee ($)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "registrationFee", type: "number", step: "0.01", value: formData.registrationFee, onChange: (e) => setFormData({
            ...formData,
            registrationFee: e.target.value
          }), placeholder: "75.00", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Description (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "description", value: formData.description, onChange: (e) => setFormData({
            ...formData,
            description: e.target.value
          }), placeholder: "League description...", rows: 2 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: resetForm, disabled: isPending, children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: isPending, children: [
            isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
            editingId ? "Save Changes" : "Create League"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-green-500" }),
        "Active Leagues"
      ] }),
      activeLeagues.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: activeLeagues.map((league) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-5 w-5" }),
              league.name,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded bg-green-100 text-green-700", children: "Active" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { className: "mt-1", children: [
              new Date(league.startDate).toLocaleDateString(),
              " -",
              " ",
              new Date(league.endDate).toLocaleDateString(),
              " • ",
              "$",
              league.registrationFee,
              " registration"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleEdit(league), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => toggleMutation.mutate(league.id), disabled: toggleMutation.isPending, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 rounded-lg bg-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-muted-foreground mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Age Groups" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold", children: league.divisions.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 rounded-lg bg-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-muted-foreground mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Teams" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold", children: league.teamCount })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 rounded-lg bg-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-muted-foreground mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Players" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold", children: league.playerCount })
            ] })
          ] }),
          league.divisions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold", children: "Age Groups" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y rounded-lg border", children: league.divisions.map((division) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary", children: division.ageGroup }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
                    division.ageGroup,
                    " Division"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                    division.teamCount,
                    " teams"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", children: [
                "Manage Teams",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-1 h-4 w-4" })
              ] })
            ] }, division.ageGroup)) })
          ] }),
          league.divisions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-4 text-muted-foreground border rounded-lg", children: "No teams registered yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-6 pt-4 border-t", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "flex-1", disabled: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "mr-2 h-4 w-4" }),
              "Generate Schedule"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "flex-1", disabled: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "mr-2 h-4 w-4" }),
              "Team Assignments"
            ] })
          ] })
        ] })
      ] }, league.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "mx-auto h-12 w-12 text-muted-foreground/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "No active leagues" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "mt-4", onClick: () => setShowForm(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Create League"
        ] })
      ] }) }) })
    ] }),
    pastLeagues.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-gray-400" }),
        "Past / Inactive Leagues"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: pastLeagues.map((league) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "opacity-75", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-5 w-5" }),
              league.name,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700", children: "Inactive" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { className: "mt-1", children: [
              new Date(league.startDate).toLocaleDateString(),
              " -",
              " ",
              new Date(league.endDate).toLocaleDateString(),
              " • ",
              league.divisions.length,
              " age groups • ",
              league.teamCount,
              " teams •",
              " ",
              league.playerCount,
              " players"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => toggleMutation.mutate(league.id), disabled: toggleMutation.isPending, children: "Activate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleEdit(league), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "text-destructive", onClick: () => handleDelete(league.id), disabled: deleteMutation.isPending, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", className: "w-full justify-between", onClick: () => setExpandedLeague(expandedLeague === league.id ? null : league.id), children: [
            "View Age Groups & Stats",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: `h-4 w-4 transition-transform ${expandedLeague === league.id ? "rotate-90" : ""}` })
          ] }),
          expandedLeague === league.id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: league.divisions.length > 0 ? league.divisions.map((division) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
              division.ageGroup,
              " Division"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              division.teamCount,
              " teams"
            ] })
          ] }, division.ageGroup)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-4 text-muted-foreground", children: "No teams were registered" }) })
        ] })
      ] }, league.id)) })
    ] })
  ] });
}
export {
  AdminLeagues as component
};
