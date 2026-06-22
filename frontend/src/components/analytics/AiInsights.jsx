import Card from "../ui/Card";
import InsightCard from "./InsightCard";

export default function AIInsights({ insights }) {
  if (!insights) {
    return (
      <Card>
        <div className="flex h-40 items-center justify-center">
          <p className="text-sm text-subtle">
            No AI insights available.
          </p>
        </div>
      </Card>
    );
  }

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
          value={`₹${insights.savings.totalSavings.toLocaleString()}`}
          valueColor="text-positive"
        >
          <p>
            Income: ₹
            {insights.savings.totalIncome.toLocaleString()}
          </p>

          <p>
            Expenses: ₹
            {insights.savings.totalExpense.toLocaleString()}
          </p>
        </InsightCard>

        <InsightCard
          icon="📈"
          title="Expense Trend"
          value={insights.expenseTrend.direction}
          valueColor={
            insights.expenseTrend.direction === "increase"
              ? "text-negative"
              : insights.expenseTrend.direction === "decrease"
              ? "text-positive"
              : "text-warning"
          }
        >
          <p>
            {insights.expenseTrend.direction === "increase"
              ? "Expenses increased compared to the previous period."
              : insights.expenseTrend.direction === "decrease"
              ? "Expenses decreased compared to the previous period."
              : "No significant change detected."}
          </p>

          <p className="mt-1">
            {insights.expenseTrend.percentage !== null
              ? `${insights.expenseTrend.percentage}% change`
              : "No previous data available"}
          </p>
        </InsightCard>

        <InsightCard
          icon="💸"
          title="Top Spending Category"
          value={insights.topCategory.category}
          valueColor="text-accent"
        >
          <p>
            ₹
            {insights.topCategory.amount.toLocaleString()} spent
          </p>
        </InsightCard>

        <InsightCard
          icon="⚠️"
          title="Budget Alert"
          value={insights.budgetAlert.category}
          valueColor={
            insights.budgetAlert.percentageUsed >= 90
              ? "text-negative"
              : insights.budgetAlert.percentageUsed >= 75
              ? "text-warning"
              : "text-positive"
          }
        >
          <p>{insights.budgetAlert.message}</p>

          <p className="mt-1">
            {insights.budgetAlert.percentageUsed}% of budget used
          </p>
        </InsightCard>
      </div>
    </Card>
  );
}