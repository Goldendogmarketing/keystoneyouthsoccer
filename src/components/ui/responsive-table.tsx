import { cn } from '~/lib/utils';

interface ResponsiveTableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ResponsiveTable({ children, className, ...props }: ResponsiveTableProps) {
  return (
    <div className={cn('w-full overflow-x-auto', className)} {...props}>
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
