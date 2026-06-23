import { Card } from "../ui";

const stats = [
  {
    key: "Income",
    field: "totalIncome",
    color: "text-positive",
    bg: "bg-positive/10",
    icon: "💰",
    description: "Total money received",
  },
  {
    key: "Expense",
    field: "totalExpenses",
    color: "text-negative",
    bg: "bg-negative/10",
    icon: "💸",
    description: "Total money spent",
  },
  {
    key: "Balance",
    field: "balance",
    color: "text-brand",
    bg: "bg-brand/10",
    icon: "📊",
    description: "Current available balance",
  },
];

export default function StatCards({ summary = {} }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {stats.map((stat) => (
        <Card
          key={stat.key}
          hover
          className="flex items-center justify-between"
        >
          <div>
            <p className="text-sm font-medium text-muted">
              {stat.key}
            </p>

            <h2
              className={`mt-2 text-3xl font-bold ${stat.color}`}
            >
              ₹
              {Number(
                summary[stat.field] ?? 0
              ).toLocaleString()}
            </h2>

            <p className="mt-2 text-xs text-subtle">
              {stat.description}
            </p>
          </div>

          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${stat.bg}`}
          >
            {stat.icon}
          </div>
        </Card>
      ))}
    </div>
  );
}