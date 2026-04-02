interface Props {
  focusedQuestion: number | null;
  value: string;
  onChange: (value: string) => void;
  onConfirm: () => void;
  locked?: boolean;
}

const BUTTONS = [
  [".", "/", "-"],
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["0", "⌫"],
];

export default function NumPad({ focusedQuestion, value, onChange, onConfirm, locked = false }: Props) {
  const handlePress = (btn: string) => {
    if (locked) return;
    if (btn === "⌫") {
      onChange(value.slice(0, -1));
    } else {
      onChange(value + btn);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-61 h-full shrink-0">
      <div className={`w-full h-13 rounded-xl bg-white shadow-soft px-4 flex items-center justify-center transition-colors ${!locked && focusedQuestion ? "border-2 border-inbrain-lightblue" : ""}`}>
        <span className={`text-base font-semibold ${!locked && focusedQuestion && value ? "text-gs-1" : "text-gs-500"}`}>
          {locked
            ? "답안이 제출되었습니다"
            : focusedQuestion
              ? value || `${focusedQuestion}번 답안을 입력하세요`
              : "입력할 곳을 터치해주세요"}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {BUTTONS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-3">
            {row.map((btn) => (
              <button
                key={btn}
                onClick={() => handlePress(btn)}
                disabled={locked || !focusedQuestion}
                className={`
                  h-13 rounded-xl bg-white text-sm font-bold shadow-soft
                  transition-colors duration-100
                  ${btn === "0" ? "w-37.5" : "w-[73px]"}
                  ${locked
                    ? "text-gs-400 cursor-default"
                    : focusedQuestion
                      ? "text-gs-1 active:bg-gray-100 cursor-pointer"
                      : "text-gs-400 cursor-not-allowed"
                  }
                `}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={locked ? undefined : onConfirm}
        disabled={locked || !focusedQuestion || !value}
        className={`
          w-full h-13 rounded-2xl text-sm font-bold transition-colors shadow-soft
          ${!locked && focusedQuestion && value
            ? "bg-gradient-to-b from-[#364F8E] to-[#5784F1] text-white cursor-pointer"
            : "bg-[#FAFAFA] text-gs-500 cursor-not-allowed"
          }
        `}
      >
        완료
      </button>
    </div>
  );
}
