import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Card from "../ui/Card";

export default function MonthlyChart({ data = [] }) {
  console.log("Monthly Chart Data:", data);
  const formattedData = {};

  data.forEach((item) => {
    if (!formattedData[item.month]) {
      formattedData[item.month] = {
        month: item.month,
      };
    }

    formattedData[item.month][item.type] = item.total;
  });

  const chartData = Object.values(formattedData);

  return (
    <Card>
      <h2 className="mb-6 text-lg font-semibold text-foreground">
        Monthly Overview
      </h2>

      {chartData.length === 0 ? (
        <p className="text-sm text-subtle">
          No monthly data available
        </p>
      ) : (
        <div className="h-[300px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="month"
                tick={{ fill: "#94a3b8" }}
                axisLine={{ stroke: "#2a3347" }}
                tickLine={{ stroke: "#2a3347" }}
              />

              <YAxis
                tick={{ fill: "#94a3b8" }}
                axisLine={{ stroke: "#2a3347" }}
                tickLine={{ stroke: "#2a3347" }}
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
              />

              <Legend
                wrapperStyle={{
                  color: "#94a3b8",
                }}
              />

              <Line
                type="monotone"
                dataKey="income"
                stroke="#22c55e"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="expense"
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