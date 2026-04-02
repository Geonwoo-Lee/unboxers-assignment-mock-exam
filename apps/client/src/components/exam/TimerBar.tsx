import { useEffect, useRef } from "react";
import HelpButton from "./HelpButton";
import { useCountdown } from "../../hooks/useCountdown";

interface Props {
  totalSeconds: number;
  onExpire: () => void;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}분 ${String(s).padStart(2, "0")}초`;
}

export default function TimerBar({ totalSeconds, onExpire }: Props) {
  const remaining = useCountdown(totalSeconds, onExpire);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  const WARNING_SECONDS = totalSeconds * 0.1;

  useEffect(() => {
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startTimeRef.current!) / 1000;
      const progress = Math.min(elapsed / totalSeconds, 1);

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress * 100}%`;
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [totalSeconds]);

  const isWarning = remaining <= WARNING_SECONDS;
  const totalMinutes = Math.round(totalSeconds / 60);

  return (
    <div className="shrink-0 bg-white border-t border-gray-200">
      <div className="flex items-center justify-between px-15 py-7.5">
        <div className="flex flex-col flex-1 gap-2">
          <p className="text-[17px] font-extrabold leading-none tracking-[0.36px] text-gradient-dark">
            {isWarning ? "시험이 곧 종료됩니다" : "시험 종료까지 남은 시간"}
          </p>
          <div className="flex items-end justify-between">
            {isWarning ? (
              <p className="text-gradient-dark whitespace-nowrap">
                <span className="text-[48px] font-extrabold leading-none tracking-[0.36px] tabular-nums">{formatTime(remaining)}</span>
                <span className="text-[26px] font-extrabold leading-none tracking-[0.36px]"> 뒤에 자동으로 제출됩니다. 답안을 모두 입력해주세요</span>
              </p>
            ) : (
              <p className="text-[48px] font-extrabold leading-none tracking-[0.36px] text-gradient-dark tabular-nums">
                {formatTime(remaining)}
              </p>
            )}
            <p className="text-[17px] font-semibold leading-none tracking-[0.36px] text-gradient-dark tabular-nums">시험 시간 {totalMinutes}분</p>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className={`h-full rounded-full ${isWarning ? "bg-[#F44C47]" : "bg-gradient-to-r from-[#333333] to-[#585858]"}`}
              style={{ width: "0%" }}
            />
          </div>
        </div>

        <div className="shrink-0 ml-9">
          <HelpButton />
        </div>
      </div>
    </div>
  );
}
