export default function FormField({
  id,
  label,
  type = "text",
  placeholder,
  className = "",
  ...props
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-subtle transition outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        {...props}
      />
    </div>
  );
}
