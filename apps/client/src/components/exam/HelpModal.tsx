interface Props {
  onClose: () => void;
  onCall: () => void;
}

export default function HelpModal({ onClose, onCall }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl px-15 py-13 flex flex-col items-center gap-8 shadow-xl">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-[28px] font-bold leading-none tracking-[-0.41px] text-gs-1">
            시험 진행에 문제가 있나요?
          </p>
          <p className="text-[28px] font-bold leading-none tracking-[-0.41px] text-gs-1">
            선생님을 호출할 수 있어요.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="w-[243px] h-[52px] rounded-xl bg-white text-gs-1 btn-label shadow-card cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={onCall}
            className="w-[243px] h-[52px] rounded-xl bg-gradient-dark text-white btn-label cursor-pointer"
          >
            호출하기
          </button>
        </div>
      </div>
    </div>
  );
}
