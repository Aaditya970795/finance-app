export default function TransactionTable({
    transactions,
    onDelete,
    onEdit,
  }) {
    if (!transactions || transactions.length === 0) {
      return (
        <div className="rounded-xl border border-border bg-surface-raised p-8 text-center">
          <h3 className="text-lg font-semibold text-foreground">
            No Transactions Found
          </h3>
  
          <p className="mt-2 text-sm text-muted">
            Start by adding your first transaction.
          </p>
        </div>
      );
    }
  
    return (
      <div className="overflow-hidden rounded-xl border border-border bg-surface-raised">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-border bg-surface">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Date
                </th>
  
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Category
                </th>
  
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Type
                </th>
  
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Amount
                </th>
  
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Note
                </th>
  
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Actions
                </th>
              </tr>
            </thead>
  
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="border-b border-border last:border-b-0 hover:bg-surface transition"
                >
                  <td className="px-6 py-4 text-sm text-foreground">
                    {new Date(
                      transaction.date
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
  
                  <td className="px-6 py-4 text-sm text-foreground">
                    {transaction.category}
                  </td>
  
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        transaction.type === "income"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
  
                  <td
                    className={`px-6 py-4 text-sm font-semibold ${
                      transaction.type === "income"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    ₹{transaction.amount.toLocaleString()}
                  </td>
  
                  <td className="px-6 py-4 text-sm text-muted">
                    {transaction.note || "-"}
                  </td>
  
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                        <button
                        onClick={() => onEdit(transaction)}
                        className="rounded-md bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400 transition hover:bg-blue-500/20"
                        >
                        Edit
                        </button>

                        <button
                        onClick={() => onDelete(transaction._id)}
                        className="rounded-md bg-red-500/10 px-3 py-1 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
                        >
                        Delete
                        </button>
                    </div>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }