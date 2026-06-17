import { useEffect, useState } from "react";
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

export default function DashboardHome() {
  const [summary, setSummary] = useState(null);
  const [categories, setCategories] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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

        setSummary(summaryRes.data.summary);
        setCategories(categoryRes.data.categoryBreakdown);
        setMonthly(monthlyRes.data.data);
        setBudgets(budgetRes.data.data);

      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="p-6 space-y-6">
      <StatCards summary={summary} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BudgetProgress budgets={budgets} />
        <CategoryChart data={categories} />
      </div>

      <MonthlyChart data={monthly} />

      <RecentTransactions transactions={summary.recentTransactions} />
    </div>
  );
}
