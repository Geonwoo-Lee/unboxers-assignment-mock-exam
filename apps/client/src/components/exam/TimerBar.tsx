import { useEffect, useState } from "react";

interface Props {
  totalSeconds: number;
  onExpire: () => void;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}분 ${String(s).padStart(2, "0")}`;
}

const WARNING_SECONDS = 60;

export default function TimerBar({ totalSeconds, onExpire }: Props) {
  const [remaining, setRemaining] = useState(totalSeconds);

  useEffect(() => {
    if (remaining <= 0) {
      onExpire();
      return;
    }
    const id = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(id);
  }, [remaining, onExpire]);

  const progress = remaining / totalSeconds;
  const isWarning = remaining <= WARNING_SECONDS;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      {isWarning && (
        <div className="text-center py-1 bg-red-50">
          <p className="text-xs text-gray-500">시험이 곧 종료됩니다</p>
          <p className="text-lg font-bold text-gray-900">
            {remaining}초 뒤에 자동으로 제출됩니다. 답안을 모두 입력해주세요.
          </p>
        </div>
      )}
      <div className="flex items-center justify-between px-6 py-2">
        {!isWarning && (
          <p className="text-sm text-gray-500">
            시험이 곧 시작됩니다...
          </p>
        )}
        <p className="ml-auto text-sm text-gray-600">
          시험 시간 {formatTime(remaining)}
        </p>
      </div>
      <div className="h-1.5 bg-gray-100">
        <div
          className={`h-full transition-all duration-1000 ${isWarning ? "bg-red-400" : "bg-blue-400"}`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
