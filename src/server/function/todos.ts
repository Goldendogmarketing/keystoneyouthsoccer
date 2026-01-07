import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { db } from '~/db/db';
import { todos } from '~/db/schema/todos.schema';
import { getSession } from '~/lib/auth/middleware';
import { eq, and } from 'drizzle-orm';

const todoSchema = z.object({
  text: z.string().min(1, 'Todo text is required'),
});

export const getTodos = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const userTodos = await db
    .select()
    .from(todos)
    .where(eq(todos.userId, session.user.id))
    .orderBy(todos.createdAt);

  return userTodos.map((todo) => ({
    id: todo.id,
    text: todo.text,
    completed: todo.completed,
  }));
});

export const createTodo = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => {
    return todoSchema.parse(data);
  })
  .handler(async ({ data }) => {
    const session = await getSession();
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    const [newTodo] = await db
      .insert(todos)
      .values({
        userId: session.user.id,
        text: data.text,
        completed: false,
      })
      .returning();

    return {
      id: newTodo.id,
      text: newTodo.text,
      completed: newTodo.completed,
    };
  });

export const toggleTodo = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => {
    return z.object({ id: z.string() }).parse(data);
  })
  .handler(async ({ data }) => {
    const session = await getSession();
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    // First check if the todo exists and belongs to the user
    const [existingTodo] = await db
      .select()
      .from(todos)
      .where(and(eq(todos.id, data.id), eq(todos.userId, session.user.id)));

    if (!existingTodo) {
      throw new Error('Todo not found');
    }

    const [updatedTodo] = await db
      .update(todos)
      .set({
        completed: !existingTodo.completed,
        updatedAt: new Date(),
      })
      .where(eq(todos.id, data.id))
      .returning();

    return {
      id: updatedTodo.id,
      text: updatedTodo.text,
      completed: updatedTodo.completed,
    };
  });

export const deleteTodo = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => {
    return z.object({ id: z.string() }).parse(data);
  })
  .handler(async ({ data }) => {
    const session = await getSession();
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    // First check if the todo exists and belongs to the user
    const [existingTodo] = await db
      .select()
      .from(todos)
      .where(and(eq(todos.id, data.id), eq(todos.userId, session.user.id)));

    if (!existingTodo) {
      throw new Error('Todo not found');
    }

    await db.delete(todos).where(eq(todos.id, data.id));

    return { success: true };
  });
