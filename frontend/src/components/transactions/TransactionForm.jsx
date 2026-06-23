import { useEffect, useState } from "react";

import { Button, Input } from "../ui";

export default function TransactionForm({
  onSubmit,
  initialData = null,
}) {
  const defaultForm = {
    amount: "",
    type: "expense",
    category: "",
    note: "",
    date: new Date().toISOString().split("T")[0],
  };

  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    if (initialData) {
      setFormData({
        amount: initialData.amount || "",
        type: initialData.type || "expense",
        category: initialData.category || "",
        note: initialData.note || "",
        date: initialData.date
          ? initialData.date.split("T")[0]
          : defaultForm.date,
      });
    } else {
      setFormData(defaultForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <Input
        label="Amount"
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Enter amount"
        required
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Type
        </label>

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        >
          <option value="expense">
            Expense
          </option>

          <option value="income">
            Income
          </option>
        </select>
      </div>

      <Input
        label="Category"
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Food, Salary, Shopping..."
        required
      />

      <Input
        label="Date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Note
        </label>

        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          rows={4}
          placeholder="Optional note..."
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-subtle transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </div>

      <Button
        type="submit"
        fullWidth
      >
        {initialData
          ? "Update Transaction"
          : "Save Transaction"}
      </Button>
    </form>
  );
}