import { createFileRoute } from '@tanstack/react-router';
import { TodoList } from '~/components/dashboard/TodoList';

export const Route = createFileRoute('/(dashboard)/dashboard/todos')({
  component: TodosPage,
});

function TodosPage() {
  return <TodoList />;
}
