import InfoSection from "./InfoSection";
import GradeSection from "./GradeSection";
import QuestionSection from "./QuestionSection";
import type { ExamInfo, StudentInfo, ObjectiveAnswers, SubjectiveAnswers } from "../../types/exam";

interface Props {
  examInfo: ExamInfo;
  studentInfo: StudentInfo;
  objectiveAnswers: ObjectiveAnswers;
  subjectiveAnswers: SubjectiveAnswers;
  activeObjective?: number;
  activeSubjective?: number;
  focusedSubjective?: number | null;
  onObjectiveMark?: (questionNumber: number, option: number) => void;
  onSubjectiveFocus?: (questionNumber: number) => void;
  // 학년/번호 선택
  selectedGrade?: number | null;
  selectedSeatTens?: number | null;
  selectedSeatOnes?: number | null;
  onGradeChange?: (grade: number) => void;
  onSeatTensChange?: (tens: number) => void;
  onSeatOnesChange?: (ones: number) => void;
  readonly?: boolean;
  locked?: boolean;
}

export default function OmrCard({
  examInfo,
  studentInfo,
  objectiveAnswers,
  subjectiveAnswers,
  activeObjective = 30,
  activeSubjective = 12,
  focusedSubjective = null,
  onObjectiveMark,
  onSubjectiveFocus,
  selectedGrade,
  selectedSeatTens,
  selectedSeatOnes,
  onGradeChange,
  onSeatTensChange,
  onSeatOnesChange,
  readonly = false,
  locked = false,
}: Props) {
  const handleObjectiveMark = (n: number, option: number) => {
    if (readonly || locked) return;
    onObjectiveMark?.(n, option);
  };

  const handleSubjectiveFocus = (n: number) => {
    if (readonly || locked) return;
    onSubjectiveFocus?.(n);
  };

  // 학년/번호: selectedGrade 등이 명시적으로 전달되면 사용, 아니면 studentInfo 값
  const displayGrade = selectedGrade !== undefined ? selectedGrade : studentInfo.grade;
  const displaySeatTens = selectedSeatTens !== undefined
    ? selectedSeatTens
    : Math.floor(studentInfo.seatNumber / 10);
  const displaySeatOnes = selectedSeatOnes !== undefined
    ? selectedSeatOnes
    : studentInfo.seatNumber % 10;

  return (
    <div className="inline-flex flex-col self-start bg-omr-bg px-6 pt-4 rounded-4xl overflow-hidden shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)]">
      <div className="flex">
        <InfoSection examInfo={examInfo} studentInfo={studentInfo} />
        <GradeSection
          grade={displayGrade}
          seatTens={displaySeatTens}
          seatOnes={displaySeatOnes}
          onGradeChange={readonly || locked ? undefined : onGradeChange}
          onSeatTensChange={readonly || locked ? undefined : onSeatTensChange}
          onSeatOnesChange={readonly || locked ? undefined : onSeatOnesChange}
          locked={locked}
        />
        <QuestionSection
          objectiveAnswers={objectiveAnswers}
          subjectiveAnswers={subjectiveAnswers}
          activeObjective={activeObjective}
          activeSubjective={activeSubjective}
          focusedSubjective={focusedSubjective}
          onObjectiveMark={handleObjectiveMark}
          onSubjectiveFocus={handleSubjectiveFocus}
          locked={locked}
        />
      </div>
    </div>
  );
}
