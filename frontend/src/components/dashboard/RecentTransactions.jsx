import Card from "../ui/Card";
import EmptyState from "../ui/EmptyState";

export default function RecentTransactions({
  transactions = [],
}) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Recent Transactions
        </h2>

        <p className="mt-1 text-sm text-muted">
          Your latest financial activities.
        </p>
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          title="No Transactions"
          description="Your recent transactions will appear here."
        />
      ) : (
        <div className="divide-y divide-border">
          {transactions.map((tx) => (
            <div
              key={tx._id}
              className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
            >
              <div className="space-y-1">
                <h3 className="font-medium text-foreground">
                  {tx.category}
                </h3>

                <p className="text-sm text-muted">
                  {tx.note || "No note"}
                </p>

                <p className="text-xs text-subtle">
                  {new Date(tx.date).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>

              <div className="text-right space-y-2">
                <p
                  className={`text-lg font-semibold ${
                    tx.type === "income"
                      ? "text-positive"
                      : "text-negative"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"}₹
                  {tx.amount.toLocaleString()}
                </p>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    tx.type === "income"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {tx.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}