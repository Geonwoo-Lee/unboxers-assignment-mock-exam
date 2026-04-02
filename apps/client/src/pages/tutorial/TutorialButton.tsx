interface Props {
  variant: "primary" | "secondary" | "prev";
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function TutorialButton({ variant, onClick, disabled, children }: Props) {
  const base = "w-[243px] h-13 rounded-xl btn-label shadow-soft transition-colors cursor-pointer";

  if (variant === "prev") {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${base} bg-white text-gs-1 flex items-center justify-center`}
      >
        <img src="/svg/leftArrow.svg" alt="" />
        {children}
      </button>
    );
  }

  if (variant === "secondary") {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${base} bg-white text-gs-1`}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${
        disabled
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-gradient-dark text-white"
      }`}
    >
      {children}
    </button>
  );
}
