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
  
  export default function IncomeExpenseChart({ data = [] }) {
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
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Income vs Expense
        </h2>
  
        <div className="h-80">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />
  
              <XAxis
                dataKey="monthLabel"
                tick={{ fontSize: 12 }}
              />
  
              <YAxis
                tickFormatter={(value) => `₹${value / 1000}k`}
              />
  
            <Tooltip
            formatter={(value) => [
                `₹${Number(value).toLocaleString()}`,
            ]}
            contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                color: "#111827",
            }}
            labelStyle={{
                color: "#111827",
                fontWeight: 600,
            }}
            itemStyle={{
                color: "#111827",
            }}
            />
  
              <Legend
                verticalAlign="top"
                height={36}
              />
  
              <Bar
                dataKey="income"
                name="Income"
                fill="#22c55e"
                radius={[6, 6, 0, 0]}
              />
  
              <Bar
                dataKey="expense"
                name="Expense"
                fill="#ef4444"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }