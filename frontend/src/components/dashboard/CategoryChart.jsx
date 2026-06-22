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
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#ff6361",
];

export default function CategoryChart({ data = [] }) {
  console.log("Category Chart Data:", data);
  return (
    <Card>
      <h2 className="mb-4 text-lg font-bold text-foreground">
        Expense by Category
      </h2>

      {data.length === 0 ? (
        <p className="text-sm text-subtle">
          No expense data available
        </p>
      ) : (
        <div className="h-[300px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}