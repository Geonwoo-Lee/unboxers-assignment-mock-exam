import { useEffect, useState } from "react";

interface Props {
  seconds?: number;
  onDone: () => void;
}

export default function CountdownOverlay({ seconds = 5, onDone }: Props) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) {
      onDone();
      return;
    }
    const id = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(id);
  }, [remaining, onDone]);

  return (
    <div className="fixed inset-0 bg-black/40 flex flex-col items-center justify-end pb-12 z-50">
      <p className="text-white text-sm mb-1">시험이 곧 시작됩니다</p>
      <p className="text-white text-5xl font-bold">{remaining}초 뒤 시작</p>
    </div>
  );
}
