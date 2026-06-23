import { Card, EmptyState } from "../ui";

export default function BudgetUtilizationCards({ data = [] }) {
  if (data.length === 0) {
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

        <EmptyState
          title="No Budgets Found"
          description="Create a budget to monitor your monthly spending."
        />
      </Card>
    );
  }

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

      <div className="max-h-[420px] space-y-5 overflow-y-auto pr-2">
        {data.map((budget) => {
          const percentage = Math.min(
            Number(budget.percentageUsed || 0),
            100
          );

          const remaining = Number(budget.remaining || 0);

          const progressColor =
            percentage >= 100
              ? "bg-negative"
              : percentage >= 80
              ? "bg-warning"
              : "bg-positive";

          return (
            <div
              key={budget._id}
              className="rounded-xl border border-border bg-surface p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">
                  {budget.category}
                </h3>

                <span className="text-sm font-semibold text-muted">
                  {percentage.toFixed(1)}%
                </span>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-border">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="mt-5 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-subtle">Budget</p>

                  <p className="mt-1 font-semibold text-foreground">
                    ₹{Number(budget.limit).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-subtle">Spent</p>

                  <p className="mt-1 font-semibold text-negative">
                    ₹{Number(budget.spent).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-subtle">Remaining</p>

                  <p
                    className={`mt-1 font-semibold ${
                      remaining >= 0
                        ? "text-positive"
                        : "text-negative"
                    }`}
                  >
                    ₹{remaining.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}