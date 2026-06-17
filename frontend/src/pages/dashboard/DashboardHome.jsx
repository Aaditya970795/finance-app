export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Dashboard</h2>
        <p className="mt-1 text-sm text-muted">
          Overview of your finances at a glance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Balance", value: "$24,580.00" },
          { label: "Monthly Income", value: "$8,200.00" },
          { label: "Monthly Expenses", value: "$3,450.00" },
          { label: "Savings Rate", value: "58%" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-surface-raised p-5 shadow-card"
          >
            <p className="text-xs uppercase tracking-wider text-subtle">
              {stat.label}
            </p>
            <p className="mt-2 font-mono text-2xl font-semibold text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
