import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Card from "../ui/Card";
import EmptyState from "../ui/EmptyState";

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#14b8a6",
  "#ec4899",
];

export default function CategoryPieChart({ data = [] }) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Expense by Category
        </h2>

        <p className="mt-1 text-sm text-muted">
          See how your spending is distributed across categories.
        </p>
      </div>

      {data.length === 0 ? (
        <EmptyState
          title="No Category Data"
          description="Add some expense transactions to visualize category-wise spending."
        />
      ) : (
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={110}
                paddingAngle={3}
                animationDuration={700}
                label={({ percent }) =>
                  `${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
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
                  color: "#f8fafc",
                }}
                labelStyle={{
                  color: "#f8fafc",
                }}
              />

              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{
                  color: "#94a3b8",
                  fontSize: 13,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}