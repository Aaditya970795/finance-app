export default function RecentTransactions({ transactions = [] }) {
    return (
      <div className="p-5 bg-white shadow-md rounded-xl border border-gray-100 text-gray-900">
        <h2 className="font-bold text-lg mb-4">
          Recent Transactions
        </h2>
  
        {transactions.length === 0 ? (
          <p className="text-sm text-gray-500">
            No transactions found
          </p>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx._id}
                className="flex justify-between items-center border-b border-gray-100 pb-3"
              >
                {/* Left side */}
                <div>
                  <p className="font-medium text-gray-800">
                    {tx.category}
                  </p>
  
                  <p className="text-xs text-gray-500">
                    {new Date(tx.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
  
                {/* Right side */}
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      tx.type === "income"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"} ₹{tx.amount}
                  </p>
  
                  <p className="text-xs text-gray-400 capitalize">
                    {tx.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }