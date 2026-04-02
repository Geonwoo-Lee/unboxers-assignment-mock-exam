interface Props {
  children: React.ReactNode;
  direction?: "row" | "col";
  highlighted?: boolean;
  dashedTop?: boolean;
  className?: string;
}

export default function BubbleWrap({ children, direction = "row", highlighted = false, dashedTop = false, className = "" }: Props) {
  return (
    <div
      className={`
        flex items-center gap-2.5
        ${direction === "col" ? "flex-col" : ""}
        ${highlighted ? "bg-[#5784F11A]" : ""}
        ${dashedTop ? "omr-border-dashed-t" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
