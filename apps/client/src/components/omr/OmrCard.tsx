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
  readonly?: boolean;
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
  readonly = false,
}: Props) {
  const handleObjectiveMark = (n: number, option: number) => {
    if (readonly) return;
    onObjectiveMark?.(n, option);
  };

  const handleSubjectiveFocus = (n: number) => {
    if (readonly) return;
    onSubjectiveFocus?.(n);
  };

  return (
    <div className="inline-flex flex-col bg-omr-bg px-6 py-4 rounded-4xl overflow-hidden shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)]">
      <div className="flex">
        <InfoSection examInfo={examInfo} studentInfo={studentInfo} />
        <GradeSection grade={studentInfo.grade} seatNumber={studentInfo.seatNumber} />
        <QuestionSection
          objectiveAnswers={objectiveAnswers}
          subjectiveAnswers={subjectiveAnswers}
          activeObjective={activeObjective}
          activeSubjective={activeSubjective}
          focusedSubjective={focusedSubjective}
          onObjectiveMark={handleObjectiveMark}
          onSubjectiveFocus={handleSubjectiveFocus}
        />
      </div>
    </div>
  );
}
