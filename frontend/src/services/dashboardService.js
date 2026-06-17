import axiosInstance from "../api/axiosInstance";

export const getDashboardSummary = () =>
  axiosInstance.get("/dashboard/summary");

export const getCategoryBreakdown = () =>
  axiosInstance.get("/dashboard/category-breakdown");

export const getMonthlyOverview = () =>
  axiosInstance.get("/dashboard/monthly-overview");

export const getBudgetVsExpenses = () =>
  axiosInstance.get("/dashboard/budget-vs-expenses");