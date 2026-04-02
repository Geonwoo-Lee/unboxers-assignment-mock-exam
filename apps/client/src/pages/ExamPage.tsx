import { useState, useCallback } from "react";
import { useExam, useSubmitExam } from "../hooks/useExam";
import { useAutoScale } from "../hooks/useAutoScale";
import { useExamAnswers } from "../hooks/useExamAnswers";
import { useStudentSelection } from "../hooks/useStudentSelection";
import OmrCard from "../components/omr/OmrCard";
import NumPad from "../components/exam/NumPad";
import TimerBar from "../components/exam/TimerBar";
import PreExamStep from "./exam/PreExamStep";
import ScannerVerifyStep from "./exam/ScannerVerifyStep";
import ResultStep from "./exam/ResultStep";
import type {
  StudentInfo,
  ExamInfo,
  ObjectiveAnswers,
  SubjectiveAnswers,
  SubmitResponse,
  Answer,
} from "../types/exam";

type ExamStep = "pre-exam" | "in-progress" | "scanner-verify" | "result";

// idle      → 시험 진행 중
// animating → 시간 만료, 페이드아웃 트랜지션 중 (~500ms)
// done      → 트랜지션 완료, 제출 완료 화면
type LockPhase = "idle" | "animating" | "done";

const EXAM_SECONDS = 20;
const LOCK_ANIM_MS = 500;

const MOCK_STUDENT_INFO: StudentInfo = {
  name: "권 성 민",
  school: "배방고등학교",
  grade: 1,
  studentNumber: 12,
  seatNumber: 21,
};

const DISPLAY_EXAM_INFO: ExamInfo = {
  title: "TEN-UP 모의고사",
  description: "공통수학2",
  supervisorName: "신 희 철",
  totalQuestions: 25,
  totalScore: 100,
};

function buildAnswers(
  objectiveAnswers: ObjectiveAnswers,
  subjectiveAnswers: SubjectiveAnswers
): Answer[] {
  const answers: Answer[] = [];
  for (const [numStr, options] of Object.entries(objectiveAnswers)) {
    const number = parseInt(numStr);
    for (const opt of options) {
      answers.push({ answerType: "objective", number, answer: opt });
    }
  }
  for (const [numStr, value] of Object.entries(subjectiveAnswers)) {
    const number = parseInt(numStr);
    const answer = parseInt(value);
    if (!isNaN(answer)) {
      answers.push({ answerType: "subjective", number, answer });
    }
  }
  return answers;
}

interface ContentAreaProps {
  examInfo: ExamInfo;
  studentInfo: StudentInfo;
  objectiveAnswers: ObjectiveAnswers;
  subjectiveAnswers: SubjectiveAnswers;
  focusedSubjective: number | null;
  isInProgress: boolean;
  isLocked: boolean;
  isAnimatingOut: boolean;
  selectedGrade: number | null;
  selectedSeatTens: number | null;
  selectedSeatOnes: number | null;
  onGradeChange: (g: number) => void;
  onSeatTensChange: (t: number) => void;
  onSeatOnesChange: (o: number) => void;
  onObjectiveMark: (n: number, option: number) => void;
  onSubjectiveFocus: (n: number) => void;
  numPadValue: string;
  onNumPadChange: (value: string) => void;
  onNumPadConfirm: () => void;
  footer: React.ReactNode;
}

function ExamContentArea({
  examInfo,
  studentInfo,
  objectiveAnswers,
  subjectiveAnswers,
  focusedSubjective,
  isInProgress,
  isLocked,
  isAnimatingOut,
  selectedGrade,
  selectedSeatTens,
  selectedSeatOnes,
  onGradeChange,
  onSeatTensChange,
  onSeatOnesChange,
  onObjectiveMark,
  onSubjectiveFocus,
  numPadValue,
  onNumPadChange,
  onNumPadConfirm,
  footer,
}: ContentAreaProps) {
  const { outerRef, innerRef, scale } = useAutoScale(0.8);

  // 사라지는 요소에 부드러운 페이드+슬라이드 트랜지션 적용
  const fadeOutStyle: React.CSSProperties = {
    opacity: isAnimatingOut ? 0 : 1,
    transform: isAnimatingOut ? "translateY(8px) scale(0.97)" : "none",
    transition: isAnimatingOut
      ? `opacity ${LOCK_ANIM_MS}ms cubic-bezier(0.4, 0, 1, 1),
         transform ${LOCK_ANIM_MS}ms cubic-bezier(0.4, 0, 1, 1)`
      : "none",
    pointerEvents: isAnimatingOut ? "none" : undefined,
  };

  return (
    <div className="flex flex-col flex-1 w-full min-h-0">
      <main ref={outerRef} className="flex-1 min-h-0 overflow-hidden relative">
        <div
          ref={innerRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "max-content",
            // OmrCard: 현재 auto-scale → 0.6으로 부드럽게 축소
            transform: `translate(-50%, -50%) scale(${isAnimatingOut ? 0.6 : scale})`,
            transformOrigin: "center center",
            transition: isAnimatingOut
              ? `transform ${LOCK_ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
              : "none",
          }}
        >
          <div className="flex items-stretch gap-5">
            <OmrCard
              examInfo={examInfo}
              studentInfo={studentInfo}
              objectiveAnswers={objectiveAnswers}
              subjectiveAnswers={subjectiveAnswers}
              focusedSubjective={isInProgress ? focusedSubjective : null}
              onObjectiveMark={isInProgress ? onObjectiveMark : undefined}
              onSubjectiveFocus={isInProgress ? onSubjectiveFocus : undefined}
              selectedGrade={selectedGrade}
              selectedSeatTens={selectedSeatTens}
              selectedSeatOnes={selectedSeatOnes}
              onGradeChange={isInProgress ? onGradeChange : undefined}
              onSeatTensChange={isInProgress ? onSeatTensChange : undefined}
              onSeatOnesChange={isInProgress ? onSeatOnesChange : undefined}
              locked={isLocked}
            />

            <div className="flex flex-col gap-5 min-w-0 shrink" style={fadeOutStyle}>
              <div className="max-w-61 w-full text-[13px] font-semibold leading-normal text-[#858585] space-y-3">
                <p>모든 주관식 답은 숫자와 소숫점, 슬래시(/), 마이너스(-) 기호로 이루어져 있습니다.</p>
                <p>
                  마이너스 2분의 3을 입력할 때는 "-3/2"라고 입력하면 돼요.<br />
                  소숫점은 유효숫자 개수를 맞춰서 입력합니다.
                </p>
                <p>단위가 포함된 주관식 답안은 숫자만 입력합니다.</p>
                <div>
                  <p>예시)</p>
                  <p>제3사분면 → 3</p>
                  <p>3,700만원 → 37000000</p>
                  <p>95% → 95</p>
                </div>
              </div>
              <NumPad
                focusedQuestion={isInProgress ? focusedSubjective : null}
                value={numPadValue}
                onChange={isInProgress ? onNumPadChange : () => {}}
                onConfirm={isInProgress ? onNumPadConfirm : () => {}}
              />
            </div>
          </div>
        </div>
      </main>

      <div style={fadeOutStyle}>{footer}</div>
    </div>
  );
}

export default function ExamPage() {
  const [step, setStep] = useState<ExamStep>("pre-exam");
  const [lockPhase, setLockPhase] = useState<LockPhase>("idle");
  const [submitResult, setSubmitResult] = useState<SubmitResponse | null>(null);

  const {
    objectiveAnswers,
    subjectiveAnswers,
    focusedSubjective,
    setFocusedSubjective,
    handleObjectiveMark,
    handleSubjectiveFocus,
    handleNumPadChange,
    handleNumPadConfirm,
  } = useExamAnswers();

  const {
    selectedGrade,
    selectedSeatTens,
    selectedSeatOnes,
    setSelectedGrade,
    setSelectedSeatTens,
    setSelectedSeatOnes,
    resolvedGrade,
    resolvedSeatNumber,
  } = useStudentSelection(MOCK_STUDENT_INFO.seatNumber, MOCK_STUDENT_INFO.grade);

  const { data: examInfo, isLoading, isError } = useExam();
  const { mutate: submit } = useSubmitExam((data) => {
    setTimeout(() => {
      setSubmitResult(data);
      setStep("result");
    }, 1000);
  });

  const handleGoToScanner = useCallback(() => {
    setStep("scanner-verify");
    submit({
      ...MOCK_STUDENT_INFO,
      grade: resolvedGrade,
      seatNumber: resolvedSeatNumber,
      answers: buildAnswers(objectiveAnswers, subjectiveAnswers),
    });
  }, [submit, objectiveAnswers, subjectiveAnswers, resolvedGrade, resolvedSeatNumber]);

  const handleExpire = useCallback(() => {
    setFocusedSubjective(null);
    setLockPhase("animating");
    setTimeout(() => setLockPhase("done"), LOCK_ANIM_MS);
  }, [setFocusedSubjective]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">시험 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (isError || !examInfo) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">시험 정보를 불러오지 못했습니다.</p>
      </div>
    );
  }

  if (step === "scanner-verify") {
    return (
      <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
        <ScannerVerifyStep
          examInfo={DISPLAY_EXAM_INFO}
          studentInfo={MOCK_STUDENT_INFO}
          objectiveAnswers={objectiveAnswers}
          subjectiveAnswers={subjectiveAnswers}
        />
      </div>
    );
  }

  if (step === "result") {
    return (
      <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
        {submitResult && (
          <ResultStep
            result={submitResult}
            description={DISPLAY_EXAM_INFO.description}
            onRestart={() => {
              setStep("pre-exam");
              setLockPhase("idle");
            }}
          />
        )}
      </div>
    );
  }

  const isLocked = lockPhase !== "idle";
  const isAnimatingOut = lockPhase === "animating";
  const isLockDone = lockPhase === "done";
  const isInProgress = step === "in-progress";

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <div className="flex justify-end px-6 py-3 shrink-0">
        <button
          onClick={handleGoToScanner}
          className="px-4 py-3 rounded-2xl bg-white flex items-center justify-center gap-1 shadow-soft border border-gray-100 cursor-pointer"
        >
          <img src="/svg/exitIcon.svg" className="w-4 h-4" alt="exit" />
          <span className="btn-label text-gs-1">종료하기</span>
        </button>
      </div>

      {isLockDone ? (
        <div
          className="flex flex-col flex-1 w-full min-h-0 items-center justify-center overflow-auto py-10"
          style={{
            animation: `lockDoneFadeIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both`,
          }}
        >
          <style>{`
            @keyframes lockDoneFadeIn {
              from { opacity: 0; transform: translateY(14px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          <div className="flex flex-col items-center gap-12">
            <div style={{ zoom: 0.6 }}>
              <OmrCard
                examInfo={DISPLAY_EXAM_INFO}
                studentInfo={MOCK_STUDENT_INFO}
                objectiveAnswers={objectiveAnswers}
                subjectiveAnswers={subjectiveAnswers}
                locked
              />
            </div>
            <div className="flex flex-col items-center gap-12">
              <div className="text-center space-y-1.5">
                <p className="heading-xl text-[#090909]">
                  답안 제출 완료!
                </p>
                <p className="heading-xl text-[#090909]">
                  고생 많았어요. 결과를 확인해볼까요?
                </p>
              </div>
              <button
                onClick={handleGoToScanner}
                className="px-12 h-13 rounded-2xl bg-gradient-dark text-white btn-label cursor-pointer shadow-medium"
              >
                결과 보기
              </button>
            </div>
          </div>
        </div>
      ) : (
        <ExamContentArea
          examInfo={DISPLAY_EXAM_INFO}
          studentInfo={MOCK_STUDENT_INFO}
          objectiveAnswers={objectiveAnswers}
          subjectiveAnswers={subjectiveAnswers}
          focusedSubjective={focusedSubjective}
          isInProgress={isInProgress}
          isLocked={isLocked}
          isAnimatingOut={isAnimatingOut}
          selectedGrade={selectedGrade}
          selectedSeatTens={selectedSeatTens}
          selectedSeatOnes={selectedSeatOnes}
          onGradeChange={setSelectedGrade}
          onSeatTensChange={setSelectedSeatTens}
          onSeatOnesChange={setSelectedSeatOnes}
          onObjectiveMark={handleObjectiveMark}
          onSubjectiveFocus={handleSubjectiveFocus}
          numPadValue={
            isInProgress && focusedSubjective !== null
              ? (subjectiveAnswers[focusedSubjective] ?? "")
              : ""
          }
          onNumPadChange={handleNumPadChange}
          onNumPadConfirm={handleNumPadConfirm}
          footer={
            <>
              {step === "pre-exam" && (
                <PreExamStep onStart={() => setStep("in-progress")} />
              )}
              {step === "in-progress" && (
                <TimerBar
                  totalSeconds={EXAM_SECONDS}
                  onExpire={handleExpire}
                />
              )}
            </>
          }
        />
      )}
    </div>
  );
}
