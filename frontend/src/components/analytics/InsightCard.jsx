import { Card } from "../ui";

export default function InsightCard({
  icon,
  title,
  value,
  valueColor = "text-brand",
  children,
}) {
  return (
    <Card
      hover
      className="flex h-full min-h-[220px] flex-col border border-border"
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-2xl">
          {icon}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {title}
          </h3>

          <p className="text-sm text-subtle">
            AI Generated Insight
          </p>
        </div>
      </div>

      {/* Main Value */}
      <div className="mb-5">
        <p
          className={`break-words text-3xl font-bold tracking-tight ${valueColor}`}
        >
          {value}
        </p>
      </div>

      {/* Details */}
      <div className="mt-auto space-y-2 border-t border-border pt-4 text-sm leading-6 text-muted">
        {children}
      </div>
    </Card>
  );
}