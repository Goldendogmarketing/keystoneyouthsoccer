import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { todosQueries, useCreateTodoMutation, useToggleTodoMutation, useDeleteTodoMutation, type Todo } from '~/lib/todos/queries';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '~/lib/utils';

export function TodoList() {
  const [newTodoText, setNewTodoText] = useState('');
  const { data: todos = [], isLoading } = useQuery(todosQueries.list());
  const createTodo = useCreateTodoMutation();
  const toggleTodo = useToggleTodoMutation();
  const deleteTodo = useDeleteTodoMutation();

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      await createTodo.mutateAsync(newTodoText.trim());
      setNewTodoText('');
    }
  };

  const handleToggle = async (id: string) => {
    await toggleTodo.mutateAsync(id);
  };

  const handleDelete = async (id: string) => {
    await deleteTodo.mutateAsync(id);
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">To-Do List</h1>
        <p className="text-muted-foreground">Keep track of your tasks and stay organized.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateTodo} className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter a new task..."
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              className="flex-1"
              disabled={createTodo.isPending}
            />
            <Button type="submit" disabled={createTodo.isPending || !newTodoText.trim()}>
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Tasks</CardTitle>
            {totalCount > 0 && (
              <span className="text-sm text-muted-foreground">
                {completedCount} of {totalCount} completed
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground">Loading tasks...</div>
          ) : todos.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <Circle className="mx-auto mb-2 h-12 w-12 opacity-50" />
              <p>No tasks yet. Add one above to get started!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={() => handleToggle(todo.id)}
                  onDelete={() => handleDelete(todo.id)}
                  isToggling={toggleTodo.isPending}
                  isDeleting={deleteTodo.isPending}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function TodoItem({
  todo,
  onToggle,
  onDelete,
  isToggling,
  isDeleting,
}: {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  isToggling: boolean;
  isDeleting: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border p-3 transition-all hover:bg-muted/50',
        todo.completed && 'opacity-60',
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        disabled={isToggling}
        className="flex-shrink-0"
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed ? (
          <CheckCircle2 className="h-5 w-5 text-green-600" />
        ) : (
          <Circle className="h-5 w-5 text-muted-foreground" />
        )}
      </button>
      <span
        className={cn(
          'flex-1 text-sm',
          todo.completed && 'line-through text-muted-foreground',
        )}
      >
        {todo.text}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onDelete}
        disabled={isDeleting}
        className="h-8 w-8 text-muted-foreground hover:text-destructive"
        aria-label="Delete task"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

