import SubjectiveSection from "../../components/omr/SubjectiveSection";
import NumPad from "../../components/exam/NumPad";
import type { SubjectiveAnswers } from "../../types/exam";
import TutorialButton from "./TutorialButton";
import { renderSub } from "./renderSub";
import { useAutoScale } from "../../hooks/useAutoScale";

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
  const { outerRef, innerRef, scale } = useAutoScale();

  return (
    <div className="w-full flex-1 min-h-0 flex flex-col items-center">
      <div ref={outerRef} className="w-full h-[52vh] shrink-0 relative">
        <div
          ref={innerRef}
          className="absolute top-1/2 left-1/2 flex items-end gap-5"
          style={{ transform: `translate(-50%, -50%) scale(${scale})`, width: "max-content" }}
        >
          <div className="bg-omr-bg rounded-b-4xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)] overflow-hidden px-6 pb-1">
            <SubjectiveSection
              subjectiveAnswers={subjectiveAnswers}
              activeSubjective={activeSubjective}
              focusedSubjective={focused}
              onSubjectiveFocus={onSubjectiveFocus}
              hideHeader
              noBorderTop
              showLeftBorder
            />
          </div>
          <NumPad
            focusedQuestion={focused}
            value={focused ? (subjectiveAnswers[focused] ?? "") : ""}
            onChange={onNumpadChange}
            onConfirm={onNumpadConfirm}
          />
        </div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-1">
          <img src="/svg/upArrow.svg" alt="arrow" />
          <p className="text-[19px] font-bold leading-none tracking-[-0.41px] text-gs-1 text-center">
            {hasGate ? "다음으로 넘어가려면 직접해보세요" : "좋아요! 다음으로 넘어가볼까요?"}
          </p>
        </div>

        <div className="text-center space-y-1.5">
          <p className="heading-xl text-gs-1">
            {showDynamicText ? "아무 숫자나 입력하고" : main}
          </p>
          <p className="heading-xl text-gs-1">
            {showDynamicText
              ? "완료 버튼을 눌러서 답안을 작성해요"
              : renderSub(sub, !!subHighlight)}
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-6 pb-10 shrink-0 flex items-center justify-between">
        <TutorialButton variant="prev" onClick={onPrev}>이전으로</TutorialButton>
        <div className="flex items-center gap-3">
          <TutorialButton variant="secondary" onClick={onSkip}>튜토리얼 건너뛰기</TutorialButton>
          <TutorialButton variant="primary" onClick={onNext} disabled={!canNext}>다음</TutorialButton>
        </div>
      </div>
    </div>
  );
}
