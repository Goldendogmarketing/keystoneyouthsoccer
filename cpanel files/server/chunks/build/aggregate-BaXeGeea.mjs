import { aa as sql } from "./db-COtzJr4P.mjs";
function count(expression) {
  return sql`count(${sql.raw("*")})`.mapWith(Number);
}
export {
  count as c
};
