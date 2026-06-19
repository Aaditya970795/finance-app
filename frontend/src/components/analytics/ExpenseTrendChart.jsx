import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
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
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Monthly Expense Trend
        </h2>
  
        <div className="h-80">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
  
              <XAxis dataKey="monthLabel" />
  
              <YAxis />
  
              <Tooltip />
  
              <Line
                type="monotone"
                dataKey="total"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }