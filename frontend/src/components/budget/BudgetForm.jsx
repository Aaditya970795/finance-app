import { useEffect, useState } from "react";

import Button from "../ui/Button";

export default function BudgetForm({
  onSubmit,
  editingBudget,
}) {
  const [form, setForm] = useState({
    category: "",
    limit: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    if (editingBudget) {
      setForm({
        category: editingBudget.category,
        limit: editingBudget.limit,
        month: editingBudget.month,
        year: editingBudget.year,
      });
    } else {
      setForm({
        category: "",
        limit: "",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
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
      className="space-y-6"
    >
    
      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Category
        </label>

        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Food, Travel, Shopping..."
          required
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-subtle focus:border-brand focus:outline-none"
        />
      </div>

      {/* Budget */}
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
          min="1"
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-subtle focus:border-brand focus:outline-none"
        />
      </div>

      {/* Month & Year */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Month
          </label>

          <select
            name="month"
            value={form.month}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground focus:border-brand focus:outline-none"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option
                key={i + 1}
                value={i + 1}
              >
                {new Date(
                  0,
                  i
                ).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
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
            min="2024"
            required
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground focus:border-brand focus:outline-none"
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