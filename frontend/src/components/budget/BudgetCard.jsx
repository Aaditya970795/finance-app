export default function BudgetCard({ budget, onEdit, onDelete }) {
  const limit = budget.limit || 1;

  // fallback because backend doesn't send spent yet
  const spent = budget.spent ?? 0;

  const usage = (spent / limit) * 100;

  return (
    <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">

      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg text-gray-800">
          {budget.category}
        </h3>

        <div className="space-x-3 text-sm">
          <button
            onClick={() => onEdit(budget)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(budget._id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="text-gray-600 mt-1">
        Limit: ₹{budget.limit}
      </p>

      {/* PROGRESS BAR */}
      <div className="mt-3 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className={`h-2 transition-all duration-300 ${
            usage > 100
              ? "bg-red-500"
              : usage > 80
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
          style={{ width: `${Math.min(usage, 100)}%` }}
        />
      </div>

      <div className="flex justify-between text-xs mt-2 text-gray-500">
        <span>Spent: ₹{spent}</span>
        <span>{usage.toFixed(0)}%</span>
      </div>
    </div>
  );
}