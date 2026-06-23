import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { showErrorToast } from "../../utils/showErrorToast";

import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "../../services/transactionService";

import TransactionTable from "../../components/transactions/TransactionTable";
import TransactionForm from "../../components/transactions/TransactionForm";

import {
  Button,
  Card,
  ErrorState,
  Loader,
  Modal,
} from "../../components/ui";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] =
    useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const data = await getTransactions();

      setTransactions(data.transactions);
      setError("");
    } catch (error) {
      setError("Failed to load transactions");
      showErrorToast(error);
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

        toast.success(
          "Transaction updated successfully"
        );
      } else {
        await createTransaction(formData);

        toast.success(
          "Transaction added successfully"
        );
      }

      await fetchTransactions();

      setShowForm(false);
      setEditingTransaction(null);
    } catch (error) {
      showErrorToast(error);
    }
  };

  const handleDeleteClick = (id) => {
    setTransactionToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteTransaction = async () => {
    if (!transactionToDelete) return;

    try {
      await deleteTransaction(transactionToDelete);

      toast.success(
        "Transaction deleted successfully"
      );

      await fetchTransactions();
    } catch (error) {
      showErrorToast(error);
    } finally {
      setShowDeleteModal(false);
      setTransactionToDelete(null);
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
      <ErrorState
        title="Unable to load transactions"
        description={error}
        onRetry={fetchTransactions}
      />
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Transactions
            </h1>

            <p className="mt-1 text-muted">
              View and manage all your financial
              transactions.
            </p>
          </div>

          <Button
            onClick={() => {
              setEditingTransaction(null);
              setShowForm(true);
            }}
          >
            + Add Transaction
          </Button>
        </div>

        {/* Form */}

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

            <div className="flex justify-end">
              <Button
                variant="ghost"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Table */}

        <TransactionTable
          transactions={transactions}
          onDelete={handleDeleteClick}
          onEdit={handleEditTransaction}
        />
      </div>

      {/* Delete Confirmation */}

      <Modal
        open={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setTransactionToDelete(null);
        }}
        title="Delete Transaction"
        size="sm"
      >
        <p className="text-muted">
          Are you sure you want to delete this
          transaction? This action cannot be
          undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={() => {
              setShowDeleteModal(false);
              setTransactionToDelete(null);
            }}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={confirmDeleteTransaction}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}
