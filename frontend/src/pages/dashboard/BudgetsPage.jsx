import { useEffect, useState } from "react";

import {
  createBudget,
  updateBudget,
  deleteBudget,
} from "../../services/budgetService";

import {
  getBudgetVsExpenses,
} from "../../services/dashboardService";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import BudgetCard from "../../components/budget/BudgetCard";
import BudgetForm from "../../components/budget/BudgetForm";

export default function BudgetPage() {
  const [budgets, setBudgets] = useState([]);
  const [editingBudget, setEditingBudget] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const res = await getBudgetVsExpenses();
      setBudgets(res.data || []);
    } catch (error) {
      console.error("Failed to fetch budgets:", error);
    }
  };

  const handleAddOrUpdate = async (data) => {
    try {
      if (editingBudget) {
        await updateBudget(editingBudget._id, data);
      } else {
        await createBudget(data);
      }

      setEditingBudget(null);
      setShowForm(false);

      await fetchBudgets();
    } catch (error) {
      console.error("Failed to save budget:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this budget?"
    );

    if (!confirmed) return;

    try {
      await deleteBudget(id);
      await fetchBudgets();
    } catch (error) {
      console.error("Failed to delete budget:", error);
    }
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Budgets
          </h1>

          <p className="mt-1 text-muted">
            Manage your monthly spending limits.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setEditingBudget(null);
            setShowForm(true);
          }}
        >
          + Add Budget
        </Button>
      </div>

      {/* Empty State */}
      {budgets.length === 0 && (
        <Card className="py-16 text-center">
          <h3 className="text-lg font-semibold text-foreground">
            No Budgets Found
          </h3>

          <p className="mt-2 text-sm text-muted">
            Create your first monthly budget.
          </p>
        </Card>
      )}

      {/* Budget Grid */}
      {budgets.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {budgets.map((budget) => (
            <BudgetCard
              key={budget._id}
              budget={budget}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <Card className="w-full max-w-md">
            <BudgetForm
              onSubmit={handleAddOrUpdate}
              editingBudget={editingBudget}
            />

            <div className="mt-4 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditingBudget(null);
                  setShowForm(false);
                }}
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}