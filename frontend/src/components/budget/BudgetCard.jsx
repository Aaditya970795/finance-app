import { Card, Button } from "../ui";

export default function BudgetCard({
  budget,
  onEdit,
  onDelete,
}) {
  const limit = budget.limit || 1;
  const spent = budget.spent ?? 0;

  const usage = (spent / limit) * 100;

  const progressColor =
    usage >= 100
      ? "bg-negative"
      : usage >= 80
      ? "bg-warning"
      : "bg-positive";

  return (
    <Card hover className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {budget.category}
          </h3>

          <p className="mt-1 text-sm text-muted">
            Budget Limit
          </p>
        </div>

        <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
          ₹{budget.limit.toLocaleString()}
        </span>
      </div>

      {/* Progress */}
      <div>
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-muted">
            Spent
          </span>

          <span className="font-medium text-foreground">
            ₹{spent.toLocaleString()}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-border">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
            style={{
              width: `${Math.min(usage, 100)}%`,
            }}
          />
        </div>

        <div className="mt-2 flex justify-between text-xs">
          <span className="text-subtle">
            Remaining ₹
            {Math.max(
              budget.limit - spent,
              0
            ).toLocaleString()}
          </span>

          <span
            className={`font-medium ${
              usage >= 100
                ? "text-negative"
                : usage >= 80
                ? "text-warning"
                : "text-positive"
            }`}
          >
            {usage.toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex gap-3">
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={() => onEdit(budget)}
        >
          Edit
        </Button>

        <Button
          variant="danger"
          size="sm"
          className="flex-1"
          onClick={() => onDelete(budget._id)}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}