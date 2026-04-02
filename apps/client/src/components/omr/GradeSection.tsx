import Bubble from "./Bubble";

interface Props {
  grade: number;
  seatNumber: number;
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const GRADEDIGITS = [1, 2, 3];

const HEADER_CLASS = "omr-header-h flex items-center justify-center omr-border-b font-semibold text-inbrain-blue text-sm";
const BUBBLE_COL_CLASS = "flex flex-col items-center gap-1 px-2 py-3";

export default function GradeSection({ grade, seatNumber }: Props) {
  const tens = Math.floor(seatNumber / 10);
  const ones = seatNumber % 10;

  return (
    <div className="flex flex-col shrink-0">
      {/* 콘텐츠 */}
      <div className="flex flex-1 omr-border-l omr-border-r omr-border-t omr-border-b">
        <div className="flex flex-col omr-border-r">
          <div className={`${HEADER_CLASS} w-9 leading-tight`}>학<br />년</div>
          <div className={BUBBLE_COL_CLASS}>
            {GRADEDIGITS.map((n) => (
              <Bubble key={n} value={n} selected={n === grade} disabled={false} onClick={() => {}} small />
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className={HEADER_CLASS}>번호</div>
          <div className="flex">
            <div className={`${BUBBLE_COL_CLASS} omr-border-r`}>
              {DIGITS.map((n) => (
                <Bubble key={n} value={n} selected={n === tens} disabled={false} onClick={() => {}} small />
              ))}
            </div>
            <div className={BUBBLE_COL_CLASS}>
              {DIGITS.map((n) => (
                <Bubble key={n} value={n} selected={n === ones} disabled={false} onClick={() => {}} small />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 바코드 — 학년 1열(1바), 번호 2열(2바) */}
      <div className="flex mt-auto">
        {/* 학년: 1열 → 1바 */}
        <div className="flex justify-center items-end py-1.5  w-9">
          <div className="w-2 h-6 bg-gs-1" />
        </div>
        {/* 번호: 십의자리(1바) + 일의자리(1바) */}
        <div className="flex">
          <div className="w-8 flex justify-center items-end py-1.5">
            <div className="w-2 h-6 bg-gs-1" />
          </div>
          <div className="w-8 flex justify-center items-end py-1.5">
            <div className="w-2 h-6 bg-gs-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
