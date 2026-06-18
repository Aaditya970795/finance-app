import axiosInstance from "../api/axiosInstance";

export const getMonthlyTrend = async () => {
  const response = await axiosInstance.get(
    "/analytics/monthly-trend"
  );
  return response.data;
};

export const getIncomeExpenseTrend = async () => {
  const response = await axiosInstance.get(
    "/analytics/income-expense-trend"
  );
  return response.data;
};