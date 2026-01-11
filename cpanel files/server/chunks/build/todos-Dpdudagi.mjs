import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { aE as pgTable, aF as timestamp, aJ as boolean, aG as text, aI as uuid, ax as object, az as db, v as and, y as eq, ay as string } from "./db-COtzJr4P.mjs";
import { users } from "./users.schema-CUS3FIEB.mjs";
import { g as getSession } from "./middleware-BXaiHw3P.mjs";
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
const todos = pgTable("todos", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  text: text("text").notNull(),
  completed: boolean("completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
const todoSchema = object({
  text: string().min(1, "Todo text is required")
});
const getTodos_createServerFn_handler = createServerRpc("bc20a2cf2cb0368108a542f40aa9f0f7d5e177afb2f31e84b43694c0d8ec407a", (opts, signal) => getTodos.__executeServer(opts, signal));
const getTodos = createServerFn({
  method: "GET"
}).handler(getTodos_createServerFn_handler, async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const userTodos = await db.select().from(todos).where(eq(todos.userId, session.user.id)).orderBy(todos.createdAt);
  return userTodos.map((todo) => ({
    id: todo.id,
    text: todo.text,
    completed: todo.completed
  }));
});
const createTodo_createServerFn_handler = createServerRpc("c4f25bb0259b22ffe95c7812c3319346a76dff6aa525798d85e90ac647d66a38", (opts, signal) => createTodo.__executeServer(opts, signal));
const createTodo = createServerFn({
  method: "POST"
}).inputValidator((data) => {
  return todoSchema.parse(data);
}).handler(createTodo_createServerFn_handler, async ({
  data
}) => {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const [newTodo] = await db.insert(todos).values({
    userId: session.user.id,
    text: data.text,
    completed: false
  }).returning();
  return {
    id: newTodo.id,
    text: newTodo.text,
    completed: newTodo.completed
  };
});
const toggleTodo_createServerFn_handler = createServerRpc("4b1659a76ddc3e19af6b81c4e37e9b2ca51102970c8f67d3f3d2298622b731b9", (opts, signal) => toggleTodo.__executeServer(opts, signal));
const toggleTodo = createServerFn({
  method: "POST"
}).inputValidator((data) => {
  return object({
    id: string()
  }).parse(data);
}).handler(toggleTodo_createServerFn_handler, async ({
  data
}) => {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const [existingTodo] = await db.select().from(todos).where(and(eq(todos.id, data.id), eq(todos.userId, session.user.id)));
  if (!existingTodo) {
    throw new Error("Todo not found");
  }
  const [updatedTodo] = await db.update(todos).set({
    completed: !existingTodo.completed,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(todos.id, data.id)).returning();
  return {
    id: updatedTodo.id,
    text: updatedTodo.text,
    completed: updatedTodo.completed
  };
});
const deleteTodo_createServerFn_handler = createServerRpc("fd49fb3a6d8ea22bc996b1bd1f256806ee0b02710df99c2b6ecf0f7fcb49b8e6", (opts, signal) => deleteTodo.__executeServer(opts, signal));
const deleteTodo = createServerFn({
  method: "POST"
}).inputValidator((data) => {
  return object({
    id: string()
  }).parse(data);
}).handler(deleteTodo_createServerFn_handler, async ({
  data
}) => {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const [existingTodo] = await db.select().from(todos).where(and(eq(todos.id, data.id), eq(todos.userId, session.user.id)));
  if (!existingTodo) {
    throw new Error("Todo not found");
  }
  await db.delete(todos).where(eq(todos.id, data.id));
  return {
    success: true
  };
});
export {
  createTodo_createServerFn_handler,
  deleteTodo_createServerFn_handler,
  getTodos_createServerFn_handler,
  toggleTodo_createServerFn_handler
};
