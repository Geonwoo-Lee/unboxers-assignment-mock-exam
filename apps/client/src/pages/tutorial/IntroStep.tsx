interface Props {
  onNext: () => void;
  onSkip: () => void;
}

export default function IntroStep({ onNext, onSkip }: Props) {
  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="flex flex-col items-center justify-center flex-1 pt-[90px] pb-[90px] gap-12">
        <img src="/workbook.png" className="w-[315px] h-[433px] object-cover" alt="수학 문제집" />
        <div className="text-center space-y-[6px]">
          <p className="text-[36px] font-extrabold leading-none tracking-[0.36px] text-gs-1">
            모의고사가 처음이시죠?
          </p>
          <p className="text-[36px] font-extrabold leading-none tracking-[0.36px] text-gs-1">
            실전 모의고사는 실전과 최대한 비슷한 환경으로 진행해요
          </p>
        </div>
      </div>
      <div className="w-full max-w-[1200px] mx-auto px-6 pb-[80px] flex items-center justify-between shrink-0">
        <button
          onClick={onSkip}
          className="w-[243px] h-[52px] rounded-xl bg-white text-gs-500 font-semibold shadow-[0px_8px_16px_0px_rgba(0,0,0,0.03)] cursor-pointer"
        >
          튜토리얼 건너뛰기
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
