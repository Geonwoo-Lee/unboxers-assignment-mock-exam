import SubjectiveSection from "../../components/omr/SubjectiveSection";
import NumPad from "../../components/exam/NumPad";
import type { SubjectiveAnswers } from "../../types/exam";
import { renderSub } from "./renderSub";

interface Props {
  main: string;
  sub: string;
  subHighlight?: boolean;
  hasGate?: boolean;
  subjectiveAnswers: SubjectiveAnswers;
  activeSubjective: number;
  focused: number | null;
  confirmed4: boolean;
  onSubjectiveFocus: (n: number) => void;
  onNumpadChange: (val: string) => void;
  onNumpadConfirm: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  canNext: boolean;
}

export default function OmrSubjectiveStep({
  main, sub, subHighlight, hasGate,
  subjectiveAnswers, activeSubjective, focused, confirmed4,
  onSubjectiveFocus, onNumpadChange, onNumpadConfirm,
  onNext, onPrev, onSkip, canNext,
}: Props) {
  const showDynamicText = hasGate && (focused !== null || confirmed4);

  return (
    <div className="w-full flex flex-col items-center gap-12 pb-[90px]">
      <div className="flex items-end gap-5">
        <div className="bg-omr-bg rounded-b-4xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)] overflow-hidden px-6 pb-[4px]">
          <SubjectiveSection
            subjectiveAnswers={subjectiveAnswers}
            activeSubjective={activeSubjective}
            focusedSubjective={focused}
            onSubjectiveFocus={onSubjectiveFocus}
            hideHeader
            noBorderTop
          />
        </div>
        <NumPad
          focusedQuestion={focused}
          value={focused ? (subjectiveAnswers[focused] ?? "") : ""}
          onChange={onNumpadChange}
          onConfirm={onNumpadConfirm}
        />
      </div>

      <div className="flex flex-col items-center gap-[4px]">
        <img src="/svg/upArrow.svg" alt="arrow" />
        <p className="text-[19px] font-bold leading-none tracking-[-0.41px] text-gs-1 text-center">
          {hasGate ? "다음으로 넘어가려면 직접해보세요" : "좋아요! 다음으로 넘어가볼까요?"}
        </p>
      </div>

      <div className="text-center space-y-[6px]">
        <p className="text-[36px] font-extrabold leading-none tracking-[0.36px] text-gs-1">
          {showDynamicText ? "아무 숫자나 입력하고" : main}
        </p>
        <p className="text-[36px] font-extrabold leading-none tracking-[0.36px] text-gs-1">
          {showDynamicText
            ? "완료 버튼을 눌러서 답안을 작성해요"
            : renderSub(sub, !!subHighlight)}
        </p>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <button
          onClick={onPrev}
          className="w-[243px] h-[52px] rounded-xl bg-white text-gs-500 font-semibold shadow-[0px_8px_16px_0px_rgba(0,0,0,0.03)] cursor-pointer"
        >
          이전으로
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={onSkip}
            className="w-[243px] h-[52px] rounded-xl bg-white text-gs-500 font-semibold shadow-[0px_8px_16px_0px_rgba(0,0,0,0.03)] cursor-pointer"
          >
            튜토리얼 건너뛰기
          </button>
          <button
            onClick={onNext}
            disabled={!canNext}
            className={`w-[243px] h-[52px] rounded-xl font-semibold transition-colors shadow-[0px_8px_16px_0px_rgba(0,0,0,0.03)]
              ${canNext
                ? "bg-gradient-to-b from-[#333333] to-[#585858] text-white cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
