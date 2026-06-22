import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Card from "../ui/Card";

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#14b8a6",
  "#ec4899",
];

export default function CategoryChart({ data = [] }) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Expense by Category
        </h2>

        <p className="mt-1 text-sm text-muted">
          Distribution of your spending across categories.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex h-[320px] items-center justify-center">
          <p className="text-sm text-subtle">
            No expense data available.
          </p>
        </div>
      ) : (
        <div className="h-[350px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label={({ category, percent }) =>
                  `${category} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.category}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toLocaleString()}`,
                  "Expense",
                ]}
                contentStyle={{
                  backgroundColor: "#161b26",
                  border: "1px solid #2a3347",
                  borderRadius: "12px",
                  color: "#f1f5f9",
                }}
                labelStyle={{
                  color: "#f1f5f9",
                }}
              />

              <Legend
                wrapperStyle={{
                  color: "#94a3b8",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}