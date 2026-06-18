import axiosInstance from "../api/axiosInstance";

export const getDashboardSummary = async () => {
  const response = await axiosInstance.get("/dashboard/summary");
  return response.data;
};

export const getCategoryBreakdown = async () => {
  const response = await axiosInstance.get("/dashboard/category-breakdown");
  return response.data;
};

export const getMonthlyOverview = async () => {
  const response = await axiosInstance.get("/dashboard/monthly-overview");
  return response.data;
};

export const getBudgetVsExpenses = async () => {
  const response = await axiosInstance.get("/dashboard/budget-vs-expenses");
  return response.data;
};