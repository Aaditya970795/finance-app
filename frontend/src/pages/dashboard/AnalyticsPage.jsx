import { useEffect, useState } from "react";

import {
  getMonthlyTrend,
  getIncomeExpenseTrend,
} from "../../services/analyticsService";

import {
  getCategoryBreakdown,
  getBudgetVsExpenses,
} from "../../services/dashboardService";

import ExpenseTrendChart from "../../components/analytics/ExpenseTrendChart";
import IncomeExpenseChart from "../../components/analytics/IncomeExpenseChart";
import CategoryPieChart from "../../components/analytics/CategoryPieChart";
import BudgetUtilizationCards from "../../components/analytics/BudgetUtilizationCards";

export default function AnalyticsPage() {
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [incomeExpense, setIncomeExpense] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budgetUtilization, setBudgetUtilization] = useState([]);

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
        getMonthlyTrend(),
        getIncomeExpenseTrend(),
        getCategoryBreakdown(),
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
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">
        Analytics
      </h1>
  
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