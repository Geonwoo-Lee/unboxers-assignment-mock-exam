import Bubble from "./Bubble";

interface Props {
  grade: number | null;
  seatTens: number | null;
  seatOnes: number | null;
  onGradeChange?: (grade: number) => void;
  onSeatTensChange?: (tens: number) => void;
  onSeatOnesChange?: (ones: number) => void;
  locked?: boolean;
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const GRADEDIGITS = [1, 2, 3];

const HEADER_CLASS = "omr-header-h flex items-center justify-center omr-border-b font-semibold text-inbrain-blue text-sm";
const BUBBLE_COL_CLASS = "flex flex-col items-center gap-1 px-2 py-3";

export default function GradeSection({
  grade,
  seatTens,
  seatOnes,
  onGradeChange,
  onSeatTensChange,
  onSeatOnesChange,
  locked = false,
}: Props) {
  const interactive = !locked;

  return (
    <div className="flex flex-col shrink-0">
      <div className="flex flex-1 omr-border-l omr-border-r omr-border-t omr-border-b">
        <div className="flex flex-col omr-border-r">
          <div className={`${HEADER_CLASS} w-9 leading-tight`}>학<br />년</div>
          <div className={BUBBLE_COL_CLASS}>
            {GRADEDIGITS.map((n) => (
              <Bubble
                key={n}
                value={n}
                selected={n === grade}
                disabled={false}
                locked={locked}
                onClick={() => interactive && onGradeChange?.(n)}
                small
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className={HEADER_CLASS}>번호</div>
          <div className="flex">
            <div className={`${BUBBLE_COL_CLASS} omr-border-r`}>
              {DIGITS.map((n) => (
                <Bubble
                  key={n}
                  value={n}
                  selected={n === seatTens}
                  disabled={false}
                  locked={locked}
                  onClick={() => interactive && onSeatTensChange?.(n)}
                  small
                />
              ))}
            </div>
            <div className={BUBBLE_COL_CLASS}>
              {DIGITS.map((n) => (
                <Bubble
                  key={n}
                  value={n}
                  selected={n === seatOnes}
                  disabled={false}
                  locked={locked}
                  onClick={() => interactive && onSeatOnesChange?.(n)}
                  small
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-auto">
        <div className="flex justify-center items-end py-1.5 w-9">
          <div className="w-2 h-6 bg-gs-1" />
        </div>
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
