export default function BudgetsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Budgets</h2>
        <p className="mt-1 text-sm text-muted">
          Set spending limits and monitor category budgets.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-surface-raised p-6 shadow-card">
        <p className="text-sm text-muted">
          Budget categories and progress bars will appear here.
        </p>
      </div>
    </div>
  );
}
