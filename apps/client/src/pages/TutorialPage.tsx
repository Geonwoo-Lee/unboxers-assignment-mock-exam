import { useState } from "react";
import type { ObjectiveAnswers, SubjectiveAnswers, StudentInfo } from "../types/exam";
import { useFunnel } from "../hooks/useFunnel";
import IntroStep from "./tutorial/IntroStep";
import OverviewStep from "./tutorial/OverviewStep";
import OmrObjectiveStep from "./tutorial/OmrObjectiveStep";
import OmrSubjectiveStep from "./tutorial/OmrSubjectiveStep";
import TimerStep from "./tutorial/TimerStep";

interface Props {
  onDone: () => void;
}

const STUDENT_INFO: StudentInfo = {
  name: "권성민",
  school: "배방고등학교",
  grade: 1,
  studentNumber: 12,
  seatNumber: 21,
};

const TUTORIAL_STEPS = [
  "intro",
  "overview",
  "omr-mark",
  "omr-unmark",
  "omr-multi",
  "subjective-input",
  "subjective-edit",
  "timer",
] as const;
type TutorialStep = typeof TUTORIAL_STEPS[number];

export default function TutorialPage({ onDone }: Props) {
  const [Funnel, setStep, currentStep] = useFunnel<TutorialStep>([...TUTORIAL_STEPS], "intro");
  const [objAnswers, setObjAnswers] = useState<ObjectiveAnswers>({});
  const [subjAnswers, setSubjAnswers] = useState<SubjectiveAnswers>({});
  const [focused, setFocused] = useState<number | null>(null);

  /* ── 게이트 조건 ── */
  const marked15_3 = (objAnswers[15] ?? []).includes(3);
  const unmarked15_3 = !(objAnswers[15] ?? []).includes(3);
  const confirmed4 = !!(subjAnswers[4]) && focused !== 4;

  const canNext = (): boolean => {
    if (currentStep === "omr-mark") return marked15_3;
    if (currentStep === "omr-unmark") return unmarked15_3;
    if (currentStep === "subjective-input") return confirmed4;
    return true;
  };

  /* ── 네비게이션 ── */
  const goNext = () => {
    const idx = TUTORIAL_STEPS.indexOf(currentStep);
    if (idx === TUTORIAL_STEPS.length - 1) { onDone(); return; }
    if (currentStep === "omr-unmark") {
      setObjAnswers(prev => ({ ...prev, 10: [2, 5], 20: [1, 4] }));
    }
    setStep(TUTORIAL_STEPS[idx + 1]);
  };

  const goPrev = () => {
    const idx = TUTORIAL_STEPS.indexOf(currentStep);
    if (idx > 0) setStep(TUTORIAL_STEPS[idx - 1]);
  };

  /* ── OMR 핸들러 ── */
  const handleObjMark = (n: number, opt: number) => {
    setObjAnswers(prev => {
      const cur = prev[n] ?? [];
      const next = cur.includes(opt) ? cur.filter(v => v !== opt) : [...cur, opt];
      return { ...prev, [n]: next };
    });
  };

  const handleSubjFocus = (n: number) => setFocused(n);
  const handleNumpadChange = (val: string) => {
    if (focused === null) return;
    setSubjAnswers(prev => ({ ...prev, [focused]: val }));
  };
  const handleNumpadConfirm = () => setFocused(null);

  /* ── 활성 범위 ── */
  const omrActiveSteps: TutorialStep[] = ["omr-mark", "omr-unmark", "omr-multi", "subjective-input", "subjective-edit", "timer"];
  const subjActiveSteps: TutorialStep[] = ["subjective-input", "subjective-edit", "timer"];
  const activeObj = omrActiveSteps.includes(currentStep) ? 30 : 0;
  const activeSubj = subjActiveSteps.includes(currentStep) ? 12 : 0;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* 헤더 */}
      <header className="relative flex items-center justify-between px-6 h-[65px] bg-white border-b border-gray-200 shrink-0">
        <img src="/svg/logo.svg" className="w-8 h-8 shrink-0" alt="logo" />
        <span className="absolute left-1/2 -translate-x-1/2 text-[20px] font-bold leading-none tracking-[-0.41px] text-[#333333]">
          모의고사 모드
        </span>
        <div className="flex items-center gap-4">
          <button className="h-[44px] rounded-[10px] bg-gs-6 flex items-center justify-between px-[16px] py-[10px] gap-[10px] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.03)] cursor-pointer">
            <span className="text-[17px] font-bold leading-[24px] tracking-[-0.41px] text-gs-1">
              {STUDENT_INFO.name} 학생
            </span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="#090909" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={onDone}
            className="h-[44px] rounded-[10px] px-[16px] py-[10px] bg-gs-6 shadow-[0px_8px_16px_0px_rgba(0,0,0,0.03)] flex items-center justify-center text-[17px] font-bold leading-[24px] tracking-[-0.41px] text-gs-1 cursor-pointer"
          >
            홈으로
          </button>
        </div>
      </header>

      {/* 메인 */}
      <main className="flex-1 flex flex-col items-center overflow-auto">
        <Funnel>
          <Funnel.Step name="intro">
            <IntroStep onNext={goNext} onSkip={onDone} />
          </Funnel.Step>

          <Funnel.Step name="overview">
            <OverviewStep onNext={goNext} onPrev={goPrev} />
          </Funnel.Step>

          <Funnel.Step name="omr-mark">
            <OmrObjectiveStep
              main="객관식 답안은 화면을 터치해서 마킹해요"
              sub="15번 문제에 3번으로 답안을 작성해보세요"
              subHighlight
              objectiveAnswers={objAnswers}
              activeObjective={activeObj}
              onObjectiveMark={handleObjMark}
              onNext={goNext}
              onPrev={goPrev}
              onSkip={onDone}
              canNext={canNext()}
            />
          </Funnel.Step>

          <Funnel.Step name="omr-unmark">
            <OmrObjectiveStep
              main="터치한 곳을 한 번 더 터치해서 지울 수 있어요"
              sub="15번 문제에 3번 답안을 다시 작성해보세요"
              subHighlight
              objectiveAnswers={objAnswers}
              activeObjective={activeObj}
              onObjectiveMark={handleObjMark}
              onNext={goNext}
              onPrev={goPrev}
              onSkip={onDone}
              canNext={canNext()}
            />
          </Funnel.Step>

          <Funnel.Step name="omr-multi">
            <OmrObjectiveStep
              main="2개 이상의 답안을 골라야 하는 문제에서는"
              sub="두 답안 모두 마킹해야해요"
              objectiveAnswers={objAnswers}
              activeObjective={activeObj}
              onObjectiveMark={handleObjMark}
              onNext={goNext}
              onPrev={goPrev}
              onSkip={onDone}
              canNext={canNext()}
            />
          </Funnel.Step>

          <Funnel.Step name="subjective-input">
            <OmrSubjectiveStep
              main="주관식 답안을 입력하려면 입력할 곳을 터치해요"
              sub="4번 문제의 답안을 입력해볼까요?"
              subHighlight
              hasGate
              subjectiveAnswers={subjAnswers}
              activeSubjective={activeSubj}
              focused={focused}
              confirmed4={confirmed4}
              onSubjectiveFocus={handleSubjFocus}
              onNumpadChange={handleNumpadChange}
              onNumpadConfirm={handleNumpadConfirm}
              onNext={goNext}
              onPrev={goPrev}
              onSkip={onDone}
              canNext={canNext()}
            />
          </Funnel.Step>

          <Funnel.Step name="subjective-edit">
            <OmrSubjectiveStep
              main="입력한 답안을 수정하려면"
              sub="해당 문제를 다시 한 번 터치해요"
              subHighlight
              subjectiveAnswers={subjAnswers}
              activeSubjective={activeSubj}
              focused={focused}
              confirmed4={confirmed4}
              onSubjectiveFocus={handleSubjFocus}
              onNumpadChange={handleNumpadChange}
              onNumpadConfirm={handleNumpadConfirm}
              onNext={goNext}
              onPrev={goPrev}
              onSkip={onDone}
              canNext={canNext()}
            />
          </Funnel.Step>

          <Funnel.Step name="timer">
            <TimerStep onNext={goNext} onPrev={goPrev} />
          </Funnel.Step>
        </Funnel>
      </main>
    </div>
  );
}
