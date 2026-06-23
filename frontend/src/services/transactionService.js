import axiosInstance from "../api/axiosInstance";

export const getTransactions = async () => {
  const response = await axiosInstance.get("/transactions");
  return response.data;
};

export const createTransaction = async (transactionData) => {
  const response = await axiosInstance.post("/transactions", transactionData);
  return response.data;
};

export const updateTransaction = async (id, transactionData) => {
  const response = await axiosInstance.put(`/transactions/${id}`, transactionData);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await axiosInstance.delete(`/transactions/${id}`);
  return response.data;
};