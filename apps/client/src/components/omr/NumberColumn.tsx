interface Props {
  numbers: number[];
  itemWidth?: number;
  itemHeight?: number;
  flexible?: boolean;
}

export default function NumberColumn({ numbers, itemWidth = 28, itemHeight = 44, flexible = false }: Props) {
  return (
    <div className={`flex flex-col omr-border-r bg-[#5784F133] ${flexible ? "" : "py-3 gap-3"}`}>
      {numbers.map((n) => (
        <div
          key={n}
          className={`flex items-center font-semibold text-inbrain-blue text-sm justify-center ${flexible ? "flex-1" : ""}`}
          style={{ width: itemWidth, height: flexible ? undefined : itemHeight }}
        >
          {n}
        </div>
      ))}
    </div>
  );
}
