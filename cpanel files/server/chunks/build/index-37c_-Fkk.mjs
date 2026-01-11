import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { az as db, v as and, y as eq, ax as object, ay as string } from "./db-COtzJr4P.mjs";
import { s as seasons } from "./seasons.schema-C1OD7NZb.mjs";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "os";
import "fs";
import "net";
import "tls";
import "perf_hooks";
const getSeasonForRegistration_createServerFn_handler = createServerRpc("f617c6706b8ff2375d4e4dbe588f0a3e7a49cda57c76971602b7b88bb03adb0f", (opts, signal) => getSeasonForRegistration.__executeServer(opts, signal));
const getSeasonForRegistration = createServerFn({
  method: "GET"
}).inputValidator((data) => {
  return object({
    seasonId: string().uuid()
  }).parse(data);
}).handler(getSeasonForRegistration_createServerFn_handler, async ({
  data
}) => {
  const [season] = await db.select().from(seasons).where(eq(seasons.id, data.seasonId)).limit(1);
  if (!season) {
    return {
      error: "Season not found",
      season: null
    };
  }
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const registrationOpen = season.registrationOpenDate <= today;
  const registrationClosed = season.registrationCloseDate < today;
  const isLateRegistration = season.registrationCloseDate < today && season.isActive;
  const lateFeeApplies = isLateRegistration && parseFloat(season.lateFee || "0") > 0;
  return {
    error: null,
    season: {
      id: season.id,
      name: season.name,
      seasonType: season.seasonType,
      year: season.year,
      startDate: season.startDate,
      endDate: season.endDate,
      registrationOpenDate: season.registrationOpenDate,
      registrationCloseDate: season.registrationCloseDate,
      isActive: season.isActive,
      isRegistrationOpen: season.isRegistrationOpen,
      registrationFee: parseFloat(season.registrationFee),
      lateFee: parseFloat(season.lateFee || "0"),
      description: season.description,
      ageGroups: season.ageGroups ? JSON.parse(season.ageGroups) : []
    },
    registrationStatus: {
      isOpen: registrationOpen && !registrationClosed && season.isRegistrationOpen,
      notYetOpen: !registrationOpen,
      isClosed: registrationClosed && !season.isActive,
      isLate: lateFeeApplies,
      totalFee: lateFeeApplies ? parseFloat(season.registrationFee) + parseFloat(season.lateFee || "0") : parseFloat(season.registrationFee)
    }
  };
});
const getSeasons_createServerFn_handler = createServerRpc("344a28258d38487bce4805f36ef657e7ef0a51b88d1c434fc9192f106a05ab75", (opts, signal) => getSeasons.__executeServer(opts, signal));
const getSeasons = createServerFn({
  method: "GET"
}).handler(getSeasons_createServerFn_handler, async () => {
  const allSeasons = await db.select().from(seasons).orderBy(seasons.startDate);
  return {
    seasons: allSeasons.map((season) => ({
      id: season.id,
      name: season.name,
      seasonType: season.seasonType,
      year: season.year,
      startDate: season.startDate,
      endDate: season.endDate,
      registrationOpenDate: season.registrationOpenDate,
      registrationCloseDate: season.registrationCloseDate,
      isActive: season.isActive,
      isRegistrationOpen: season.isRegistrationOpen,
      registrationFee: parseFloat(season.registrationFee),
      lateFee: parseFloat(season.lateFee || "0"),
      description: season.description,
      ageGroups: season.ageGroups ? JSON.parse(season.ageGroups) : []
    }))
  };
});
const getActiveSeasons_createServerFn_handler = createServerRpc("6d4c6e33d681381c313d6711c469d78b175d2f2f433953bb340a44ff34150a82", (opts, signal) => getActiveSeasons.__executeServer(opts, signal));
const getActiveSeasons = createServerFn({
  method: "GET"
}).handler(getActiveSeasons_createServerFn_handler, async () => {
  (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const activeSeasons = await db.select().from(seasons).where(and(eq(seasons.isActive, true), eq(seasons.isRegistrationOpen, true))).orderBy(seasons.startDate);
  return activeSeasons.map((season) => ({
    id: season.id,
    name: season.name,
    seasonType: season.seasonType,
    year: season.year,
    startDate: season.startDate,
    endDate: season.endDate,
    registrationOpenDate: season.registrationOpenDate,
    registrationCloseDate: season.registrationCloseDate,
    registrationFee: parseFloat(season.registrationFee),
    lateFee: parseFloat(season.lateFee || "0"),
    description: season.description,
    ageGroups: season.ageGroups ? JSON.parse(season.ageGroups) : []
  }));
});
export {
  getActiveSeasons_createServerFn_handler,
  getSeasonForRegistration_createServerFn_handler,
  getSeasons_createServerFn_handler
};
