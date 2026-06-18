export default function BudgetUtilizationCards({ data = [] }) {
    if (!data.length) {
      return (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Budget Utilization
          </h2>
  
          <p className="text-gray-600">
            No budgets found.
          </p>
        </div>
      );
    }
  
    return (
      <div className="bg-white p-6 rounded-xl shadow-md h-full">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Budget Utilization
        </h2>
  
        <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
          {data.map((budget) => (
            <div
              key={budget._id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-900">
                  {budget.category}
                </h3>
  
                <span className="text-sm font-semibold text-gray-900">
                  {budget.percentageUsed}%
                </span>
              </div>
  
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-blue-500 transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      budget.percentageUsed,
                      100
                    )}%`,
                  }}
                />
              </div>
  
              <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                <div>
                  <p className="text-gray-600">
                    Budget
                  </p>
  
                  <p className="font-semibold text-gray-900">
                    ₹{budget.limit.toLocaleString()}
                  </p>
                </div>
  
                <div>
                  <p className="text-gray-600">
                    Spent
                  </p>
  
                  <p className="font-semibold text-gray-900">
                    ₹{budget.spent.toLocaleString()}
                  </p>
                </div>
  
                <div>
                  <p className="text-gray-600">
                    Remaining
                  </p>
  
                  <p className="font-semibold text-gray-900">
                    ₹{budget.remaining.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }