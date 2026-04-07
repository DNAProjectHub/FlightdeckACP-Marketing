interface FigLabelProps {
  number: string;
  className?: string;
}

export default function FigLabel({ number, className = "" }: FigLabelProps) {
  return (
    <span
      className={`font-mono text-[10px] tracking-[0.2em] uppercase text-fd-gray/40 ${className}`}
    >
      FIG {number}
    </span>
  );
}
