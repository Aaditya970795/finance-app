import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

/**
 * DashboardLayout — shell for all authenticated dashboard pages.
 *
 * Outlet is a React Router placeholder: nested child routes defined in App.jsx
 * render inside this slot, so Sidebar/Navbar persist while page content swaps.
 */
export default function DashboardLayout() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar — fixed width, always visible on lg+ */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={closeMobileNav}
            aria-label="Close navigation menu"
          />
          <div className="relative z-50 h-full w-64">
            <Sidebar onNavigate={closeMobileNav} />
          </div>
        </div>
      )}

      {/* Main column: navbar + page content */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Navbar onMenuClick={() => setIsMobileNavOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
