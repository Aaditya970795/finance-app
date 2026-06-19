import InsightCard from "./InsightCard";

export default function AIInsights({ insights }) {
  if (!insights) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        AI Insights
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <InsightCard
          icon="💰"
          title="Savings"
          value={`₹${insights.savings.totalSavings.toLocaleString()}`}
          valueColor="text-green-600"
        >
          <p>
            Income: ₹
            {insights.savings.totalIncome.toLocaleString()}
          </p>

          <p>
            Expense: ₹
            {insights.savings.totalExpense.toLocaleString()}
          </p>
        </InsightCard>

        <InsightCard
          icon="📈"
          title="Expense Trend"
          value={`${insights.expenseTrend.direction}`}
          valueColor={
            insights.expenseTrend.direction === "increase"
                ? "text-red-600"
                : "text-green-600"
        }
        >
          <p>
            {insights.expenseTrend.direction === "increase"
              ? "Expenses increased"
              : insights.expenseTrend.direction === "decrease"
              ? "Expenses decreased"
              : "No change"}
          </p>

          <p>
            {insights.expenseTrend.percentage !== null
              ? `${insights.expenseTrend.percentage}%`
              : "No previous data"}
          </p>
        </InsightCard>

        <InsightCard
          icon="💸"
          title="Top Category"
          value={insights.topCategory.category}
          valueColor="text-purple-600"
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
                ? "text-red-600"
                : insights.budgetAlert.percentageUsed >= 75
                ? "text-yellow-600"
                : "text-green-600"
        }
        >
          <p>{insights.budgetAlert.message}</p>
        </InsightCard>

      </div>
    </div>
  );
}