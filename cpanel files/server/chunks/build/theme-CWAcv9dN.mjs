import { c as createServerRpc, a as createServerFn, g as getCookie, s as setCookie } from "./server.mjs";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
const COOKIE = "vite-ui-theme";
const getTheme_createServerFn_handler = createServerRpc("71c8991fc9c515da010713bdaa6b8c785cb3e21a16557175130babcfd659f0d8", (opts, signal) => getTheme.__executeServer(opts, signal));
const getTheme = createServerFn().handler(getTheme_createServerFn_handler, async () => {
  const raw = getCookie(COOKIE);
  return raw === "light" || raw === "dark" || raw === "system" ? raw : "system";
});
const setTheme_createServerFn_handler = createServerRpc("08e380ba074146180cab5cf970c6269c0fa27aca786f3aa0c9288cb27cccefbf", (opts, signal) => setTheme.__executeServer(opts, signal));
const setTheme = createServerFn({
  method: "POST"
}).inputValidator((data) => {
  if (data !== "light" && data !== "dark" && data !== "system") {
    throw new Error("theme must be light | dark | system");
  }
  return data;
}).handler(setTheme_createServerFn_handler, async ({
  data
}) => {
  setCookie(COOKIE, data, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365
  });
});
export {
  getTheme_createServerFn_handler,
  setTheme_createServerFn_handler
};
