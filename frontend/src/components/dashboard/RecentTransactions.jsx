import Card from "../ui/Card";

export default function RecentTransactions({ transactions = [] }) {
  return (
    <Card>
      <h2 className="mb-6 text-lg font-semibold text-foreground">
        Recent Transactions
      </h2>

      {transactions.length === 0 ? (
        <p className="text-sm text-subtle">
          No transactions found
        </p>
      ) : (
        <div className="space-y-2">
          {transactions.map((tx) => (
            <div
              key={tx._id}
              className="flex items-center justify-between rounded-lg border border-transparent px-3 py-3 transition-colors hover:border-border hover:bg-surface"
            >
              <div>
                <p className="font-medium text-foreground">
                  {tx.category}
                </p>

                <p className="text-xs text-muted">
                  {new Date(tx.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`font-semibold ${
                    tx.type === "income"
                      ? "text-positive"
                      : "text-negative"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"} ₹{tx.amount}
                </p>

                <p className="text-xs capitalize text-subtle">
                  {tx.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}