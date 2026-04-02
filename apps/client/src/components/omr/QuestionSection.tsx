import ObjectiveSection from "./ObjectiveSection";
import type { ObjectiveAnswers, SubjectiveAnswers } from "../../types/exam";

interface Props {
  objectiveAnswers: ObjectiveAnswers;
  subjectiveAnswers: SubjectiveAnswers;
  activeObjective: number;
  activeSubjective: number;
  focusedSubjective: number | null;
  onObjectiveMark: (questionNumber: number, option: number) => void;
  onSubjectiveFocus: (questionNumber: number) => void;
}

export default function QuestionSection({
  objectiveAnswers,
  subjectiveAnswers,
  activeObjective,
  activeSubjective,
  focusedSubjective,
  onObjectiveMark,
  onSubjectiveFocus,
}: Props) {
  return (
    <div className="flex">
      <ObjectiveSection
        objectiveAnswers={objectiveAnswers}
        activeObjective={activeObjective}
        onObjectiveMark={onObjectiveMark}
      />

      <div className="flex flex-col min-w-90 omr-border-t">
        <div className="flex flex-col flex-1 omr-border-r omr-border-b">
          <div className="text-2xl font-semibold text-inbrain-blue text-center omr-header-h flex items-center justify-center omr-border-b">
            주 관 식 답 안
          </div>
          <div className="flex flex-col flex-1 min-h-0">
            {Array.from({ length: 12 }, (_, i) => {
              const number = i + 1;
              const disabled = number > activeSubjective;
              const focused = focusedSubjective === number;
              const value = subjectiveAnswers[number] ?? "";
              return (
                <div
                  key={number}
                  className={`flex items-center flex-1 ${number < 12 ? "omr-border-b" : ""} ${disabled ? "opacity-40" : ""} ${focused ? "bg-[#5784F133]" : ""}`}
                >
                  <div className={`flex items-center justify-center w-7 h-full shrink-0 omr-border-r text-sm font-semibold text-inbrain-blue ${focused ? "" : "bg-[#5784F133]"}`}>
                    {number}
                  </div>
                  <button
                    onClick={() => !disabled && onSubjectiveFocus(number)}
                    disabled={disabled}
                    className={`flex-1 h-full text-center px-2 text-17 font-semibold transition-colors ${value ? "text-gray-800" : "text-gray-400"} ${disabled ? "cursor-not-allowed" : ""}`}
                  >
                    {value || (focused ? "답을 입력해주세요" : (!disabled ? "터치해서 주관식 답안 입력" : ""))}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-auto h-9 flex items-center justify-center">
          <span className="text-xs font-semibold text-gs-1">선 아래부분은 절대 칠하지 말 것.</span>
        </div>
      </div>
    </div>
  );
}
