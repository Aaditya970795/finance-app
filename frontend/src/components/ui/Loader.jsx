export default function Loader({ variant = "default" }) {
    switch (variant) {
      case "dashboard":
        return (
          <div className="space-y-6 animate-pulse">
            {/* Header */}
            <div>
              <div className="h-9 w-60 rounded-lg bg-surface-raised" />
              <div className="mt-2 h-4 w-80 rounded bg-surface-raised" />
            </div>
  
            {/* Stat Cards */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-36 rounded-xl bg-surface-raised"
                />
              ))}
            </div>
  
            {/* Two Charts */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="h-96 rounded-xl bg-surface-raised" />
              <div className="h-96 rounded-xl bg-surface-raised" />
            </div>
  
            {/* Monthly Chart */}
            <div className="h-96 rounded-xl bg-surface-raised" />
  
            {/* Recent Transactions */}
            <div className="h-80 rounded-xl bg-surface-raised" />
          </div>
        );
        
      case "analytics":
        return (
            <div className="space-y-6 animate-pulse">
            {/* Header */}
            <div>
                <div className="h-9 w-60 rounded-lg bg-surface-raised" />
                <div className="mt-2 h-4 w-96 rounded bg-surface-raised" />
            </div>

            {/* Expense Trend */}
            <div className="h-80 rounded-xl bg-surface-raised" />

            {/* Income vs Expense */}
            <div className="h-80 rounded-xl bg-surface-raised" />

            {/* Pie Chart + Budget Utilization */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="h-96 rounded-xl bg-surface-raised" />
                <div className="h-96 rounded-xl bg-surface-raised" />
            </div>

            {/* AI Insights */}
            <div className="h-72 rounded-xl bg-surface-raised" />
            </div>
        );
        
        case "budget":
        return (
            <div className="space-y-6 animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                <div className="h-9 w-48 rounded-lg bg-surface-raised" />
                <div className="mt-2 h-4 w-72 rounded bg-surface-raised" />
                </div>

                <div className="h-10 w-36 rounded-lg bg-surface-raised" />
            </div>

            {/* Budget Cards */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                    key={item}
                    className="h-60 rounded-xl bg-surface-raised"
                />
                ))}
            </div>
            </div>
        );

        case "transactions":
        return (
            <div className="space-y-6 animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                <div className="h-9 w-56 rounded-lg bg-surface-raised" />
                <div className="mt-2 h-4 w-80 rounded bg-surface-raised" />
                </div>

                <div className="h-10 w-40 rounded-lg bg-surface-raised" />
            </div>

            {/* Transaction Form (optional) */}
            <div className="h-72 rounded-xl bg-surface-raised" />

            {/* Transaction Table */}
            <div className="rounded-xl bg-surface-raised p-6">
                <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div
                    key={item}
                    className="h-12 rounded-lg bg-surface"
                    />
                ))}
                </div>
            </div>
            </div>
        );
      default:
        return (
          <div className="animate-pulse rounded-xl bg-surface-raised h-40" />
        );
    }
  }