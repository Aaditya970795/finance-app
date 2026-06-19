import axiosInstance from "../api/axiosInstance";

export const getMonthlyTrend = async (
  range = "12m"
) => {
  const response = await axiosInstance.get(
    `/analytics/monthly-trend?range=${range}`
  );

  return response.data;
};

export const getIncomeExpenseTrend = async (
  range = "12m"
) => {
  const response = await axiosInstance.get(
    `/analytics/income-expense-trend?range=${range}`
  );

  return response.data;
};

export const getFilteredCategoryBreakdown =
  async (range = "12m") => {
    const response = await axiosInstance.get(
      `/analytics/category-breakdown?range=${range}`
    );

    return response.data;
  };

  export const getInsights = async (range = "12m") => {
    const response = await axiosInstance.get(
      `/analytics/insights?range=${range}`
    );
  
    return response.data;
  };