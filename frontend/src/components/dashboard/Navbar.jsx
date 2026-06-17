import { useAuth } from "../../context/AuthContext";

export default function Navbar({ onMenuClick }) {
  const { user } = useAuth();

  // Prefer name, then username, then email — optional chaining handles missing user
  const displayName =
    user?.name ?? user?.username ?? user?.email?.split("@")[0] ?? "User";

  const avatarLetter = displayName?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-surface-raised px-4 sm:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-muted transition hover:bg-surface-hover hover:text-foreground lg:hidden"
          aria-label="Open navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.75"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        <div>
          <p className="text-sm text-muted">Welcome back</p>
          <h1 className="text-base font-semibold text-foreground sm:text-lg">
            {displayName}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-foreground">{displayName}</p>
          <p className="text-xs text-subtle">{user?.email ?? "No email"}</p>
        </div>

        <div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/20 text-sm font-semibold text-brand"
          title={displayName}
        >
          {avatarLetter}
        </div>
      </div>
    </header>
  );
}
