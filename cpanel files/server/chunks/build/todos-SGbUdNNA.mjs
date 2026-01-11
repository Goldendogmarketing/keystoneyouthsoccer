import { j as jsxRuntimeExports, r as reactExports, a as createServerFn } from "./server.mjs";
import { u as useQuery } from "./useQuery-Dr19c9_1.mjs";
import { c as createLucideIcon, u as useQueryClient, A as toast, q as queryOptions } from "./router-gg-f3raf.mjs";
import { u as useMutation } from "./useMutation-CJftFGr9.mjs";
import { c as createSsrRpc } from "./middleware-BXaiHw3P.mjs";
import { ax as object, ay as string } from "./db-COtzJr4P.mjs";
import { C as Card, b as CardHeader, d as CardTitle, a as CardContent } from "./card-ClXHriap.mjs";
import { B as Button } from "./button-DAUfPp-T.mjs";
import { I as Input } from "./input-D8ww6-y3.mjs";
import { c as cn } from "./utils-D4_p2_-I.mjs";
import { P as Plus } from "./plus-DU_Oax2u.mjs";
import { T as Trash2 } from "./trash-2-Dggu8vyh.mjs";
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
import "./index-DzSr385F.mjs";
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$1);
const __iconNode = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode);
const todoSchema = object({
  text: string().min(1, "Todo text is required")
});
const getTodos = createServerFn({
  method: "GET"
}).handler(createSsrRpc("bc20a2cf2cb0368108a542f40aa9f0f7d5e177afb2f31e84b43694c0d8ec407a"));
const createTodo = createServerFn({
  method: "POST"
}).inputValidator((data) => {
  return todoSchema.parse(data);
}).handler(createSsrRpc("c4f25bb0259b22ffe95c7812c3319346a76dff6aa525798d85e90ac647d66a38"));
const toggleTodo = createServerFn({
  method: "POST"
}).inputValidator((data) => {
  return object({
    id: string()
  }).parse(data);
}).handler(createSsrRpc("4b1659a76ddc3e19af6b81c4e37e9b2ca51102970c8f67d3f3d2298622b731b9"));
const deleteTodo = createServerFn({
  method: "POST"
}).inputValidator((data) => {
  return object({
    id: string()
  }).parse(data);
}).handler(createSsrRpc("fd49fb3a6d8ea22bc996b1bd1f256806ee0b02710df99c2b6ecf0f7fcb49b8e6"));
const todosQueries = {
  list: () => queryOptions({
    queryKey: ["todos"],
    queryFn: async ({ signal }) => await getTodos({ signal }),
    staleTime: 1e3 * 60 * 5
  })
};
function useCreateTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (text) => await createTodo({ data: { text } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueries.list().queryKey });
      toast.success("Todo created successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create todo");
    }
  });
}
function useToggleTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => await toggleTodo({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueries.list().queryKey });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to toggle todo");
    }
  });
}
function useDeleteTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => await deleteTodo({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueries.list().queryKey });
      toast.success("Todo deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete todo");
    }
  });
}
function TodoList() {
  const [newTodoText, setNewTodoText] = reactExports.useState("");
  const { data: todos = [], isLoading } = useQuery(todosQueries.list());
  const createTodo2 = useCreateTodoMutation();
  const toggleTodo2 = useToggleTodoMutation();
  const deleteTodo2 = useDeleteTodoMutation();
  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      await createTodo2.mutateAsync(newTodoText.trim());
      setNewTodoText("");
    }
  };
  const handleToggle = async (id) => {
    await toggleTodo2.mutateAsync(id);
  };
  const handleDelete = async (id) => {
    await deleteTodo2.mutateAsync(id);
  };
  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "To-Do List" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Keep track of your tasks and stay organized." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Add New Task" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreateTodo, className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "text",
            placeholder: "Enter a new task...",
            value: newTodoText,
            onChange: (e) => setNewTodoText(e.target.value),
            className: "flex-1",
            disabled: createTodo2.isPending
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: createTodo2.isPending || !newTodoText.trim(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          "Add"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Tasks" }),
        totalCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          completedCount,
          " of ",
          totalCount,
          " completed"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center text-muted-foreground", children: "Loading tasks..." }) : todos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "mx-auto mb-2 h-12 w-12 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No tasks yet. Add one above to get started!" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: todos.map((todo) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        TodoItem,
        {
          todo,
          onToggle: () => handleToggle(todo.id),
          onDelete: () => handleDelete(todo.id),
          isToggling: toggleTodo2.isPending,
          isDeleting: deleteTodo2.isPending
        },
        todo.id
      )) }) })
    ] })
  ] });
}
function TodoItem({
  todo,
  onToggle,
  onDelete,
  isToggling,
  isDeleting
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex items-center gap-3 rounded-lg border p-3 transition-all hover:bg-muted/50",
        todo.completed && "opacity-60"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onToggle,
            disabled: isToggling,
            className: "flex-shrink-0",
            "aria-label": todo.completed ? "Mark as incomplete" : "Mark as complete",
            children: todo.completed ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-5 w-5 text-muted-foreground" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "flex-1 text-sm",
              todo.completed && "line-through text-muted-foreground"
            ),
            children: todo.text
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            onClick: onDelete,
            disabled: isDeleting,
            className: "h-8 w-8 text-muted-foreground hover:text-destructive",
            "aria-label": "Delete task",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
          }
        )
      ]
    }
  );
}
function TodosPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TodoList, {});
}
export {
  TodosPage as component
};
