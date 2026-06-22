import Card from "../ui/Card";

export default function BudgetProgress({ budgets = [] }) {
  console.log("Budgets:", budgets);
  return (
    <Card>
      <h2 className="mb-5 text-lg font-bold text-foreground">
        Budget Progress
      </h2>

      {budgets.length === 0 ? (
        <p className="text-sm text-subtle">
        No budget data available
        </p>
      ) : (
        budgets.map((b) => (
          <div key={b.category} className="mb-5">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-medium text-foreground">
                {b.category}
              </span>

              <span className="text-sm text-muted">
                ₹{b.spent} / ₹{b.budget}
              </span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-border">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  b.percentageUsed > 80
                    ? "bg-negative"
                    : b.percentageUsed > 50
                    ? "bg-warning"
                    : "bg-positive"
                }`}
                style={{
                  width: `${b.percentageUsed ?? 0}%`,
                }}
              />
            </div>

            <p className="mt-1 text-xs text-subtle">
              {b.percentageUsed ?? 0}% used
            </p>
          </div>
        ))
      )}
    </Card>
  );
}