import { useEffect, useState } from "react";
import { showErrorToast } from "../../utils/showErrorToast";
import {
  getDashboardSummary,
  getCategoryBreakdown,
  getMonthlyOverview,
  getBudgetVsExpenses,
} from "../../services/dashboardService";

import StatCards from "../../components/dashboard/StatCards";
import BudgetProgress from "../../components/dashboard/BudgetProgress";
import CategoryChart from "../../components/dashboard/CategoryChart";
import MonthlyChart from "../../components/dashboard/MonthlyChart";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import {
  Loader,
  ErrorState,
} from "../../components/ui";

export default function DashboardHome() {
  const [summary, setSummary] = useState(null);
  const [categories, setCategories] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const [
        summaryRes,
        categoryRes,
        monthlyRes,
        budgetRes,
      ] = await Promise.all([
        getDashboardSummary(),
        getCategoryBreakdown(),
        getMonthlyOverview(),
        getBudgetVsExpenses(),
      ]);

      setSummary(summaryRes.summary ?? null);
      setCategories(categoryRes.data ?? []);
      setMonthly(monthlyRes.data ?? []);
      setBudgets(budgetRes.data ?? []);

      setError("");
    } catch (error) {
      setError("Failed to load dashboard");
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader variant="dashboard" />;
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to load dashboard"
        description={error}
        onRetry={fetchDashboard}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Dashboard
        </h1>

        <p className="mt-1 text-muted">
          Get a complete overview of your financial health.
        </p>
      </div>

      <StatCards summary={summary} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BudgetProgress budgets={budgets} />
        <CategoryChart data={categories} />
      </div>

      <MonthlyChart data={monthly} />

      <RecentTransactions
        transactions={summary?.recentTransactions ?? []}
      />
    </div>
  );
}
