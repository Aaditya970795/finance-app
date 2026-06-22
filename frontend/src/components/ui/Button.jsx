import { cn } from "../../utils/cn";
import Spinner from "./Spinner";

const variants = {
    primary:
    "bg-brand text-background shadow-glow hover:bg-brand-hover",

  secondary:
    "bg-surface border border-border text-foreground hover:bg-muted",

  danger:
    "bg-negative text-white hover:opacity-90 focus:ring-2 focus:ring-negative/30",

  outline:
    "border border-border bg-transparent text-foreground hover:bg-muted",
  
    ghost:
    "bg-transparent text-muted hover:bg-surface-hover",
};

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  className,
  type = "button",
  onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
        "focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
    >
      {loading ? (
        <>
            <Spinner
            size="sm"
            className="mr-2 text-current"
            />
            Loading...
        </>
        ) : (
        children
    )}
    </button>
  );
}