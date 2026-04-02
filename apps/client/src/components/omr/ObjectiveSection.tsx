import Bubble from "./Bubble";
import BubbleWrap from "./BubbleWrap";
import NumberColumn from "./NumberColumn";
import type { ObjectiveAnswers } from "../../types/exam";

export interface ObjectiveSectionProps {
  objectiveAnswers: ObjectiveAnswers;
  activeObjective: number;
  onObjectiveMark: (questionNumber: number, option: number) => void;
  hideHeader?: boolean;
  noBorderTop?: boolean;
  locked?: boolean;
}

const OBJECTIVE_STARTS = [1, 11, 21];
const CHOICES = [1, 2, 3, 4, 5];

// 각 컬럼에서 하이라이트(파란 배경)가 위쪽 절반인지 아래쪽 절반인지
const HIGHLIGHT_HALF: Record<number, "top" | "bottom"> = {
  1: "bottom",   // 6-10 행
  11: "top",     // 11-15 행
  21: "bottom",  // 26-30 행
};

export default function ObjectiveSection({
  objectiveAnswers,
  activeObjective,
  onObjectiveMark,
  hideHeader = false,
  noBorderTop = false,
  locked = false,
}: ObjectiveSectionProps) {
  return (
    <div className={`flex flex-col ${noBorderTop ? "" : "omr-border-t"}`}>
      {!hideHeader && (
        <div className="omr-header-h text-2xl font-semibold text-inbrain-blue flex items-center justify-center text-center omr-border-b omr-border-r">
          객 관 식 답 안
        </div>
      )}
      <div className="flex">
        {OBJECTIVE_STARTS.map((start) => (
          <div key={start} className="flex flex-col">
            <div className="flex flex-1 omr-border-r omr-border-b">
              <NumberColumn numbers={Array.from({ length: 10 }, (_, i) => start + i)} />

              <div className="relative flex flex-col gap-3 py-3 px-2">
                <div
                  className={`absolute inset-x-0 bg-[#5784F11A] ${
                    HIGHLIGHT_HALF[start] === "bottom"
                      ? "bottom-0 h-[50%]"
                      : "top-0 h-[50%]"
                  }`}
                />
                <div className="absolute inset-x-0 top-[50%] border-t-[1.5px] border-dashed border-inbrain-lightblue" />

                {Array.from({ length: 10 }, (_, i) => {
                  const n = start + i;
                  return (
                    <div key={n} className="relative z-[1]">
                      <BubbleWrap>
                        {CHOICES.map((option) => (
                          <Bubble
                            key={option}
                            value={option}
                            selected={(objectiveAnswers[n] ?? []).includes(option)}
                            disabled={n > activeObjective}
                            locked={locked}
                            onClick={() => onObjectiveMark(n, option)}
                          />
                        ))}
                      </BubbleWrap>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex mt-auto">
              <div className="w-7 shrink-0" />
              <div className="flex items-end px-2 gap-2.5 py-1.5">
                {CHOICES.map((_, i) => (
                  <div key={i} className="w-5 flex justify-center">
                    <div className="w-2 h-6 bg-gs-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
