import { a as createServerFn, T as TSS_SERVER_FUNCTION, b as getServerFnById } from "./server.mjs";
const createSsrRpc = (functionId, importer) => {
  const url = "/_serverFn/" + functionId;
  const fn = async (...args) => {
    const serverFn = await getServerFnById(functionId);
    return serverFn(...args);
  };
  return Object.assign(fn, {
    url,
    functionId,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getSession = createServerFn({
  method: "GET"
}).handler(createSsrRpc("78f5a39b3995a5bee8a8eb12e78514c7cab69c4fe9ef6efb177ad20d519b03c4"));
createServerFn({
  method: "GET"
}).handler(createSsrRpc("93b2b71caed13079ca13b46a4ea553c47a8869eeca5e7201747bb296024d901b"));
const requireAdmin = createServerFn({
  method: "GET"
}).handler(createSsrRpc("87f176fe2711d839002d75cf600ac6cd023b67449eade637f3501d7e009b4d77"));
createServerFn({
  method: "GET"
}).handler(createSsrRpc("f44cac34c230b821a887657ad364a1cf4ef4b8b07a9bc9fbd2c13871c2617b4a"));
export {
  createSsrRpc as c,
  getSession as g,
  requireAdmin as r
};
