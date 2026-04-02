import type { ExamInfo, StudentInfo } from "../../types/exam";

interface Props {
  examInfo: ExamInfo;
  studentInfo: StudentInfo;
}

const INFO_ROWS = [
  { label: "시험", getValue: (e: ExamInfo, _s: StudentInfo) => e.title },
  { label: "과목", getValue: (e: ExamInfo, _s: StudentInfo) => e.description },
  { label: "성명", getValue: (_e: ExamInfo, s: StudentInfo) => s.name },
  { label: "학교", getValue: (_e: ExamInfo, s: StudentInfo) => s.school },
  { label: "좌석", getValue: (_e: ExamInfo, s: StudentInfo) => `${s.seatNumber}번` },
  { label: "감독", getValue: (e: ExamInfo, _s: StudentInfo) => e.supervisorName },
];

export default function InfoSection({ examInfo, studentInfo }: Props) {
  return (
    <div className="flex flex-col shrink-0">
      <div className="flex omr-border-l omr-border-t omr-border-b">
        <div className="flex flex-col">
          {INFO_ROWS.map(({ label }, idx) => (
            <div
              key={label}
              className={`w-7 h-10 omr-border-r text-sm font-semibold text-inbrain-blue flex items-center justify-center py-1 [writing-mode:vertical-rl] ${idx < INFO_ROWS.length - 1 ? "omr-border-b" : ""}`}
            >
              {label}
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          {INFO_ROWS.map(({ label, getValue }, idx) => (
            <div
              key={label}
              className={`w-43 h-10 font-bold text-inbrain-blue flex items-center justify-center px-2 py-1 text-xs ${idx < INFO_ROWS.length - 1 ? "omr-border-b" : ""}`}
            >
              {getValue(examInfo, studentInfo)}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 px-3 py-4 gap-2 ">
        <div className="w-10 h-10 rounded-full border-2 border-[#5784F1] flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-2 border-[#5784F1]" />
        </div>
        <p className="text-xs font-bold text-[#5784F1] text-center">베이스 수학학원</p>
        <p className="text-xs font-bold text-gray-700 text-center leading-tight">
          학생답안 입력용<br />OMR 카드
        </p>
        <p className="text-[10px] text-gray-500 text-center leading-tight mt-1">
          객관식 답안은 터치해서 칠하고, 주관식<br />답안은 터치한 뒤 키패드로 입력해요.
        </p>
        <p className="text-[10px] text-gray-500 text-center leading-tight">
          답안을 작성하지 않고 제출하면 별도의 경<br />고 없이 오답으로 처리되니 주의하세요.
        </p>
      </div>
    </div>
  );
}
