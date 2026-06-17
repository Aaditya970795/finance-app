import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute — gate for authenticated-only sections.
 *
 * Uses Outlet so nested routes (DashboardLayout + child pages) can render
 * when the user is logged in, instead of wrapping a single child element.
 */
export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
