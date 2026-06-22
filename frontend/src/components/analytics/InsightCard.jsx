import Card from "../ui/Card";

export default function InsightCard({
  icon,
  title,
  value,
  valueColor = "text-brand",
  children,
}) {
  return (
    <Card hover className="h-full">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-2xl">
          {icon}
        </div>

        <h3 className="text-lg font-semibold text-foreground">
          {title}
        </h3>
      </div>

      <p className={`mb-4 text-3xl font-bold ${valueColor}`}>
        {value}
      </p>

      <div className="space-y-2 text-sm leading-6 text-muted">
        {children}
      </div>
    </Card>
  );
}