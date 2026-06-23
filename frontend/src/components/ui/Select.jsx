import { cn } from "../../utils/cn";

export default function Select({
  label,
  error,
  helperText,
  className,
  children,
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}

      <select
        {...props}
        className={cn(
          "w-full rounded-lg border border-border bg-surface px-4 py-3",
          "text-sm text-foreground",
          "transition-all duration-200",
          "focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-negative focus:ring-negative/20",
          className
        )}
      >
        {children}
      </select>

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