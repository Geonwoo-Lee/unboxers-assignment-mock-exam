interface Props {
  value: number;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
  small?: boolean;
  locked?: boolean;
}

export default function Bubble({ value, selected, disabled, onClick, small = false, locked = false }: Props) {
  const sizeClass = small ? "w-4 h-8" : "w-5 h-11";

  const colorClass = disabled
    ? "bg-[#D1D0CD] text-[#B0AFAB] cursor-not-allowed"
    : locked
      ? selected
        ? "bg-[#090909] text-white cursor-default"
        : "bg-[#A5A4A0] text-white cursor-default"
      : selected
        ? "bg-[#090909] text-white"
        : "bg-[#A5A4A0] text-white";

  return (
    <button
      onClick={locked ? undefined : onClick}
      disabled={disabled}
      className={`flex items-center justify-center rounded-full text-xs font-bold select-none transition-colors ${sizeClass} ${colorClass} ${!disabled && !locked ? "cursor-pointer" : ""}`}
    >
      {value}
    </button>
  );
}
