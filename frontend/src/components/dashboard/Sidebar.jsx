import { NavLink } from "react-router-dom";
import { dashboardNavItems } from "../../config/dashboardNav";

/**
 * Sidebar — fixed-width navigation for desktop dashboard views.
 *
 * NavLink automatically adds an "active" class when its `to` path matches
 * the current URL, so we can style the active route without manual logic.
 */
export default function Sidebar({ onNavigate }) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-surface">
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 text-brand">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10.5L12 4l9 6.5V19a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-8.5z"
            />
          </svg>
        </div>
        <span className="text-lg font-semibold text-foreground">FinanceAI</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {dashboardNavItems.map(({ label, path, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                isActive
                  ? "bg-brand/15 text-brand"
                  : "text-muted hover:bg-surface-hover hover:text-foreground",
              ].join(" ")
            }
          >
            <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <p className="text-xs text-subtle">Finance Tracker v1.0</p>
      </div>
    </aside>
  );
}
