import { useEffect, useState } from "react";

export default function TransactionForm({
  onSubmit,
  initialData = null,
}) {
  const [formData, setFormData] = useState({
    amount: "",
    type: "expense",
    category: "",
    note: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        amount: initialData.amount || "",
        type: initialData.type || "expense",
        category: initialData.category || "",
        note: initialData.note || "",
        date: initialData.date
          ? initialData.date.split("T")[0]
          : new Date().toISOString().split("T")[0],
      });
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
      className="space-y-4"
    >
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
        className="w-full rounded-lg border border-border bg-surface p-3"
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full rounded-lg border border-border bg-surface p-3"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full rounded-lg border border-border bg-surface p-3"
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full rounded-lg border border-border bg-surface p-3"
      />

      <textarea
        name="note"
        placeholder="Note"
        value={formData.note}
        onChange={handleChange}
        className="w-full rounded-lg border border-border bg-surface p-3"
      />

      <button
        type="submit"
        className="rounded-lg bg-brand px-4 py-2 text-white"
      >
        {initialData
          ? "Update Transaction"
          : "Save Transaction"}
      </button>
    </form>
  );
}