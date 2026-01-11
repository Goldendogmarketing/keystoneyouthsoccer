import { q as queryOptions } from "./router-gg-f3raf.mjs";
import { c as createSsrRpc } from "./middleware-BXaiHw3P.mjs";
import { a as createServerFn } from "./server.mjs";
import { ax as object, ay as string, aA as boolean$1 } from "./db-COtzJr4P.mjs";
const getLeagues = createServerFn({
  method: "GET"
}).handler(createSsrRpc("dce4e780b2d1b0961e60e11de28fa3be666e03cba86c73885e404864978c6fd4"));
const getTeamsBySeasonSchema = object({
  seasonId: string().uuid()
});
const getTeamsBySeason = createServerFn({
  method: "GET"
}).inputValidator((data) => getTeamsBySeasonSchema.parse(data)).handler(createSsrRpc("885d1d22f9753ba40273a8a260f178e9393a031e8108d13d72ab33b84a546f26"));
const createLeagueSchema = object({
  name: string().min(1),
  startDate: string(),
  endDate: string(),
  registrationOpenDate: string(),
  registrationCloseDate: string(),
  registrationFee: string(),
  description: string().optional(),
  ageGroups: string().optional()
  // JSON string
});
const createLeague = createServerFn({
  method: "POST"
}).inputValidator((data) => createLeagueSchema.parse(data)).handler(createSsrRpc("cb444d590d3990c578021458c43590a68fcd6c064c672043dd06185c179c7d75"));
const updateLeagueSchema = object({
  id: string().uuid(),
  name: string().min(1).optional(),
  startDate: string().optional(),
  endDate: string().optional(),
  registrationOpenDate: string().optional(),
  registrationCloseDate: string().optional(),
  registrationFee: string().optional(),
  description: string().optional(),
  ageGroups: string().optional(),
  isActive: boolean$1().optional()
});
const updateLeague = createServerFn({
  method: "POST"
}).inputValidator((data) => updateLeagueSchema.parse(data)).handler(createSsrRpc("82ea961d57259ddbe5da0963ed04149971fbb45d20e4c8691e86939ce098557a"));
const deleteLeagueSchema = object({
  id: string().uuid()
});
const deleteLeague = createServerFn({
  method: "POST"
}).inputValidator((data) => deleteLeagueSchema.parse(data)).handler(createSsrRpc("9ac42f0414f55b5dada3cf4ba118347a9f813b4c488fdb9cc40276ffeb9f334d"));
const toggleLeagueActiveSchema = object({
  id: string().uuid()
});
const toggleLeagueActive = createServerFn({
  method: "POST"
}).inputValidator((data) => toggleLeagueActiveSchema.parse(data)).handler(createSsrRpc("f636f6348e5bd43fef037bce6bd1a42fe45c226286a1bf703838361283ca22f8"));
const createTeamSchema = object({
  name: string().min(1),
  seasonId: string().uuid(),
  ageGroup: string().min(1),
  description: string().optional()
});
createServerFn({
  method: "POST"
}).inputValidator((data) => createTeamSchema.parse(data)).handler(createSsrRpc("6ba3fac31ffa5df97b34ab4285fdb89d088156882590f8e0ab52ebe0f7e4adc1"));
const leaguesQueries = {
  all: () => queryOptions({
    queryKey: ["leagues"],
    queryFn: async ({ signal }) => await getLeagues({ signal }),
    staleTime: 1e3 * 60
    // 1 minute
  }),
  teams: (seasonId) => queryOptions({
    queryKey: ["leagues", "teams", seasonId],
    queryFn: async ({ signal }) => await getTeamsBySeason({ data: { seasonId }, signal }),
    staleTime: 1e3 * 60,
    // 1 minute
    enabled: !!seasonId
  })
};
export {
  createLeague as c,
  deleteLeague as d,
  leaguesQueries as l,
  toggleLeagueActive as t,
  updateLeague as u
};
