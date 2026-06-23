import { cn } from "../../utils/cn";

export default function Input({
  label,
  error,
  helperText,
  className = "",
  required = false,
  id,
  ...props
}) {
  const inputId = id || props.name;

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-foreground"
        >
          {label}

          {required && (
            <span className="ml-1 text-negative">*</span>
          )}
        </label>
      )}

      <input
        id={inputId}
        className={cn(
          "w-full rounded-lg border border-border bg-surface px-4 py-3",
          "text-sm text-foreground placeholder:text-subtle",
          "transition-all duration-200",
          "outline-none",
          "focus:border-brand focus:ring-2 focus:ring-brand/20",
          "disabled:cursor-not-allowed disabled:opacity-60",
          error && "border-negative focus:ring-negative/20",
          className
        )}
        {...props}
      />

      {error ? (
        <p className="text-sm text-negative">
          {error}
        </p>
      ) : (
        helperText && (
          <p className="text-sm text-subtle">
            {helperText}
          </p>
        )
      )}
    </div>
  );
}
