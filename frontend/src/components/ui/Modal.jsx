import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
}) {
  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        className={`w-full ${sizes[size]} rounded-xl border border-border bg-surface-raised shadow-2xl`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-md p-2 transition hover:bg-surface"
          >
            <X
              size={18}
              className="text-muted"
            />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}