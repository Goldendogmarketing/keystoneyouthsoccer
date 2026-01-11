import { r as reactExports, j as jsxRuntimeExports, a as createServerFn } from "./server.mjs";
import { u as useQuery } from "./useQuery-Dr19c9_1.mjs";
import { u as useQueryClient, b as LoaderCircle, q as queryOptions } from "./router-gg-f3raf.mjs";
import { u as useMutation } from "./useMutation-CJftFGr9.mjs";
import { C as Card, b as CardHeader, e as CardDescription, a as CardContent, d as CardTitle } from "./card-ClXHriap.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { I as Input } from "./input-D8ww6-y3.mjs";
import { L as Label } from "./label-C0ISNo_U.mjs";
import { B as Badge } from "./badge-C-B9-Nwc.mjs";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-C5R0Rgtd.mjs";
import { c as createSsrRpc } from "./middleware-BXaiHw3P.mjs";
import { ax as object, aB as _enum, ay as string, aC as array, aA as boolean$1 } from "./db-COtzJr4P.mjs";
import { l as leaguesQueries } from "./queries-BmdhOxyw.mjs";
import { F as FileText } from "./file-text-CB-9r6-n.mjs";
import { C as CircleCheckBig } from "./circle-check-big-BIKbtM5o.mjs";
import { D as DollarSign } from "./dollar-sign-BzamVIyO.mjs";
import { U as Users } from "./users-BvmkJGmf.mjs";
import { S as Search, U as UserPlus, D as Download } from "./user-plus-DkJ6P9bg.mjs";
import { F as Funnel } from "./funnel-BSNbCC3x.mjs";
import { X } from "./x-qTweREMH.mjs";
import { E as Eye } from "./eye-CaaJptZy.mjs";
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
const getGuestRegistrationsSchema = object({
  seasonId: string().uuid().optional(),
  status: string().optional(),
  ageGroup: string().optional(),
  search: string().optional(),
  teamAssigned: boolean$1().optional()
});
const getGuestRegistrations = createServerFn({
  method: "GET"
}).inputValidator((data) => getGuestRegistrationsSchema.parse(data)).handler(createSsrRpc("d198db21a0a1500eed6c78a72047d7ecd6043909e43efd92f8297614e5513deb"));
const getRegistrationDetailsSchema = object({
  id: string().uuid()
});
const getRegistrationDetails = createServerFn({
  method: "GET"
}).inputValidator((data) => getRegistrationDetailsSchema.parse(data)).handler(createSsrRpc("a924a6f799a2fdb290b6a26fcedc6b8b6489e5503a6925a593673737aa19ab64"));
const createGuestRegistrationSchema = object({
  // Player
  playerFirstName: string().min(1),
  playerLastName: string().min(1),
  playerDateOfBirth: string(),
  playerGender: _enum(["male", "female"]),
  // Parent
  parentFirstName: string().min(1),
  parentLastName: string().min(1),
  parentEmail: string().email(),
  parentPhone: string().min(1),
  parentAddress: string().min(1),
  parentCity: string().min(1),
  parentState: string().min(1),
  parentZipCode: string().min(1),
  // Secondary Guardian (optional)
  guardian2FirstName: string().optional(),
  guardian2LastName: string().optional(),
  guardian2Email: string().optional(),
  guardian2Phone: string().optional(),
  guardian2Relationship: string().optional(),
  // Emergency Contacts
  emergency1Name: string().min(1),
  emergency1Phone: string().min(1),
  emergency1Relationship: string().min(1),
  emergency2Name: string().optional(),
  emergency2Phone: string().optional(),
  emergency2Relationship: string().optional(),
  // Medical
  allergies: string().optional(),
  medicalConditions: string().optional(),
  medications: string().optional(),
  insuranceProvider: string().optional(),
  insurancePolicyNumber: string().optional(),
  physicianName: string().optional(),
  physicianPhone: string().optional(),
  // Season
  seasonId: string().uuid(),
  // Waivers
  electronicSignature: string().min(1),
  waiverAccepted: boolean$1(),
  photoReleaseAccepted: boolean$1(),
  codeOfConductAccepted: boolean$1()
});
createServerFn({
  method: "POST"
}).inputValidator((data) => createGuestRegistrationSchema.parse(data)).handler(createSsrRpc("30a806273d2e668febecc6bd9b370aa8d049365051bd0c6ab870b25412322dbb"));
const updateRegistrationSchema = object({
  id: string().uuid(),
  status: string().optional(),
  paymentStatus: string().optional(),
  teamId: string().uuid().optional().nullable(),
  notes: string().optional()
});
createServerFn({
  method: "POST"
}).inputValidator((data) => updateRegistrationSchema.parse(data)).handler(createSsrRpc("65bffc39668db5a3e4d72a6d363bebcab178a90aadbd455b2e82b8d3d15e5ed7"));
const assignToTeamSchema = object({
  registrationId: string().uuid(),
  teamId: string().uuid().nullable()
});
const assignToTeam = createServerFn({
  method: "POST"
}).inputValidator((data) => assignToTeamSchema.parse(data)).handler(createSsrRpc("bfdb014bee0de1bc86c3be29868515e29ed24ab4eedf65cd4cf49e6f8221f607"));
const bulkAssignToTeamSchema = object({
  registrationIds: array(string().uuid()),
  teamId: string().uuid()
});
const bulkAssignToTeam = createServerFn({
  method: "POST"
}).inputValidator((data) => bulkAssignToTeamSchema.parse(data)).handler(createSsrRpc("685a905ef235c5c141fa88be0a792133ddcd4350ccd5a9fcdb91bff4f3ded2f9"));
const exportCsvSchema = object({
  seasonId: string().uuid().optional(),
  format: _enum(["standard", "gotsoccer"]).optional()
});
const exportRegistrationsCsv = createServerFn({
  method: "POST"
}).inputValidator((data) => exportCsvSchema.parse(data)).handler(createSsrRpc("e6a1f8f625631561a046edf6952e4cfdc79c36ffb98ebf93025d400f8ee150a2"));
const getCrmStats = createServerFn({
  method: "GET"
}).handler(createSsrRpc("1b2c3386e869ed4101287bcd7c3790c400e306edd7db5c921c3a9d4189e47541"));
const getTeamsForAssignmentSchema = object({
  seasonId: string().uuid(),
  ageGroup: string().optional()
});
const getTeamsForAssignment = createServerFn({
  method: "GET"
}).inputValidator((data) => getTeamsForAssignmentSchema.parse(data)).handler(createSsrRpc("be48564cd96d7dd4fcc89c0dd0b22122768659e19494527e90d1abdfe6b48ab9"));
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  assignToTeam,
  bulkAssignToTeam,
  exportRegistrationsCsv,
  getCrmStats,
  getGuestRegistrations,
  getRegistrationDetails,
  getTeamsForAssignment
}, Symbol.toStringTag, { value: "Module" }));
const crmQueries = {
  registrations: (filters = {}) => queryOptions({
    queryKey: ["crm", "registrations", filters],
    queryFn: async ({ signal }) => await getGuestRegistrations({ data: filters, signal }),
    staleTime: 1e3 * 30
    // 30 seconds
  }),
  registrationDetails: (id) => queryOptions({
    queryKey: ["crm", "registration", id],
    queryFn: async ({ signal }) => await getRegistrationDetails({ data: { id }, signal }),
    staleTime: 1e3 * 60,
    // 1 minute
    enabled: !!id
  }),
  stats: () => queryOptions({
    queryKey: ["crm", "stats"],
    queryFn: async ({ signal }) => await getCrmStats({ signal }),
    staleTime: 1e3 * 30
    // 30 seconds
  }),
  teamsForAssignment: (seasonId, ageGroup) => queryOptions({
    queryKey: ["crm", "teams", seasonId, ageGroup],
    queryFn: async ({ signal }) => await getTeamsForAssignment({ data: { seasonId, ageGroup }, signal }),
    staleTime: 1e3 * 60,
    // 1 minute
    enabled: !!seasonId
  })
};
function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
function formatDateTime(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${month}/${day}/${year}, ${hour12}:${minutes} ${ampm}`;
}
const AGE_GROUPS = ["U6", "U8", "U10", "U12", "U14", "U16+"];
function AdminRegistrationsPage() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [selectedSeason, setSelectedSeason] = reactExports.useState("");
  const [selectedStatus, setSelectedStatus] = reactExports.useState("");
  const [selectedAgeGroup, setSelectedAgeGroup] = reactExports.useState("");
  const [teamFilter, setTeamFilter] = reactExports.useState("");
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const [selectedIds, setSelectedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [showBulkAssign, setShowBulkAssign] = reactExports.useState(false);
  const [bulkTeamId, setBulkTeamId] = reactExports.useState("");
  const [selectedRegistration, setSelectedRegistration] = reactExports.useState(null);
  const {
    data: stats,
    isLoading: statsLoading
  } = useQuery(crmQueries.stats());
  const {
    data: leagues = []
  } = useQuery(leaguesQueries.all());
  const filters = {
    seasonId: selectedSeason || void 0,
    status: selectedStatus || void 0,
    ageGroup: selectedAgeGroup || void 0,
    search: searchQuery || void 0,
    teamAssigned: teamFilter === "assigned" ? true : teamFilter === "unassigned" ? false : void 0
  };
  const {
    data: registrations = [],
    isLoading: registrationsLoading
  } = useQuery(crmQueries.registrations(filters));
  const activeSeason = leagues.find((l) => l.isActive);
  const {
    data: teams = []
  } = useQuery({
    queryKey: ["teams-for-assignment", activeSeason?.id],
    queryFn: async () => {
      if (!activeSeason?.id) return [];
      const {
        getTeamsForAssignment: getTeamsForAssignment2
      } = await Promise.resolve().then(() => index);
      return await getTeamsForAssignment2({
        data: {
          seasonId: activeSeason.id
        }
      });
    },
    enabled: !!activeSeason?.id
  });
  const exportMutation = useMutation({
    mutationFn: async () => {
      return await exportRegistrationsCsv({
        data: {
          seasonId: selectedSeason || void 0
        }
      });
    },
    onSuccess: (data) => {
      const blob = new Blob([data.csv], {
        type: "text/csv"
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = data.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  });
  const assignMutation = useMutation({
    mutationFn: async ({
      registrationId,
      teamId
    }) => {
      return await assignToTeam({
        data: {
          registrationId,
          teamId
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["crm"]
      });
    }
  });
  const bulkAssignMutation = useMutation({
    mutationFn: async ({
      registrationIds,
      teamId
    }) => {
      return await bulkAssignToTeam({
        data: {
          registrationIds,
          teamId
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["crm"]
      });
      setSelectedIds(/* @__PURE__ */ new Set());
      setShowBulkAssign(false);
      setBulkTeamId("");
    }
  });
  const handleSelectAll = () => {
    if (selectedIds.size === registrations.length) {
      setSelectedIds(/* @__PURE__ */ new Set());
    } else {
      setSelectedIds(new Set(registrations.map((r) => r.registration.id)));
    }
  };
  const handleSelectOne = (id) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };
  const handleBulkAssign = () => {
    if (bulkTeamId && selectedIds.size > 0) {
      bulkAssignMutation.mutate({
        registrationIds: Array.from(selectedIds),
        teamId: bulkTeamId
      });
    }
  };
  const getStatusBadge = (status, paymentStatus) => {
    if (paymentStatus === "paid") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-700", children: "Paid" });
    }
    if (paymentStatus === "pending") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-100 text-yellow-700", children: "Pending" });
    }
    if (paymentStatus === "failed") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-700", children: "Failed" });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gray-100 text-gray-700", children: status });
  };
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSeason("");
    setSelectedStatus("");
    setSelectedAgeGroup("");
    setTeamFilter("");
  };
  const hasFilters = searchQuery || selectedSeason || selectedStatus || selectedAgeGroup || teamFilter;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Registration CRM" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Manage player registrations, team assignments, and export data" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-sm font-medium", children: "Total Registrations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5 text-muted-foreground" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold", children: stats?.totalRegistrations ?? 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: stats?.activeSeason || "All seasons" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-sm font-medium", children: "Paid" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5 text-green-600" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-green-600", children: stats?.paidRegistrations ?? 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
            stats?.pendingRegistrations ?? 0,
            " pending payment"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-sm font-medium", children: "Revenue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-5 w-5 text-muted-foreground" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl font-bold", children: [
            "$",
            (stats?.totalRevenue ?? 0).toFixed(2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "From paid registrations" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-sm font-medium", children: "Team Assignment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-muted-foreground" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold", children: stats?.assignedToTeam ?? 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
            stats?.unassigned ?? 0,
            " players need assignment"
          ] })
        ] })
      ] })
    ] }),
    stats?.ageGroups && Object.keys(stats.ageGroups).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Players by Age Group" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-4", children: Object.entries(stats.ageGroups).sort(([a], [b]) => {
        const numA = parseInt(a.replace("U", "")) || 0;
        const numB = parseInt(b.replace("U", "")) || 0;
        return numA - numB;
      }).map(([ageGroup, count]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg bg-muted px-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary", children: ageGroup }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: ":" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
          count,
          " players"
        ] })
      ] }, ageGroup)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by name, email, or confirmation #...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => setShowFilters(!showFilters), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "mr-2 h-4 w-4" }),
            "Filters",
            hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 rounded-full bg-primary px-2 text-xs text-white", children: "!" })
          ] }),
          selectedIds.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => setShowBulkAssign(true), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "mr-2 h-4 w-4" }),
            "Assign ",
            selectedIds.size,
            " to Team"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => exportMutation.mutate(), disabled: exportMutation.isPending, children: [
            exportMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-2 h-4 w-4" }),
            "Export CSV"
          ] })
        ] })
      ] }),
      showFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Season" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: selectedSeason, onChange: (e) => setSelectedSeason(e.target.value), className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Seasons" }),
            leagues.map((league) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: league.id, children: league.name }, league.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Payment Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: selectedStatus, onChange: (e) => setSelectedStatus(e.target.value), className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Statuses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "paid", children: "Paid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "Pending" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "failed", children: "Failed" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Age Group" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: selectedAgeGroup, onChange: (e) => setSelectedAgeGroup(e.target.value), className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Age Groups" }),
            AGE_GROUPS.map((ag) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: ag, children: ag }, ag))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Team Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: teamFilter, onChange: (e) => setTeamFilter(e.target.value), className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "assigned", children: "Assigned to Team" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "unassigned", children: "Unassigned" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: clearFilters, className: "w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "mr-2 h-4 w-4" }),
          "Clear Filters"
        ] }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showBulkAssign, onOpenChange: setShowBulkAssign, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Assign Players to Team" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          "Assign ",
          selectedIds.size,
          " selected players to a team."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Select Team" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: bulkTeamId, onChange: (e) => setBulkTeamId(e.target.value), className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Choose a team..." }),
          teams.map((team) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: team.id, children: [
            team.name,
            " (",
            team.ageGroup,
            ")"
          ] }, team.id))
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowBulkAssign(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleBulkAssign, disabled: !bulkTeamId || bulkAssignMutation.isPending, children: [
          bulkAssignMutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          "Assign to Team"
        ] })
      ] })
    ] }) }),
    registrationsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) }) }) }) : registrations.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { children: [
          "Registrations (",
          registrations.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Click on a row to view details or assign to a team" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b bg-muted/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: selectedIds.size === registrations.length && registrations.length > 0, onChange: handleSelectAll, className: "rounded border-gray-300" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left text-sm font-semibold", children: "Player" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left text-sm font-semibold", children: "Parent/Guardian" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left text-sm font-semibold", children: "Age Group" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left text-sm font-semibold", children: "Team" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left text-sm font-semibold", children: "Season" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left text-sm font-semibold", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left text-sm font-semibold", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left text-sm font-semibold", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: registrations.map((reg) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b transition-colors hover:bg-muted/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: selectedIds.has(reg.registration.id), onChange: () => handleSelectOne(reg.registration.id), className: "rounded border-gray-300" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
              reg.registration.playerFirstName,
              " ",
              reg.registration.playerLastName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: reg.registration.confirmationNumber })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
              reg.registration.parentFirstName,
              " ",
              reg.registration.parentLastName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: reg.registration.parentEmail })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: reg.registration.ageGroup || "N/A" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: reg.team ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-100 text-blue-700", children: reg.team.name }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-muted-foreground", children: "Unassigned" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-sm", children: reg.season?.name || "N/A" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: getStatusBadge(reg.registration.status, reg.registration.paymentStatus || "pending") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-sm text-muted-foreground whitespace-nowrap", children: formatDate(reg.registration.createdAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => setSelectedRegistration(reg.registration.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }),
            !reg.team && reg.registration.paymentStatus === "paid" && /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "text-xs rounded border px-2 py-1", defaultValue: "", onChange: (e) => {
              if (e.target.value) {
                assignMutation.mutate({
                  registrationId: reg.registration.id,
                  teamId: e.target.value
                });
              }
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Assign..." }),
              teams.filter((t) => t.ageGroup === reg.registration.ageGroup).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t.id, children: t.name }, t.id))
            ] })
          ] }) })
        ] }, reg.registration.id)) })
      ] }) }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-12 text-center text-muted-foreground", children: hasFilters ? "No registrations found matching your filters." : "No registrations found." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selectedRegistration, onOpenChange: () => setSelectedRegistration(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl max-h-[80vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Registration Details" }) }),
      selectedRegistration && /* @__PURE__ */ jsxRuntimeExports.jsx(RegistrationDetailView, { registrationId: selectedRegistration, teams, onClose: () => setSelectedRegistration(null) })
    ] }) })
  ] });
}
function RegistrationDetailView({
  registrationId,
  teams,
  onClose
}) {
  const queryClient = useQueryClient();
  const {
    data,
    isLoading
  } = useQuery(crmQueries.registrationDetails(registrationId));
  const assignMutation = useMutation({
    mutationFn: async ({
      registrationId: registrationId2,
      teamId
    }) => {
      return await assignToTeam({
        data: {
          registrationId: registrationId2,
          teamId
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["crm"]
      });
    }
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  if (!data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "Registration not found" });
  }
  const {
    registration,
    season,
    team
  } = data;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Confirmation #" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-bold", children: registration.confirmationNumber })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: registration.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700", children: registration.paymentStatus === "paid" ? "Paid" : "Pending Payment" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2", children: "Player Information" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
            registration.playerFirstName,
            " ",
            registration.playerLastName
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Date of Birth" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: registration.playerDateOfBirth })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Gender" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium capitalize", children: registration.playerGender })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Age Group" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: registration.ageGroup || "N/A" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2", children: "Team Assignment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        team ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-100 text-blue-700", children: team.name }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "Unassigned" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "text-sm rounded border px-3 py-2", value: team?.id || "", onChange: (e) => {
          assignMutation.mutate({
            registrationId: registration.id,
            teamId: e.target.value || null
          });
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "No Team" }),
          teams.filter((t) => t.ageGroup === registration.ageGroup).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: t.id, children: [
            t.name,
            " (",
            t.ageGroup,
            ")"
          ] }, t.id))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2", children: "Parent/Guardian" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
            registration.parentFirstName,
            " ",
            registration.parentLastName
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: registration.parentEmail })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: registration.parentPhone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
            registration.parentAddress,
            ", ",
            registration.parentCity,
            ", ",
            registration.parentState,
            " ",
            registration.parentZipCode
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2", children: "Emergency Contacts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: registration.emergency1Name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: registration.emergency1Phone })
        ] }),
        registration.emergency2Name && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Secondary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: registration.emergency2Name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: registration.emergency2Phone })
        ] })
      ] })
    ] }),
    (registration.allergies || registration.medicalConditions) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2", children: "Medical Information" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [
        registration.allergies && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Allergies" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: registration.allergies })
        ] }),
        registration.medicalConditions && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Medical Conditions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: registration.medicalConditions })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2", children: "Registration Details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Season" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: season?.name || "N/A" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
            "$",
            registration.amount
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Registered" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: formatDateTime(registration.createdAt) })
        ] }),
        registration.paidAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Paid At" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: formatDateTime(registration.paidAt) })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminRegistrationsPage as component
};
