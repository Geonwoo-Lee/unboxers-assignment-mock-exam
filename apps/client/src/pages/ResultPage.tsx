import type { SubmitResponse } from "../types/exam";

interface Props {
  result: SubmitResponse;
  onRestart: () => void;
}

export default function ResultPage({ result: _result, onRestart: _onRestart }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>결과 화면 (구현 예정)</p>
    </div>
  );
}
