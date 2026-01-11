import { c as createSsrRpc } from "./middleware-BXaiHw3P.mjs";
import { a as createServerFn } from "./server.mjs";
const getAllTeams = createServerFn({
  method: "GET"
}).handler(createSsrRpc("8fbb7096f990d5418855f64a3d9d7c96343bcd980ce4927b67042572606f64de"));
export {
  getAllTeams as g
};
