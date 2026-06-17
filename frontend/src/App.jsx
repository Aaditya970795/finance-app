import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import DashboardHome from "./pages/dashboard/DashboardHome";
import TransactionsPage from "./pages/dashboard/TransactionsPage";
import BudgetsPage from "./pages/dashboard/BudgetsPage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public auth routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*
          Protected dashboard shell:
          ProtectedRoute → DashboardLayout → nested page routes

          Child routes render inside DashboardLayout's <Outlet />.
        */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="budgets" element={<BudgetsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
