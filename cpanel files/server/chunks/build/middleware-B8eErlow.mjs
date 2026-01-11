import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { a as auth } from "./auth-DnREO_GR.mjs";
import { ad as BaseName, e as Column, C as ColumnAliasProxyHandler, d as ColumnBuilder, ae as Columns, j as ConsoleLogWriter, k as DefaultLogger, D as DrizzleError, g as DrizzleQueryError, af as ExtraConfigBuilder, ag as ExtraConfigColumns, ah as IsAlias, M as Many, $ as Name, N as NoopLogger, O as One, ai as OriginalName, a0 as Param, a1 as Placeholder, Q as QueryPromise, R as Relation, l as Relations, a2 as SQL, aj as Schema, a3 as StringChunk, ab as Subquery, ak as Table, T as TableAliasProxyHandler, h as TransactionRollbackError, a4 as View, aw as ViewBaseConfig, ac as WithSubquery, a as aliasedTable, b as aliasedTableColumn, v as and, an as applyMixins, Z as asc, w as between, x as bindIfParam, n as createMany, o as createOne, p as createTableRelationsHelpers, _ as desc, f as entityKind, y as eq, z as exists, q as extractTablesRelationalConfig, a5 as fillPlaceholders, ao as getColumnNameAndConfig, r as getOperators, s as getOrderByOperators, ap as getTableColumns, aq as getTableLikeName, al as getTableName, am as getTableUniqueName, A as gt, B as gte, ar as haveSameKeys, E as ilike, F as inArray, i as is, as as isConfig, a6 as isDriverValueEncoder, G as isNotNull, H as isNull, a7 as isSQLWrapper, I as like, J as lt, K as lte, m as mapColumnsInAliasedSQLToAlias, c as mapColumnsInSQLToAlias, t as mapRelationalRow, at as mapResultRow, au as mapUpdateSet, L as ne, a8 as noopDecoder, a9 as noopEncoder, u as normalizeRelation, P as not, S as notBetween, U as notExists, V as notIlike, W as notInArray, X as notLike, Y as or, av as orderSelectedFields, aa as sql } from "./db-COtzJr4P.mjs";
import { c as count } from "./aggregate-BaXeGeea.mjs";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./users.schema-CUS3FIEB.mjs";
import "os";
import "fs";
import "net";
import "tls";
import "perf_hooks";
const getSession_createServerFn_handler = createServerRpc("78f5a39b3995a5bee8a8eb12e78514c7cab69c4fe9ef6efb177ad20d519b03c4", (opts, signal) => getSession.__executeServer(opts, signal));
const getSession = createServerFn({
  method: "GET"
}).handler(getSession_createServerFn_handler, async (ctx) => {
  const session = await auth.api.getSession({
    headers: ctx.request.headers
  });
  return session;
});
const requireAuth_createServerFn_handler = createServerRpc("93b2b71caed13079ca13b46a4ea553c47a8869eeca5e7201747bb296024d901b", (opts, signal) => requireAuth.__executeServer(opts, signal));
const requireAuth = createServerFn({
  method: "GET"
}).handler(requireAuth_createServerFn_handler, async (ctx) => {
  const session = await auth.api.getSession({
    headers: ctx.request.headers
  });
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
});
const requireAdmin_createServerFn_handler = createServerRpc("87f176fe2711d839002d75cf600ac6cd023b67449eade637f3501d7e009b4d77", (opts, signal) => requireAdmin.__executeServer(opts, signal));
const requireAdmin = createServerFn({
  method: "GET"
}).handler(requireAdmin_createServerFn_handler, async (ctx) => {
  const session = await auth.api.getSession({
    headers: ctx.request.headers
  });
  if (!session || session.user.role !== "admin") {
    throw new Error("Forbidden: Admin access required");
  }
  return session;
});
const requireMasterAdmin_createServerFn_handler = createServerRpc("f44cac34c230b821a887657ad364a1cf4ef4b8b07a9bc9fbd2c13871c2617b4a", (opts, signal) => requireMasterAdmin.__executeServer(opts, signal));
const requireMasterAdmin = createServerFn({
  method: "GET"
}).handler(requireMasterAdmin_createServerFn_handler, async (ctx) => {
  const session = await auth.api.getSession({
    headers: ctx.request.headers
  });
  if (!session || session.user.role !== "admin") {
    throw new Error("Forbidden: Admin access required");
  }
  const {
    db
  } = await import("./db-COtzJr4P.mjs").then((n) => n.hQ);
  const {
    users
  } = await import("./users.schema-CUS3FIEB.mjs");
  const {
    eq: eq2
  } = await Promise.resolve().then(function() {
    return indexTNmPKdKE;
  });
  const [user] = await db.select().from(users).where(eq2(users.id, session.user.id)).limit(1);
  if (!user?.isMasterAdmin) {
    throw new Error("Forbidden: Master admin access required");
  }
  return {
    ...session,
    isMasterAdmin: true
  };
});
const indexTNmPKdKE = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BaseName,
  Column,
  ColumnAliasProxyHandler,
  ColumnBuilder,
  Columns,
  ConsoleLogWriter,
  DefaultLogger,
  DrizzleError,
  DrizzleQueryError,
  ExtraConfigBuilder,
  ExtraConfigColumns,
  IsAlias,
  Many,
  Name,
  NoopLogger,
  One,
  OriginalName,
  Param,
  Placeholder,
  QueryPromise,
  Relation,
  Relations,
  get SQL() {
    return SQL;
  },
  Schema,
  StringChunk,
  Subquery,
  Table,
  TableAliasProxyHandler,
  TransactionRollbackError,
  View,
  ViewBaseConfig,
  WithSubquery,
  aliasedTable,
  aliasedTableColumn,
  and,
  applyMixins,
  asc,
  between,
  bindIfParam,
  count,
  createMany,
  createOne,
  createTableRelationsHelpers,
  desc,
  entityKind,
  eq,
  exists,
  extractTablesRelationalConfig,
  fillPlaceholders,
  getColumnNameAndConfig,
  getOperators,
  getOrderByOperators,
  getTableColumns,
  getTableLikeName,
  getTableName,
  getTableUniqueName,
  gt,
  gte,
  haveSameKeys,
  ilike,
  inArray,
  is,
  isConfig,
  isDriverValueEncoder,
  isNotNull,
  isNull,
  isSQLWrapper,
  like,
  lt,
  lte,
  mapColumnsInAliasedSQLToAlias,
  mapColumnsInSQLToAlias,
  mapRelationalRow,
  mapResultRow,
  mapUpdateSet,
  ne,
  noopDecoder,
  noopEncoder,
  normalizeRelation,
  not,
  notBetween,
  notExists,
  notIlike,
  notInArray,
  notLike,
  or,
  orderSelectedFields,
  get sql() {
    return sql;
  }
});
export {
  getSession_createServerFn_handler,
  requireAdmin_createServerFn_handler,
  requireAuth_createServerFn_handler,
  requireMasterAdmin_createServerFn_handler
};
