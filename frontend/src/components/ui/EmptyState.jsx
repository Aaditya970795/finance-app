import { Inbox } from "lucide-react";

export default function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  action = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface-raised px-6 py-14 text-center">
      <div className="mb-4 rounded-full bg-surface p-4">
        <Icon
          size={40}
          className="text-muted"
        />
      </div>

      <h3 className="text-lg font-semibold text-foreground">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-sm text-sm text-muted">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}