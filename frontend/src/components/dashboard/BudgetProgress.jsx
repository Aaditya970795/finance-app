import { Card, EmptyState } from "../ui";

export default function BudgetProgress({ budgets = [] }) {
  if (budgets.length === 0) {
    return (
      <Card>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            Budget Progress
          </h2>

          <p className="mt-1 text-sm text-muted">
            Monitor how much of your monthly budget has been used.
          </p>
        </div>

        <EmptyState
          title="No Budgets Found"
          description="Create a budget to start tracking your spending."
        />
      </Card>
    );
  }

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Budget Progress
        </h2>

        <p className="mt-1 text-sm text-muted">
          Monitor how much of your monthly budget has been used.
        </p>
      </div>

      <div className="space-y-6">
        {budgets.map((budget) => {
          const percentage = Math.min(
            Number(budget.percentageUsed || 0),
            100
          );

          const progressColor =
            percentage >= 100
              ? "bg-negative"
              : percentage >= 80
              ? "bg-warning"
              : "bg-positive";

          return (
            <div key={budget.category}>
              {/* Header */}
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {budget.category}
                  </h3>

                  <p className="text-xs text-subtle">
                    ₹{Number(budget.spent).toLocaleString()} of ₹
                    {Number(budget.budget).toLocaleString()}
                  </p>
                </div>

                <span className="text-sm font-semibold text-muted">
                  {percentage.toFixed(1)}%
                </span>
              </div>

              {/* Progress */}
              <div className="h-3 w-full overflow-hidden rounded-full bg-border">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}