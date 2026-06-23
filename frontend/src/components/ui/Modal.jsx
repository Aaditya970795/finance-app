import { useEffect } from "react";
import { X } from "lucide-react";

import { cn } from "../../utils/cn";

const sizes = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
}) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "w-full rounded-xl border border-border bg-surface-raised shadow-2xl",
          "animate-in fade-in zoom-in-95 duration-200",
          sizes[size]
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2
            id="modal-title"
            className="text-lg font-semibold text-foreground"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 transition hover:bg-surface"
          >
            <X
              size={18}
              className="text-muted"
            />
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}