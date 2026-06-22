import { useEffect, useState } from "react";

import { getBudgetVsExpenses } from "../../services/dashboardService";

import {
  getMonthlyTrend,
  getIncomeExpenseTrend,
  getFilteredCategoryBreakdown,
  getInsights,
} from "../../services/analyticsService";

import ExpenseTrendChart from "../../components/analytics/ExpenseTrendChart";
import IncomeExpenseChart from "../../components/analytics/IncomeExpenseChart";
import CategoryPieChart from "../../components/analytics/CategoryPieChart";
import BudgetUtilizationCards from "../../components/analytics/BudgetUtilizationCards";
import AIInsights from "../../components/analytics/AIInsights";
import Loader from "../../components/ui/Loader";

export default function AnalyticsPage() {
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [incomeExpense, setIncomeExpense] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budgetUtilization, setBudgetUtilization] = useState([]);
  const [insights, setInsights] = useState(null);

  const [range, setRange] = useState("12m");
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const [
        monthlyRes,
        incomeExpenseRes,
        categoryRes,
        budgetRes,
        insightsRes,
      ] = await Promise.all([
        getMonthlyTrend(range),
        getIncomeExpenseTrend(range),
        getFilteredCategoryBreakdown(range),
        getBudgetVsExpenses(),
        getInsights(range),
      ]);

      setMonthlyTrend(monthlyRes.data || []);
      setIncomeExpense(incomeExpenseRes.data || []);
      setCategories(categoryRes.data || []);
      setBudgetUtilization(budgetRes.data || []);
      setInsights(insightsRes.data || null);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [range]);

  if (loading) {
    return <Loader variant="analytics" />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Analytics
          </h1>

          <p className="mt-1 text-muted">
            Understand your financial patterns with interactive charts and AI insights.
          </p>
        </div>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="rounded-lg border border-border bg-surface-raised px-4 py-2 text-sm text-foreground outline-none transition focus:border-brand"
        >
          <option value="3m">Last 3 Months</option>
          <option value="6m">Last 6 Months</option>
          <option value="12m">Last 12 Months</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* Charts */}
      <ExpenseTrendChart data={monthlyTrend} />

      <IncomeExpenseChart data={incomeExpense} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <CategoryPieChart data={categories} />

        <BudgetUtilizationCards
          data={budgetUtilization}
        />
      </div>

      {/* AI Insights */}
      <AIInsights insights={insights} />
    </div>
  );
}