interface SectionLabelProps {
  number: string;
  label: string;
  className?: string;
}

export default function SectionLabel({
  number,
  label,
  className = "",
}: SectionLabelProps) {
  return (
    <div
      className={`inline-flex items-baseline gap-3 font-mono text-xs tracking-wider uppercase ${className}`}
    >
      <span className="text-fd-orange">{number}</span>
      <span className="text-fd-gray/60">{label}</span>
    </div>
  );
}
