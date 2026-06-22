import Card from "../ui/Card";

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
      {cards.map((card) => (
        <Card key={card.label} hover>
          <h3 className="text-sm font-medium text-gray-500">
            {card.label}
          </h3>

          <p className={`mt-2 text-2xl font-bold ${card.color}`}>
            ₹ {card.value}
          </p>
        </Card>
      ))}
    </div>
  );
}