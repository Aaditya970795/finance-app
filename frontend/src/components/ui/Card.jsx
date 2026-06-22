import { cn } from "../../utils/cn";

const paddingVariants = {
  none: "",
  xs: "p-3",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  className,
  padding = "md",
  hover = false,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-surface-raised border border-border rounded-xl shadow-card transition-all duration-200 ease-in-out",
        paddingVariants[padding],
        hover && "hover:-translate-y-1 hover:shadow-elevated",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}