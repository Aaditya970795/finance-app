import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import Card from "../ui/Card";

export default function MonthlyChart({ data = [] }) {
  const formattedData = {};

  data.forEach((item) => {
    if (!formattedData[item.month]) {
      formattedData[item.month] = {
        month: new Date(`${item.month}-01`).toLocaleString("default", {
          month: "short",
          year: "2-digit",
        }),
      };
    }

    formattedData[item.month][item.type] = item.total;
  });

  const chartData = Object.values(formattedData);

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Monthly Overview
        </h2>

        <p className="mt-1 text-sm text-muted">
          Compare your monthly income and expenses over time.
        </p>
      </div>

      {chartData.length === 0 ? (
        <div className="flex h-[320px] items-center justify-center">
          <p className="text-sm text-subtle">
            No monthly data available.
          </p>
        </div>
      ) : (
        <div className="h-[350px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                stroke="#2a3347"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
                tick={{
                  fill: "#94a3b8",
                  fontSize: 12,
                }}
                axisLine={{ stroke: "#2a3347" }}
                tickLine={{ stroke: "#2a3347" }}
              />

              <YAxis
                tick={{
                  fill: "#94a3b8",
                  fontSize: 12,
                }}
                axisLine={{ stroke: "#2a3347" }}
                tickLine={{ stroke: "#2a3347" }}
                tickFormatter={(value) => `₹${value / 1000}k`}
              />

              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toLocaleString()}`,
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

              <Line
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#22c55e"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="expense"
                name="Expense"
                stroke="#ef4444"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}