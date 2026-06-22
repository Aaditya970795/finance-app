import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Card from "../ui/Card";

export default function IncomeExpenseChart({ data = [] }) {
  const chartData = data.map((item) => ({
    ...item,
    monthLabel: new Date(`${item.month}-01`).toLocaleString("default", {
      month: "short",
      year: "2-digit",
    }),
  }));

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Income vs Expense
        </h2>

        <p className="mt-1 text-sm text-muted">
          Compare your monthly income and expenses.
        </p>
      </div>

      {chartData.length === 0 ? (
        <div className="flex h-[320px] items-center justify-center">
          <p className="text-sm text-subtle">
            No income or expense data available.
          </p>
        </div>
      ) : (
        <div className="h-[350px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid
                stroke="#2a3347"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="monthLabel"
                tick={{
                  fill: "#94a3b8",
                  fontSize: 12,
                }}
                axisLine={{
                  stroke: "#2a3347",
                }}
                tickLine={{
                  stroke: "#2a3347",
                }}
              />

              <YAxis
                tickFormatter={(value) => `₹${value / 1000}k`}
                tick={{
                  fill: "#94a3b8",
                  fontSize: 12,
                }}
                axisLine={{
                  stroke: "#2a3347",
                }}
                tickLine={{
                  stroke: "#2a3347",
                }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#161b26",
                  border: "1px solid #2a3347",
                  borderRadius: "12px",
                  color: "#f1f5f9",
                }}
                labelStyle={{
                  color: "#f1f5f9",
                }}
                formatter={(value) => [
                  `₹${Number(value).toLocaleString()}`,
                ]}
              />

              <Legend
                wrapperStyle={{
                  color: "#94a3b8",
                }}
              />

              <Bar
                dataKey="income"
                name="Income"
                fill="#22c55e"
                radius={[8, 8, 0, 0]}
              />

              <Bar
                dataKey="expense"
                name="Expense"
                fill="#ef4444"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}