export default function StatCards({ summary }) {
    const cards = [
      {
        label: "Income",
        value: summary?.totalIncome ?? 0,
        color: "text-green-600",
      },
      {
        label: "Expense",
        value: summary?.totalExpenses ?? 0,
        color: "text-red-500",
      },
      {
        label: "Balance",
        value: summary?.balance ?? 0,
        color: "text-blue-600",
      },
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="p-5 bg-white shadow-md rounded-xl border border-gray-100"
          >
            <h3 className="text-sm font-medium text-gray-500">
              {c.label}
            </h3>
  
            <p className={`text-2xl font-bold mt-2 ${c.color}`}>
              ₹ {c.value}
            </p>
          </div>
        ))}
      </div>
    );
  }