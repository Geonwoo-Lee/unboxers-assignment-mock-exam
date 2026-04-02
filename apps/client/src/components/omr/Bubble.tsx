interface Props {
  value: number;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
  small?: boolean;
}

export default function Bubble({ value, selected, disabled, onClick, small = false }: Props) {
  const sizeClass = small ? "w-4 h-8" : "w-5 h-11";
  const colorClass = disabled
    ? "bg-[#D1D0CD] text-[#B0AFAB] cursor-not-allowed"
    : selected
      ? "bg-[#090909] text-white"
      : "bg-[#A5A4A0] text-white";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer flex items-center justify-center rounded-full text-xs font-bold select-none transition-colors ${sizeClass} ${colorClass}`}
    >
      {value}
    </button>
  );
}
