export default function BudgetProgress({ budgets = [] }) {
    return (
      <div className="p-5 bg-white shadow-md rounded-xl border border-gray-100 text-gray-900">
        <h2 className="font-bold text-lg mb-5">
          Budget Progress
        </h2>
  
        {budgets.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No budget data available
          </p>
        ) : (
          budgets.map((b) => (
            <div key={b.category} className="mb-5">
              
              {/* Header row */}
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-gray-700">
                  {b.category}
                </span>
  
                <span className="text-sm text-gray-600">
                  ₹{b.spent} / ₹{b.budget}
                </span>
              </div>
  
              {/* Progress bar background */}
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    b.percentageUsed > 80
                      ? "bg-red-500"
                      : b.percentageUsed > 50
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{
                    width: `${b.percentageUsed ?? 0}%`,
                  }}
                />
              </div>
  
              {/* Percentage */}
              <p className="text-xs text-gray-500 mt-1">
                {b.percentageUsed ?? 0}% used
              </p>
            </div>
          ))
        )}
      </div>
    );
  }