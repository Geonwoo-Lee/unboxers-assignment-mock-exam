interface Props {
  focusedQuestion: number | null;
  value: string;
  onChange: (value: string) => void;
  onConfirm: () => void;
}

const BUTTONS = [
  [".", "/", "-"],
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["0", "⌫"],
];

export default function NumPad({ focusedQuestion, value, onChange, onConfirm }: Props) {
  const handlePress = (btn: string) => {
    if (btn === "⌫") {
      onChange(value.slice(0, -1));
    } else {
      onChange(value + btn);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-3 w-[244px] h-full shrink-0">
      {/* 입력 표시 */}
      <div className={`w-full h-[52px] rounded-xl bg-white shadow-[0px_8px_16px_0px_rgba(0,0,0,0.03)] px-4 flex items-center justify-center transition-colors ${focusedQuestion ? "border-2 border-inbrain-lightblue" : ""}`}>
        <span className={`text-base font-semibold ${focusedQuestion && value ? "text-gs-1" : "text-gs-500"}`}>
          {focusedQuestion
            ? value || `${focusedQuestion}번 답안을 입력하세요`
            : "입력할 곳을 터치해주세요"}
        </span>
      </div>

      {/* 키패드 */}
      <div className="flex flex-col gap-3">
        {BUTTONS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-3">
            {row.map((btn) => (
              <button
                key={btn}
                onClick={() => handlePress(btn)}
                disabled={!focusedQuestion}
                className={`
                  h-[52px] rounded-xl bg-white text-sm font-bold shadow-[0px_8px_16px_0px_rgba(0,0,0,0.03)]
                  transition-colors duration-100
                  ${btn === "0" ? "w-[150px]" : "w-[73px]"}
                  ${focusedQuestion
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

      {/* 완료 버튼 */}
      <button
        onClick={onConfirm}
        disabled={!focusedQuestion || !value}
        className={`
          w-full h-[52px] rounded-2xl text-sm font-bold transition-colors shadow-[0px_8px_16px_0px_rgba(0,0,0,0.03)]
          ${focusedQuestion && value
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
