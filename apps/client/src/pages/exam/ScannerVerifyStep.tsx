import OmrCard from "../../components/omr/OmrCard";
import type { ExamInfo, StudentInfo, ObjectiveAnswers, SubjectiveAnswers } from "../../types/exam";

interface Props {
  examInfo: ExamInfo;
  studentInfo: StudentInfo;
  objectiveAnswers: ObjectiveAnswers;
  subjectiveAnswers: SubjectiveAnswers;
}

export default function ScannerVerifyStep({
  examInfo,
  studentInfo,
  objectiveAnswers,
  subjectiveAnswers,
}: Props) {
  return (
    <div className="flex flex-col flex-1 w-full min-h-0 items-center justify-center overflow-auto py-10 gap-12">
      <div className="relative omr-zoom-60">
        <OmrCard
          examInfo={examInfo}
          studentInfo={studentInfo}
          objectiveAnswers={objectiveAnswers}
          subjectiveAnswers={subjectiveAnswers}
          locked
        />
        <img
          src="/scanner.png"
          alt="scanner"
          className="absolute inset-y-0 h-full w-auto z-10 pointer-events-none animate-scan"
        />
      </div>

      <div className="flex flex-col items-center gap-12">
        <div className="text-center space-y-1.5">
          <p className="heading-xl text-[#090909]">OMR 카드 스캔 중...</p>
          <p className="heading-xl text-[#090909]">곧 결과가 나와요.</p>
        </div>
        <button className="w-[243px] h-13 rounded-xl bg-white btn-label text-[#858585] shadow-soft">
          과연 몇 점일까요?
        </button>
      </div>
    </div>
  );
}
