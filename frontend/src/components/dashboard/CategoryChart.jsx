import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#ff6361"];
  
  export default function CategoryChart({ data = [] }) {
    return (
      <div className="p-5 bg-white shadow-md rounded-xl border border-gray-100 text-gray-900">
        <h2 className="font-bold text-lg mb-4">
          Expense by Category
        </h2>
  
        {data.length === 0 ? (
          <p className="text-sm text-gray-500">
            No expense data available
          </p>
        ) : (
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
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
      </div>
    );
  }