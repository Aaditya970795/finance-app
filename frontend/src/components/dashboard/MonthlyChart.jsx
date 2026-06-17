import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
  export default function MonthlyChart({ data = [] }) {
    // Transform backend data → chart format
    const formattedData = {};
  
    data.forEach((item) => {
      if (!formattedData[item.month]) {
        formattedData[item.month] = { month: item.month };
      }
  
      formattedData[item.month][item.type] = item.total;
    });
  
    const chartData = Object.values(formattedData);
  
    return (
      <div className="p-5 bg-white shadow-md rounded-xl border border-gray-100 text-gray-900">
        <h2 className="font-bold text-lg mb-4">
          Monthly Overview
        </h2>
  
        {chartData.length === 0 ? (
          <p className="text-sm text-gray-500">
            No monthly data available
          </p>
        ) : (
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6b7280" }}
                />
                <YAxis tick={{ fill: "#6b7280" }} />
                <Tooltip />
                <Legend />
  
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                />
  
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    );
  }