import Card from "../ui/Card";
import EmptyState from "../ui/EmptyState";
import InsightCard from "./InsightCard";

export default function AIInsights({ insights }) {
  if (!insights) {
    return (
      <Card>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            AI Insights
          </h2>

          <p className="mt-1 text-sm text-muted">
            Personalized insights generated from your financial activity.
          </p>
        </div>

        <EmptyState
          title="No AI Insights"
          description="Add more financial data to generate personalized insights."
        />
      </Card>
    );
  }

  const trendColor =
    insights.expenseTrend?.direction === "increase"
      ? "text-negative"
      : insights.expenseTrend?.direction === "decrease"
      ? "text-positive"
      : "text-warning";

  const budgetColor =
    insights.budgetAlert?.percentageUsed >= 90
      ? "text-negative"
      : insights.budgetAlert?.percentageUsed >= 75
      ? "text-warning"
      : "text-positive";

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          AI Insights
        </h2>

        <p className="mt-1 text-sm text-muted">
          Personalized insights generated from your financial activity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InsightCard
          icon="💰"
          title="Savings"
          value={`₹${(insights.savings?.totalSavings ?? 0).toLocaleString()}`}
          valueColor="text-positive"
        >
          <p>
            Income: ₹
            {(insights.savings?.totalIncome ?? 0).toLocaleString()}
          </p>

          <p>
            Expenses: ₹
            {(insights.savings?.totalExpense ?? 0).toLocaleString()}
          </p>
        </InsightCard>

        <InsightCard
          icon="📈"
          title="Expense Trend"
          value={insights.expenseTrend?.direction ?? "N/A"}
          valueColor={trendColor}
        >
          <p>
            {insights.expenseTrend?.direction === "increase"
              ? "Expenses increased compared to the previous period."
              : insights.expenseTrend?.direction === "decrease"
              ? "Expenses decreased compared to the previous period."
              : "No significant change detected."}
          </p>

          <p className="mt-1">
            {insights.expenseTrend?.percentage != null
              ? `${insights.expenseTrend.percentage}% change`
              : "No previous data available"}
          </p>
        </InsightCard>

        <InsightCard
          icon="💸"
          title="Top Spending Category"
          value={insights.topCategory?.category ?? "N/A"}
          valueColor="text-accent"
        >
          <p>
            ₹
            {(insights.topCategory?.amount ?? 0).toLocaleString()} spent
          </p>
        </InsightCard>

        <InsightCard
          icon="⚠️"
          title="Budget Alert"
          value={insights.budgetAlert?.category ?? "None"}
          valueColor={budgetColor}
        >
          <p>{insights.budgetAlert?.message ?? "No active budget alerts."}</p>

          <p className="mt-1">
            {insights.budgetAlert?.percentageUsed ?? 0}% of budget used
          </p>
        </InsightCard>
      </div>
    </Card>
  );
}