import { useEffect, useState } from "react";

import {
  Button,
  Input,
  Select,
  Textarea,
} from "../ui";

export default function TransactionForm({
  onSubmit,
  initialData = null,
}) {
  const getDefaultForm = () => ({
    amount: "",
    type: "expense",
    category: "",
    note: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [formData, setFormData] = useState(getDefaultForm());

  useEffect(() => {
    if (initialData) {
      setFormData({
        amount: initialData.amount || "",
        type: initialData.type || "expense",
        category: initialData.category || "",
        note: initialData.note || "",
        date: initialData.date
          ? initialData.date.split("T")[0]
          : getDefaultForm().date,
      });
    } else {
      setFormData(getDefaultForm());
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

      <Select
        label="Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
      >
        <option value="expense">
          Expense
        </option>

        <option value="income">
          Income
        </option>
      </Select>

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

      <Textarea
        label="Note"
        name="note"
        value={formData.note}
        onChange={handleChange}
        placeholder="Optional note..."
        rows={4}
      />

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