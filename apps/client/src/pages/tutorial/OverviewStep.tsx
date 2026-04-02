interface Props {
  onNext: () => void;
  onPrev: () => void;
}

export default function OverviewStep({ onNext, onPrev }: Props) {
  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="flex flex-col items-center justify-center flex-1 pt-[90px] pb-[90px] gap-12">
        <div className="flex items-center gap-12">
          <img src="/workbook.png" className="w-[315px] h-[433px] object-cover" alt="수학 문제집" />
          <img src="/omr-card.png" className="w-[593px] h-[316px] object-cover" alt="OMR 카드" />
        </div>
        <div className="text-center space-y-[6px]">
          <p className="text-[36px] font-extrabold leading-none tracking-[0.36px] text-gs-1">
            실제 시험지 크기와 인쇄된 시험지에 문제를 풀고
          </p>
          <p className="text-[36px] font-extrabold leading-none tracking-[0.36px] text-gs-1">
            화면에 표시된 OMR카드에 답을 마킹해요
          </p>
        </div>
      </div>
      <div className="w-full max-w-[1200px] mx-auto px-6 pb-[80px] flex items-center justify-between shrink-0">
        <button
          onClick={onPrev}
          className="w-[243px] h-[52px] rounded-xl bg-white text-gs-500 font-semibold shadow-[0px_8px_16px_0px_rgba(0,0,0,0.03)] cursor-pointer"
        >
          이전으로
        </button>
        <button
          onClick={onNext}
          className="w-[243px] h-[52px] rounded-xl font-semibold bg-gradient-to-b from-[#333333] to-[#585858] text-white cursor-pointer shadow-[0px_8px_16px_0px_rgba(0,0,0,0.03)]"
        >
          다음
        </button>
      </div>
    </div>
  );
}
