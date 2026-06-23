import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "../../services/transactionService";

import TransactionTable from "../../components/transactions/TransactionTable";
import TransactionForm from "../../components/transactions/TransactionForm";

import { Card, Loader } from "../../components/ui";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const data = await getTransactions();

      setTransactions(data.transactions);
      setError("");
    } catch (err) {
      setError(
        err.message || "Failed to load transactions"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitTransaction = async (formData) => {
    try {
      if (editingTransaction) {
        await updateTransaction(
          editingTransaction._id,
          formData
        );
      } else {
        await createTransaction(formData);
      }

      await fetchTransactions();

      setShowForm(false);
      setEditingTransaction(null);
    } catch (error) {
      console.error(error);
    
      toast.error(
        error.response?.data?.error ||
        "Failed to save transaction"
      );
    }
  };

  const handleDeleteTransaction = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) return;

    try {
      await deleteTransaction(id);

      await fetchTransactions();
    } catch (error) {
      console.error(error);
    
      toast.error(
        error.response?.data?.error ||
        "Failed to delete transaction"
      );
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  if (loading) {
    return <Loader variant="transactions" />;
  }

  if (error) {
    return (
      <div className="text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Transactions
          </h1>

          <p className="mt-1 text-muted">
            View and manage all your financial transactions.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingTransaction(null);
            setShowForm(true);
          }}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          + Add Transaction
        </button>
      </div>

      {showForm && (
        <Card className="space-y-4">
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            {editingTransaction
              ? "Edit Transaction"
              : "Add Transaction"}
          </h2>

          <TransactionForm
            initialData={editingTransaction}
            onSubmit={handleSubmitTransaction}
          />

          <button
            onClick={handleCancel}
            className="mt-4 text-sm text-red-400 hover:text-red-300"
          >
            Cancel
          </button>
        </Card>
      )}

      <TransactionTable
        transactions={transactions}
        onDelete={handleDeleteTransaction}
        onEdit={handleEditTransaction}
      />
    </div>
  );
}
