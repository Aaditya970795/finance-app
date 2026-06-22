import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Card from "../ui/Card";

export default function ExpenseTrendChart({ data = [] }) {
  const chartData = data.map((item) => ({
    ...item,
    monthLabel: new Date(`${item.month}-01`).toLocaleString(
      "default",
      {
        month: "short",
        year: "2-digit",
      }
    ),
  }));

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Expense Trend
        </h2>

        <p className="mt-1 text-sm text-muted">
          Monthly expense trend over time.
        </p>
      </div>

      {chartData.length === 0 ? (
        <div className="flex h-[350px] items-center justify-center">
          <p className="text-sm text-subtle">
            No expense trend available.
          </p>
        </div>
      ) : (
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 20,
                left: 10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="expenseGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#ef4444"
                    stopOpacity={0.35}
                  />

                  <stop
                    offset="95%"
                    stopColor="#ef4444"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#2a3347"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="monthLabel"
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
                tickFormatter={(value) =>
                  `₹${value / 1000}k`
                }
              />

              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toLocaleString()}`,
                  "Expense",
                ]}
                contentStyle={{
                  backgroundColor: "#161b26",
                  border: "1px solid #2a3347",
                  borderRadius: "12px",
                }}
                labelStyle={{
                  color: "#f1f5f9",
                }}
              />

              <Area
                type="monotoneX"
                dataKey="total"
                name="Expense"
                stroke="#ef4444"
                strokeWidth={3}
                fill="url(#expenseGradient)"
                animationDuration={900}
                activeDot={{
                  r: 6,
                  stroke: "#ef4444",
                  strokeWidth: 2,
                  fill: "#fff",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}