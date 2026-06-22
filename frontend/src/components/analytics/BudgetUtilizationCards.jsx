import Card from "../ui/Card";

export default function BudgetUtilizationCards({ data = [] }) {
  return (
    <Card className="h-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Budget Utilization
        </h2>

        <p className="mt-1 text-sm text-muted">
          Track how much of each monthly budget has been used.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex h-[320px] items-center justify-center">
          <p className="text-sm text-subtle">
            No budgets found.
          </p>
        </div>
      ) : (
        <div className="max-h-[420px] space-y-5 overflow-y-auto pr-2">
          {data.map((budget) => {
            const percentage = Math.min(
              budget.percentageUsed,
              100
            );

            const progressColor =
              budget.percentageUsed >= 100
                ? "bg-negative"
                : budget.percentageUsed >= 80
                ? "bg-warning"
                : "bg-positive";

            return (
              <div
                key={budget._id}
                className="rounded-xl border border-border bg-surface p-4"
              >
                {/* Header */}
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">
                    {budget.category}
                  </h3>

                  <span className="text-sm font-semibold text-muted">
                    {budget.percentageUsed}%
                  </span>
                </div>

                {/* Progress */}
                <div className="h-3 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${progressColor}`}
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                {/* Stats */}
                <div className="mt-5 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-subtle">
                      Budget
                    </p>

                    <p className="mt-1 font-semibold text-foreground">
                      ₹{budget.limit.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-subtle">
                      Spent
                    </p>

                    <p className="mt-1 font-semibold text-negative">
                      ₹{budget.spent.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-subtle">
                      Remaining
                    </p>

                    <p className="mt-1 font-semibold text-positive">
                      ₹{budget.remaining.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}