import { useEffect, useState } from "react";
import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget
} from "../../services/budgetService";

import { 
  getBudgetVsExpenses,
} from "../../services/dashboardService";

import BudgetCard from "../../components/budget/BudgetCard";
import BudgetForm from "../../components/budget/BudgetForm";

export default function BudgetPage() {
  const [budgets, setBudgets] = useState([]);
  const [editingBudget, setEditingBudget] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchBudgets = async () => {
    const res = await getBudgetVsExpenses();
    setBudgets(res.data || []);
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleAddOrUpdate = async (data) => {
    if (editingBudget) {
      await updateBudget(editingBudget._id, data);
    } else {
      await createBudget(data);
    }

    setEditingBudget(null);
    setShowForm(false);
    fetchBudgets();
  };

  const handleDelete = async (id) => {
    await deleteBudget(id);
    fetchBudgets();
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setShowForm(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Budgets
        </h1>

        <button
          onClick={() => {
            setEditingBudget(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Budget
        </button>
      </div>

      {/* EMPTY STATE */}
      {budgets.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          No budgets created yet. Start by adding one.
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {budgets.map((b) => (
          <BudgetCard
            key={b._id}
            budget={b}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">

          <div className="bg-white rounded-xl w-[420px] shadow-2xl">
            
            <BudgetForm
              onSubmit={handleAddOrUpdate}
              editingBudget={editingBudget}
            />

            <button
              onClick={() => setShowForm(false)}
              className="mt-3 text-sm text-gray-500"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}