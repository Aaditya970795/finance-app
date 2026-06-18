import { useState, useEffect } from "react";

export default function BudgetForm({ onSubmit, editingBudget }) {
  const [form, setForm] = useState({
    category: "",
    limit: "",
    month: "",
    year: ""
  });

  useEffect(() => {
    if (editingBudget) {
      setForm({
        category: editingBudget.category || "",
        limit: editingBudget.limit || "",
        month: editingBudget.month || "",
        year: editingBudget.year || ""
      });
    } else {
      setForm({
        category: "",
        limit: "",
        month: "",
        year: ""
      });
    }
  }, [editingBudget]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 bg-white p-6 rounded-xl shadow-lg border border-gray-200"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        {editingBudget ? "Update Budget" : "Create Budget"}
      </h2>
  
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
  
      <input
        name="limit"
        placeholder="Limit"
        value={form.limit}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
  
      <input
        name="month"
        placeholder="Month"
        value={form.month}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
  
      <input
        name="year"
        placeholder="Year"
        value={form.year}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
  
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        {editingBudget ? "Update Budget" : "Create Budget"}
      </button>
    </form>
  );
}