import { cn } from "../../utils/cn";

export default function Textarea({
  label,
  error,
  helperText,
  className,
  rows = 4,
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}

      <textarea
        rows={rows}
        {...props}
        className={cn(
          "w-full rounded-lg border border-border bg-surface px-4 py-3",
          "text-sm text-foreground placeholder:text-subtle",
          "transition-all duration-200",
          "focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-negative focus:ring-negative/20",
          className
        )}
      />

      {helperText && !error && (
        <p className="text-xs text-muted">
          {helperText}
        </p>
      )}

      {error && (
        <p className="text-xs text-negative">
          {error}
        </p>
      )}
    </div>
  );
}