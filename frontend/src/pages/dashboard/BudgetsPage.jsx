import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { showErrorToast } from "../../utils/showErrorToast";

import {
  createBudget,
  updateBudget,
  deleteBudget,
} from "../../services/budgetService";

import { getBudgetVsExpenses } from "../../services/dashboardService";

import {
  Button,
  Card,
  EmptyState,
  ErrorState,
  Loader,
  Modal,
} from "../../components/ui";

import BudgetCard from "../../components/budget/BudgetCard";
import BudgetForm from "../../components/budget/BudgetForm";

export default function BudgetPage() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);
  const [budgetToDelete, setBudgetToDelete] =
    useState(null);

  const fetchBudgets = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getBudgetVsExpenses();

      setBudgets(res.data || []);
      setError("");
    } catch (error) {
      setError("Failed to load budgets");
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const handleAddBudget = () => {
    setEditingBudget(null);
    setShowForm(true);
  };

  const handleEditBudget = (budget) => {
    setEditingBudget(budget);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingBudget(null);
    setShowForm(false);
  };

  const handleSubmit = async (data) => {
    try {
      if (editingBudget) {
        await updateBudget(editingBudget._id, data);

        toast.success("Budget updated successfully");
      } else {
        await createBudget(data);

        toast.success("Budget created successfully");
      }

      handleCancel();
      await fetchBudgets();
    } catch (error) {
      showErrorToast(error);
    }
  };

  const handleDeleteClick = (id) => {
    setBudgetToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteBudget = async () => {
    if (!budgetToDelete) return;

    try {
      await deleteBudget(budgetToDelete);

      toast.success("Budget deleted successfully");

      await fetchBudgets();
    } catch (error) {
      showErrorToast(error);
    } finally {
      setShowDeleteModal(false);
      setBudgetToDelete(null);
    }
  };

  if (loading) {
    return <Loader variant="budget" />;
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to load budgets"
        description={error}
        onRetry={fetchBudgets}
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
              Budgets
            </h1>

            <p className="mt-1 text-muted">
              Manage your monthly spending
              limits.
            </p>
          </div>

          <Button onClick={handleAddBudget}>
            + Add Budget
          </Button>
        </div>

        {/* Form */}

        {showForm && (
          <Card className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              {editingBudget
                ? "Edit Budget"
                : "Create Budget"}
            </h2>

            <BudgetForm
              editingBudget={editingBudget}
              onSubmit={handleSubmit}
            />

            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Content */}

        {budgets.length === 0 ? (
          <EmptyState
            title="No Budgets Found"
            description="Create your first monthly budget."
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {budgets.map((budget) => (
              <BudgetCard
                key={budget._id}
                budget={budget}
                onEdit={handleEditBudget}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}

      <Modal
        open={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setBudgetToDelete(null);
        }}
        title="Delete Budget"
        size="sm"
      >
        <p className="text-muted">
          Are you sure you want to delete this
          budget? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={() => {
              setShowDeleteModal(false);
              setBudgetToDelete(null);
            }}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={confirmDeleteBudget}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}