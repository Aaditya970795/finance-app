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

import { Card, EmptyState } from "../ui";

export default function IncomeExpenseChart({ data = [] }) {
  const chartData = data.map((item) => ({
    ...item,
    monthLabel: new Date(`${item.month}-01`).toLocaleString("default", {
      month: "short",
      year: "2-digit",
    }),
  }));

  if (chartData.length === 0) {
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

        <EmptyState
          title="No Financial Data"
          description="Add income and expense transactions to compare monthly cash flow."
        />
      </Card>
    );
  }

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

      <div className="h-[350px] w-full">
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
              tickFormatter={(value) =>
                `₹${Intl.NumberFormat("en-IN", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(value)}`
              }
            />

            <Tooltip
              cursor={{
                fill: "rgba(255,255,255,0.03)",
              }}
              contentStyle={{
                backgroundColor: "#161b26",
                border: "1px solid #2a3347",
                borderRadius: "12px",
                color: "#f8fafc",
              }}
              labelStyle={{
                color: "#f8fafc",
              }}
              formatter={(value, name) => [
                `₹${Number(value).toLocaleString()}`,
                name,
              ]}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{
                color: "#94a3b8",
                fontSize: 13,
              }}
            />

            <Bar
              dataKey="income"
              name="Income"
              fill="#22c55e"
              radius={[8, 8, 0, 0]}
              animationDuration={700}
            />

            <Bar
              dataKey="expense"
              name="Expense"
              fill="#ef4444"
              radius={[8, 8, 0, 0]}
              animationDuration={700}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}