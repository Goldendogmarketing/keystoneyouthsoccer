import { t as teams } from "./teams.schema-COiQqDMX.mjs";
import { s as seasons } from "./seasons.schema-C1OD7NZb.mjs";
import { aE as pgTable, aF as timestamp, aG as text, aH as integer, aI as uuid, aJ as boolean } from "./db-COtzJr4P.mjs";
const games = pgTable("games", {
  id: uuid("id").primaryKey().defaultRandom(),
  seasonId: uuid("season_id").references(() => seasons.id, { onDelete: "cascade" }).notNull(),
  homeTeamId: uuid("home_team_id").references(() => teams.id),
  awayTeamId: uuid("away_team_id").references(() => teams.id),
  scheduledAt: timestamp("scheduled_at").notNull(),
  location: text("location").notNull(),
  field: text("field"),
  type: text("type", { enum: ["regular", "playoff", "tournament"] }).default("regular"),
  status: text("status", { enum: ["scheduled", "in_progress", "completed", "cancelled"] }).default(
    "scheduled"
  ),
  homeScore: integer("home_score"),
  awayScore: integer("away_score"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
pgTable("practices", {
  id: uuid("id").primaryKey().defaultRandom(),
  teamId: uuid("team_id").references(() => teams.id, { onDelete: "cascade" }).notNull(),
  scheduledAt: timestamp("scheduled_at").notNull(),
  location: text("location").notNull(),
  field: text("field"),
  duration: integer("duration"),
  // minutes
  notes: text("notes"),
  isCancelled: boolean("is_cancelled").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
const schedules = pgTable("schedules", {
  id: uuid("id").primaryKey().defaultRandom(),
  teamId: uuid("team_id").references(() => teams.id, { onDelete: "cascade" }).notNull(),
  gameDate: text("game_date").notNull(),
  location: text("location").notNull(),
  opponent: text("opponent"),
  type: text("type", { enum: ["game", "practice", "event"] }).default("game"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
export {
  games as g,
  schedules as s
};
