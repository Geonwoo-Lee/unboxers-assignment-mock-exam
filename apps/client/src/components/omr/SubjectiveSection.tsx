import type { SubjectiveAnswers } from "../../types/exam";

export interface SubjectiveSectionProps {
  subjectiveAnswers: SubjectiveAnswers;
  activeSubjective: number;
  focusedSubjective: number | null;
  onSubjectiveFocus: (questionNumber: number) => void;
  hideHeader?: boolean;
  noBorderTop?: boolean;
  showLeftBorder?: boolean;
  locked?: boolean;
  flexible?: boolean;
  footerText?: string;
  footerNumberSpacer?: boolean;
}

export default function SubjectiveSection({
  subjectiveAnswers,
  activeSubjective,
  focusedSubjective,
  onSubjectiveFocus,
  hideHeader = false,
  noBorderTop = false,
  showLeftBorder = false,
  locked = false,
  flexible = false,
  footerText = "주관식 입력 부분입니다.",
  footerNumberSpacer = false,
}: SubjectiveSectionProps) {
  return (
    <div className={`flex flex-col min-w-90 ${noBorderTop ? "" : "omr-border-t"}`}>
      <div className={`flex flex-col flex-1 omr-border-r omr-border-b ${showLeftBorder ? "omr-border-l" : ""}`}>
        {!hideHeader && (
          <div className="text-2xl font-semibold text-inbrain-blue text-center omr-header-h flex items-center justify-center omr-border-b">
            주 관 식 답 안
          </div>
        )}
        <div className="flex flex-col flex-1 min-h-0">
          {Array.from({ length: 12 }, (_, i) => {
            const number = i + 1;
            const disabled = number > activeSubjective;
            const focused = !locked && focusedSubjective === number;
            const value = subjectiveAnswers[number] ?? "";
            return (
              <div
                key={number}
                className={`flex items-center ${flexible ? "flex-1" : "h-[47px] shrink-0"} ${number < 12 ? "omr-border-b" : ""} ${disabled ? "opacity-40" : ""} ${focused ? "bg-[#5784F133]" : ""}`}
              >
                <div className={`flex items-center justify-center w-7 h-full shrink-0 omr-border-r text-sm font-semibold text-inbrain-blue tabular-nums ${focused ? "" : "bg-[#5784F133]"}`}>
                  {number}
                </div>
                <button
                  onClick={() => !disabled && !locked && onSubjectiveFocus(number)}
                  disabled={disabled || locked}
                  className={`flex-1 h-full text-center px-2 text-17 font-semibold transition-colors ${value ? "text-gray-800" : "text-gray-400"} ${disabled ? "cursor-not-allowed" : locked ? "cursor-default" : "cursor-pointer"}`}
                >
                  {value || (focused ? "답을 입력해주세요" : (!disabled && !locked ? "터치해서 주관식 답안 입력" : ""))}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className={`h-9 flex items-center ${footerNumberSpacer ? "" : "justify-center"}`}>
        {footerNumberSpacer && <div className="w-7 shrink-0" />}
        <span className={`${footerNumberSpacer ? "flex-1 text-center" : ""} text-[17px] font-semibold leading-none text-[#858585]`}>
          {footerText}
        </span>
      </div>
    </div>
  );
}
