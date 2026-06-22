import { useEffect, useState } from "react";

import Button from "../ui/Button";

export default function BudgetForm({
  onSubmit,
  editingBudget,
}) {
  const [form, setForm] = useState({
    category: "",
    limit: "",
    month: "",
    year: "",
  });

  useEffect(() => {
    if (editingBudget) {
      setForm({
        category: editingBudget.category || "",
        limit: editingBudget.limit || "",
        month: editingBudget.month || "",
        year: editingBudget.year || "",
      });
    } else {
      setForm({
        category: "",
        limit: "",
        month: "",
        year: "",
      });
    }
  }, [editingBudget]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          {editingBudget
            ? "Update Budget"
            : "Create Budget"}
        </h2>

        <p className="mt-1 text-sm text-muted">
          Set spending limits for each category.
        </p>
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Category
        </label>

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Food, Travel, Shopping..."
          required
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-subtle outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>

      {/* Budget Limit */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Budget Limit
        </label>

        <input
          type="number"
          name="limit"
          value={form.limit}
          onChange={handleChange}
          placeholder="5000"
          required
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-subtle outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>

      {/* Month + Year */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Month
          </label>

          <input
            type="number"
            name="month"
            value={form.month}
            onChange={handleChange}
            min="1"
            max="12"
            required
            placeholder="6"
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-subtle outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Year
          </label>

          <input
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
            required
            placeholder="2026"
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-subtle outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
      >
        {editingBudget
          ? "Update Budget"
          : "Create Budget"}
      </Button>
    </form>
  );
}