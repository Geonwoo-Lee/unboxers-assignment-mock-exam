import { useState } from "react";
import HelpModal from "./HelpModal";

export default function HelpButton() {
  const [open, setOpen] = useState(false);
  const [called, setCalled] = useState(false);

  const handleCall = () => {
    setCalled(true);
    setOpen(false);
  };

  if (called) {
    return (
      <div className="w-50 h-15 rounded-2xl bg-white flex items-center justify-center gap-2 shadow-soft shrink-0 border border-gray-100">
        <img src="/checkIcon.png" className="w-5 h-5" alt="check" />
        <span className="btn-label text-gs-1">
          선생님 호출 완료!
        </span>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-50 h-15 rounded-2xl bg-white flex items-center justify-center gap-1 shadow-soft shrink-0 cursor-pointer border border-gray-100"
      >
        <img src="/svg/help.svg" className="w-4 h-4" alt="help" />
        <span className="btn-label text-gs-1">
          문제가 생겼나요?
        </span>
      </button>

      {open && <HelpModal onClose={() => setOpen(false)} onCall={handleCall} />}
    </>
  );
}
