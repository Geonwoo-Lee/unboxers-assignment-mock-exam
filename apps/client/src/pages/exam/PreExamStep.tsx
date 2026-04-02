import HelpButton from "../../components/exam/HelpButton";
import { useCountdown } from "../../hooks/useCountdown";

interface Props {
  countdownSeconds?: number;
  onStart: () => void;
}

export default function PreExamStep({ countdownSeconds = 5, onStart }: Props) {
  const remaining = useCountdown(countdownSeconds, onStart);

  return (
    <div className="shrink-0 bg-white border-t border-gray-200">
      <div className="flex items-center px-15 py-7.5 gap-9">
        <div className="flex flex-col flex-1 gap-2">
          <p className="text-[17px] font-extrabold leading-none tracking-[0.36px] text-gradient-dark">
            시험이 곧 시작됩니다...
          </p>
          <div className="flex items-end justify-between">
            <p className="text-[48px] font-extrabold leading-none tracking-[0.36px] text-gradient-dark tabular-nums">
              {remaining}초 뒤 시작
            </p>
            <p className="text-[17px] font-semibold leading-none tracking-[0.36px] text-gradient-dark tabular-nums">
              시험 시간 60분
            </p>
          </div>
          <div className="h-2 bg-gray-100 rounded-full" />
        </div>
        <HelpButton />
      </div>
    </div>
  );
}
