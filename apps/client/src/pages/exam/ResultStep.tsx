import type { SubmitResponse } from "../../types/exam";

interface Props {
  result: SubmitResponse;
  description: string;
  onRestart: () => void;
}

interface StatCardProps {
  label: string;
  value: number;
  unit: string;
}

function StatCard({ label, value, unit }: StatCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-white rounded-2xl shadow-soft px-10 py-6 min-w-40">
      <p className="text-[15px] font-semibold text-[#858585] leading-none">{label}</p>
      <p className="text-[48px] font-extrabold leading-none tracking-[-0.5px] text-[#090909] tabular-nums">
        {value}
        <span className="text-[28px] font-extrabold">{unit}</span>
      </p>
    </div>
  );
}

export default function ResultStep({ result, description, onRestart }: Props) {
  return (
    <div className="flex flex-col flex-1 w-full items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-1.5">
        <img src="/clap.png" alt="clap" className="w-50 h-50 mb-2" />
        <p className="text-[17px] font-semibold text-[#090909] leading-none">채점이 완료되었어요!</p>
        <p className="text-[40px] font-extrabold leading-none tracking-[-0.5px] text-[#090909]">{description}</p>
      </div>

      <div className="flex gap-4">
        <StatCard label="점수" value={result.score} unit="점" />
        <StatCard label="맞힌 문제" value={result.correctCount} unit="개" />
        <StatCard label="복습해야 할 오답" value={result.wrongCount} unit="개" />
      </div>

      <button
        onClick={onRestart}
        className="px-12 h-13 rounded-2xl bg-gradient-dark text-white btn-label cursor-pointer shadow-medium"
      >
        복습 시작
      </button>
    </div>
  );
}
