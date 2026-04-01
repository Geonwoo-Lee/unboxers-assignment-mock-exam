import type { SubmitResponse } from "../types/exam";

interface Props {
  onDone: (result: SubmitResponse) => void;
}

export default function ExamPage({ onDone: _onDone }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>시험 화면 (구현 예정)</p>
    </div>
  );
}
