import { useState, useCallback } from "react";
import OmrCard from "../components/omr/OmrCard";
import NumPad from "../components/exam/NumPad";
import TimerBar from "../components/exam/TimerBar";
import CountdownOverlay from "../components/exam/CountdownOverlay";
import type {
  ExamInfo,
  StudentInfo,
  ObjectiveAnswers,
  SubjectiveAnswers,
  SubmitResponse,
} from "../types/exam";

// TODO: API 연동 후 제거
const MOCK_EXAM_INFO: ExamInfo = {
  title: "텐업 모의고사",
  description: "공통수학2",
  supervisorName: "신희철",
  totalQuestions: 25,
  totalScore: 100,
};

const MOCK_STUDENT_INFO: StudentInfo = {
  name: "홍길동",
  school: "베이스고등학교",
  grade: 1,
  studentNumber: 12,
  seatNumber: 3,
};

const EXAM_SECONDS = 50 * 60;

interface Props {
  onDone: (result: SubmitResponse) => void;
}

export default function ExamPage({ onDone: _onDone }: Props) {
  const [started, setStarted] = useState(false);
  const [objectiveAnswers, setObjectiveAnswers] = useState<ObjectiveAnswers>({});
  const [subjectiveAnswers, setSubjectiveAnswers] = useState<SubjectiveAnswers>({});
  const [focusedSubjective, setFocusedSubjective] = useState<number | null>(null);

  const handleObjectiveMark = (questionNumber: number, option: number) => {
    setObjectiveAnswers((prev) => {
      const current = prev[questionNumber] ?? [];
      const next = current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option];
      return { ...prev, [questionNumber]: next };
    });
  };

  const handleSubjectiveFocus = (number: number) => {
    setFocusedSubjective(number);
  };

  const handleNumPadChange = (value: string) => {
    if (focusedSubjective === null) return;
    setSubjectiveAnswers((prev) => ({ ...prev, [focusedSubjective]: value }));
  };

  const handleNumPadConfirm = () => {
    setFocusedSubjective(null);
  };

  const handleExpire = useCallback(() => {
    // TODO: 자동 제출 로직
    console.log("시간 종료 — 자동 제출");
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
        <span className="text-sm font-bold text-gray-700">모의고사 모드</span>
        <button className="text-sm text-gray-500">홈으로 →</button>
      </header>
      <main className="flex items-center justify-center flex-1 p-4 pb-20 overflow-auto">
        <div className="flex items-stretch gap-5">
          <OmrCard
            examInfo={MOCK_EXAM_INFO}
            studentInfo={MOCK_STUDENT_INFO}
            objectiveAnswers={objectiveAnswers}
            subjectiveAnswers={subjectiveAnswers}
            focusedSubjective={focusedSubjective}
            onObjectiveMark={handleObjectiveMark}
            onSubjectiveFocus={handleSubjectiveFocus}
          />
          <NumPad
            focusedQuestion={focusedSubjective}
            value={focusedSubjective ? (subjectiveAnswers[focusedSubjective] ?? "") : ""}
            onChange={handleNumPadChange}
            onConfirm={handleNumPadConfirm}
          />
        </div>
      </main>

      {/* 타이머 */}
      <TimerBar totalSeconds={EXAM_SECONDS} onExpire={handleExpire} />

      {/* 카운트다운 오버레이 */}
      {!started && <CountdownOverlay onDone={() => setStarted(true)} />}
    </div>
  );
}
