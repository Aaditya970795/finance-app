import { useEffect, useState } from "react";

import { getBudgetVsExpenses } from "../../services/dashboardService";

import {
  getMonthlyTrend,
  getIncomeExpenseTrend,
  getFilteredCategoryBreakdown
} from "../../services/analyticsService";


import ExpenseTrendChart from "../../components/analytics/ExpenseTrendChart";
import IncomeExpenseChart from "../../components/analytics/IncomeExpenseChart";
import CategoryPieChart from "../../components/analytics/CategoryPieChart";
import BudgetUtilizationCards from "../../components/analytics/BudgetUtilizationCards";

export default function AnalyticsPage() {
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [incomeExpense, setIncomeExpense] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budgetUtilization, setBudgetUtilization] = useState([]);
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
      ] = await Promise.all([
        getMonthlyTrend(range),
        getIncomeExpenseTrend(range),
        getFilteredCategoryBreakdown(range),
        getBudgetVsExpenses(),
      ]);

      setMonthlyTrend(monthlyRes.data);
      setIncomeExpense(incomeExpenseRes.data);
      setCategories(categoryRes.data);
      setBudgetUtilization(budgetRes.data);
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
    return (
      <div className="p-6">
        <p>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
  
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Analytics
        </h1>
  
        <select
        value={range}
        onChange={(e) => setRange(e.target.value)}
        className="border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 shadow-sm"
      >
        <option value="3m">Last 3 Months</option>
        <option value="6m">Last 6 Months</option>
        <option value="12m">Last 12 Months</option>
        <option value="all">All Time</option>
      </select>
      </div>
  
      <ExpenseTrendChart data={monthlyTrend} />
  
      <IncomeExpenseChart data={incomeExpense} />
  
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryPieChart data={categories} />
  
        <BudgetUtilizationCards
          data={budgetUtilization}
        />
      </div>
  
    </div>
  );
}