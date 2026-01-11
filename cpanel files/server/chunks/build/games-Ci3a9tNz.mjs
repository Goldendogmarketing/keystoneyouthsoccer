import { r as reactExports, j as jsxRuntimeExports, a as createServerFn } from "./server.mjs";
import { u as useQuery } from "./useQuery-Dr19c9_1.mjs";
import { u as useQueryClient, b as LoaderCircle, c as createLucideIcon, l as getSeasons } from "./router-gg-f3raf.mjs";
import { u as useMutation } from "./useMutation-CJftFGr9.mjs";
import { C as Card, a as CardContent } from "./card-ClXHriap.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { I as Input } from "./input-D8ww6-y3.mjs";
import { L as Label } from "./label-C0ISNo_U.mjs";
import { T as Textarea } from "./textarea-1TG3IgRf.mjs";
import { B as Badge } from "./badge-C-B9-Nwc.mjs";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-C5R0Rgtd.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BBeMvt5U.mjs";
import { c as createSsrRpc } from "./middleware-BXaiHw3P.mjs";
import { ax as object, ay as string, aB as _enum, aD as number } from "./db-COtzJr4P.mjs";
import { g as getAllTeams } from "./get-all-teams-DJAhV5d6.mjs";
import { P as Plus } from "./plus-DU_Oax2u.mjs";
import { C as Calendar } from "./calendar-CzOox_IF.mjs";
import { C as Clock } from "./clock-BEPwIiZV.mjs";
import { C as CircleCheckBig } from "./circle-check-big-BIKbtM5o.mjs";
import { F as Funnel } from "./funnel-BSNbCC3x.mjs";
import { M as MapPin } from "./map-pin-iq44-sa-.mjs";
import { T as Trophy } from "./trophy-CCj13N4N.mjs";
import { S as SquarePen } from "./square-pen-XTP3BpHZ.mjs";
import { T as Trash2 } from "./trash-2-Dggu8vyh.mjs";
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
import "./index-COg9yH5I.mjs";
import "./index-DXtQiGwN.mjs";
import "./x-qTweREMH.mjs";
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
const getAllGames = createServerFn({
  method: "GET"
}).handler(createSsrRpc("d127262fe30605b507707ab315c22964386e48315d66fdf846f5877e2752983a"));
createServerFn({
  method: "GET"
}).validator(object({
  seasonId: string().uuid()
})).handler(createSsrRpc("44e6dec7bd934360898697b7ea6abdb4945b02ac37f37af9570e9cbf832e810f"));
const createGame = createServerFn({
  method: "POST"
}).validator(object({
  seasonId: string().uuid(),
  homeTeamId: string().uuid().optional(),
  awayTeamId: string().uuid().optional(),
  scheduledAt: string(),
  location: string().min(1),
  field: string().optional(),
  type: _enum(["regular", "playoff", "tournament"]).default("regular"),
  notes: string().optional()
})).handler(createSsrRpc("cb3f2f87dc758d2edd735e6db3d5d6203bec710091f0976b3e4fcfa19502e0bb"));
const updateGame = createServerFn({
  method: "POST"
}).validator(object({
  id: string().uuid(),
  homeTeamId: string().uuid().optional().nullable(),
  awayTeamId: string().uuid().optional().nullable(),
  scheduledAt: string().optional(),
  location: string().min(1).optional(),
  field: string().optional().nullable(),
  type: _enum(["regular", "playoff", "tournament"]).optional(),
  status: _enum(["scheduled", "in_progress", "completed", "cancelled"]).optional(),
  homeScore: number().int().min(0).optional().nullable(),
  awayScore: number().int().min(0).optional().nullable(),
  notes: string().optional().nullable()
})).handler(createSsrRpc("6f164556ea0eb95de9349fd13f53dd3cf0cf0b73b0efee06323e2e3944f6abe2"));
const deleteGame = createServerFn({
  method: "POST"
}).validator(object({
  id: string().uuid()
})).handler(createSsrRpc("4d0dd3b55c37e2c19fd04f18d02e7d93f74c488492993379d71453764dc35cd2"));
const updateGameScore = createServerFn({
  method: "POST"
}).validator(object({
  id: string().uuid(),
  homeScore: number().int().min(0),
  awayScore: number().int().min(0),
  status: _enum(["scheduled", "in_progress", "completed", "cancelled"]).default("completed")
})).handler(createSsrRpc("f825f33c417f2f95f632fe4486ae3ceb1009ccb33180041b974a4aec9f5028ea"));
const initialFormData = {
  seasonId: "",
  homeTeamId: "",
  awayTeamId: "",
  scheduledAt: "",
  scheduledTime: "10:00",
  location: "",
  field: "",
  type: "regular",
  notes: ""
};
function AdminGames() {
  const queryClient = useQueryClient();
  const {
    data: games = [],
    isLoading: gamesLoading
  } = useQuery({
    queryKey: ["admin-games"],
    queryFn: async () => await getAllGames()
  });
  const {
    data: teams = []
  } = useQuery({
    queryKey: ["admin-teams"],
    queryFn: async () => await getAllTeams()
  });
  const {
    data: seasonsData
  } = useQuery({
    queryKey: ["seasons"],
    queryFn: async () => await getSeasons()
  });
  const seasons = seasonsData?.seasons || [];
  const [showForm, setShowForm] = reactExports.useState(false);
  const [showScoreForm, setShowScoreForm] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [scoringGameId, setScoringGameId] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState(initialFormData);
  const [scoreData, setScoreData] = reactExports.useState({
    homeScore: "0",
    awayScore: "0"
  });
  const [filterSeason, setFilterSeason] = reactExports.useState("all");
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const [filterAgeGroup, setFilterAgeGroup] = reactExports.useState("all");
  const createMutation = useMutation({
    mutationFn: async (data) => {
      const scheduledAt = `${data.scheduledAt}T${data.scheduledTime}:00`;
      return await createGame({
        data: {
          seasonId: data.seasonId,
          homeTeamId: data.homeTeamId || void 0,
          awayTeamId: data.awayTeamId || void 0,
          scheduledAt,
          location: data.location,
          field: data.field || void 0,
          type: data.type,
          notes: data.notes || void 0
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-games"]
      });
      resetForm();
    }
  });
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data
    }) => {
      const scheduledAt = `${data.scheduledAt}T${data.scheduledTime}:00`;
      return await updateGame({
        data: {
          id,
          homeTeamId: data.homeTeamId || null,
          awayTeamId: data.awayTeamId || null,
          scheduledAt,
          location: data.location,
          field: data.field || null,
          type: data.type,
          notes: data.notes || null
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-games"]
      });
      resetForm();
    }
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteGame({
        data: {
          id
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-games"]
      });
    }
  });
  const scoreMutation = useMutation({
    mutationFn: async ({
      id,
      homeScore,
      awayScore
    }) => {
      return await updateGameScore({
        data: {
          id,
          homeScore,
          awayScore,
          status: "completed"
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-games"]
      });
      setShowScoreForm(false);
      setScoringGameId(null);
      setScoreData({
        homeScore: "0",
        awayScore: "0"
      });
    }
  });
  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(initialFormData);
  };
  const handleEdit = (game) => {
    const date = new Date(game.scheduledAt);
    setEditingId(game.id);
    setFormData({
      seasonId: game.seasonId,
      homeTeamId: game.homeTeamId || "",
      awayTeamId: game.awayTeamId || "",
      scheduledAt: date.toISOString().split("T")[0],
      scheduledTime: date.toTimeString().slice(0, 5),
      location: game.location,
      field: game.field || "",
      type: game.type,
      notes: game.notes || ""
    });
    setShowForm(true);
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this game?")) {
      deleteMutation.mutate(id);
    }
  };
  const handleScoreEdit = (game) => {
    setScoringGameId(game.id);
    setScoreData({
      homeScore: String(game.homeScore || 0),
      awayScore: String(game.awayScore || 0)
    });
    setShowScoreForm(true);
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
  const handleScoreSubmit = (e) => {
    e.preventDefault();
    if (scoringGameId) {
      scoreMutation.mutate({
        id: scoringGameId,
        homeScore: parseInt(scoreData.homeScore) || 0,
        awayScore: parseInt(scoreData.awayScore) || 0
      });
    }
  };
  const filteredTeams = formData.seasonId ? teams.filter((t) => t.seasonId === formData.seasonId) : teams;
  const ageGroups = [...new Set(teams.map((t) => t.ageGroup))].sort();
  const filteredGames = games.filter((game) => {
    if (filterSeason !== "all" && game.seasonId !== filterSeason) return false;
    if (filterStatus !== "all" && game.status !== filterStatus) return false;
    if (filterAgeGroup !== "all") {
      const homeTeamAgeGroup = game.homeTeam?.ageGroup;
      const awayTeamAgeGroup = game.awayTeam?.ageGroup;
      if (homeTeamAgeGroup !== filterAgeGroup && awayTeamAgeGroup !== filterAgeGroup) return false;
    }
    return true;
  });
  const isPending = createMutation.isPending || updateMutation.isPending;
  const scheduledCount = games.filter((g) => g.status === "scheduled").length;
  const completedCount = games.filter((g) => g.status === "completed").length;
  const cancelledCount = games.filter((g) => g.status === "cancelled").length;
  if (gamesLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Game Schedule" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage games and record scores" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
        setShowForm(true);
        setEditingId(null);
        setFormData(initialFormData);
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
        "Add Game"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Total Games" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: games.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-8 w-8 text-primary/50" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Scheduled" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: scheduledCount })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-8 w-8 text-blue-500/50" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Completed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: completedCount })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-8 w-8 text-green-500/50" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Cancelled" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: cancelledCount })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-8 w-8 text-red-500/50" })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Filters:" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterSeason, onValueChange: setFilterSeason, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Seasons" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Seasons" }),
          seasons.map((season) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: season.id, children: season.name }, season.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterAgeGroup, onValueChange: setFilterAgeGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[150px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Age Groups" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Age Groups" }),
          ageGroups.map((ag) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ag, children: ag }, ag))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterStatus, onValueChange: setFilterStatus, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[150px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Status" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "scheduled", children: "Scheduled" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "in_progress", children: "In Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "completed", children: "Completed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cancelled", children: "Cancelled" })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: filteredGames.length > 0 ? filteredGames.map((game) => /* @__PURE__ */ jsxRuntimeExports.jsx(GameCard, { game, onEdit: handleEdit, onDelete: handleDelete, onScore: handleScoreEdit }, game.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "mx-auto h-12 w-12 text-muted-foreground/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "No games found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "mt-4", onClick: () => {
        setShowForm(true);
        setEditingId(null);
        setFormData(initialFormData);
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
        "Add Your First Game"
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showForm, onOpenChange: (open) => !open && resetForm(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[600px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingId ? "Edit Game" : "Add New Game" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: editingId ? "Update game details" : "Schedule a new game between two teams" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seasonId", children: "Season *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: formData.seasonId, onValueChange: (value) => setFormData({
            ...formData,
            seasonId: value,
            homeTeamId: "",
            awayTeamId: ""
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select season" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: seasons.map((season) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: season.id, children: season.name }, season.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "homeTeamId", children: "Home Team" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: formData.homeTeamId, onValueChange: (value) => setFormData({
              ...formData,
              homeTeamId: value
            }), disabled: !formData.seasonId, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select home team" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "", children: "TBD" }),
                filteredTeams.map((team) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: team.id, children: [
                  team.name,
                  " (",
                  team.ageGroup,
                  ")"
                ] }, team.id))
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "awayTeamId", children: "Away Team" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: formData.awayTeamId, onValueChange: (value) => setFormData({
              ...formData,
              awayTeamId: value
            }), disabled: !formData.seasonId, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select away team" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "", children: "TBD" }),
                filteredTeams.map((team) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: team.id, children: [
                  team.name,
                  " (",
                  team.ageGroup,
                  ")"
                ] }, team.id))
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "scheduledAt", children: "Date *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "scheduledAt", type: "date", value: formData.scheduledAt, onChange: (e) => setFormData({
              ...formData,
              scheduledAt: e.target.value
            }), required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "scheduledTime", children: "Time *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "scheduledTime", type: "time", value: formData.scheduledTime, onChange: (e) => setFormData({
              ...formData,
              scheduledTime: e.target.value
            }), required: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "location", children: "Location *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "location", value: formData.location, onChange: (e) => setFormData({
              ...formData,
              location: e.target.value
            }), placeholder: "e.g., Main Soccer Complex", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "field", children: "Field" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "field", value: formData.field, onChange: (e) => setFormData({
              ...formData,
              field: e.target.value
            }), placeholder: "e.g., Field A" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "type", children: "Game Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: formData.type, onValueChange: (value) => setFormData({
            ...formData,
            type: value
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select type" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "regular", children: "Regular Season" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "playoff", children: "Playoff" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "tournament", children: "Tournament" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notes", children: "Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "notes", value: formData.notes, onChange: (e) => setFormData({
            ...formData,
            notes: e.target.value
          }), placeholder: "Additional notes...", rows: 2 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: resetForm, disabled: isPending, children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: isPending || !formData.seasonId, children: [
            isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
            editingId ? "Save Changes" : "Add Game"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showScoreForm, onOpenChange: (open) => !open && setShowScoreForm(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[400px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Record Game Score" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Enter the final score for this game" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleScoreSubmit, className: "space-y-4", children: [
        scoringGameId && (() => {
          const game = games.find((g) => g.id === scoringGameId);
          if (!game) return null;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-2 text-muted-foreground", children: [
            game.homeTeam?.name || "TBD",
            " vs ",
            game.awayTeam?.name || "TBD"
          ] });
        })(),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "homeScore", children: "Home Score" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "homeScore", type: "number", min: "0", value: scoreData.homeScore, onChange: (e) => setScoreData({
              ...scoreData,
              homeScore: e.target.value
            }), className: "text-center text-2xl font-bold h-14" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "awayScore", children: "Away Score" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "awayScore", type: "number", min: "0", value: scoreData.awayScore, onChange: (e) => setScoreData({
              ...scoreData,
              awayScore: e.target.value
            }), className: "text-center text-2xl font-bold h-14" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setShowScoreForm(false), children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: scoreMutation.isPending, children: [
            scoreMutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
            "Save Score"
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
function GameCard({
  game,
  onEdit,
  onDelete,
  onScore
}) {
  const gameDate = new Date(game.scheduledAt);
  const isCompleted = game.status === "completed";
  const isCancelled = game.status === "cancelled";
  const isPast = gameDate < /* @__PURE__ */ new Date() && !isCompleted && !isCancelled;
  const getStatusBadge = () => {
    switch (game.status) {
      case "completed":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", children: "Completed" });
      case "in_progress":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", children: "In Progress" });
      case "cancelled":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", children: "Cancelled" });
      default:
        return isPast ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", children: "Needs Score" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "Scheduled" });
    }
  };
  const getTypeBadge = () => {
    switch (game.type) {
      case "playoff":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "Playoff" });
      case "tournament":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "Tournament" });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: isCancelled ? "opacity-60" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        getStatusBadge(),
        getTypeBadge(),
        game.homeTeam?.ageGroup && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: game.homeTeam.ageGroup })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center min-w-[120px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: game.homeTeam?.name || "TBD" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Home" }),
          isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold mt-1", children: game.homeScore })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-muted-foreground", children: "vs" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center min-w-[120px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: game.awayTeam?.name || "TBD" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Away" }),
          isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold mt-1", children: game.awayScore })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 text-sm text-muted-foreground md:text-right", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 md:justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: gameDate.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric"
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 md:justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: gameDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit"
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 md:justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          game.location,
          game.field ? ` - ${game.field}` : ""
        ] })
      ] }),
      game.season && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/70", children: game.season.name }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 md:flex-col", children: [
      (game.status === "scheduled" || isPast) && !isCancelled && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => onScore(game), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "mr-2 h-4 w-4" }),
        "Score"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => onEdit(game), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "text-destructive hover:text-destructive", onClick: () => onDelete(game.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
    ] })
  ] }) }) });
}
export {
  AdminGames as component
};
