import { AlertTriangle } from "lucide-react";

import Button from "./Button";

export default function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface-raised px-6 py-14 text-center">
      <div className="mb-4 rounded-full bg-surface p-4">
        <AlertTriangle
          size={40}
          className="text-negative"
        />
      </div>

      <h3 className="text-lg font-semibold text-foreground">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm text-muted">
        {description}
      </p>

      {onRetry && (
        <div className="mt-6">
          <Button onClick={onRetry}>
            Retry
          </Button>
        </div>
      )}
    </div>
  );
}