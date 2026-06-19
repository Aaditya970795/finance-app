export default function InsightCard({
  icon,
  title,
  value,
  valueColor = "text-blue-600",
  children,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl">{icon}</span>

        <h3 className="text-lg font-semibold text-gray-900">
          {title}
        </h3>
      </div>

      <p className={`text-3xl font-bold mb-4 ${valueColor}`}>
        {value}
      </p>

      <div className="text-gray-500 text-sm leading-6">
        {children}
      </div>
    </div>
  );
}