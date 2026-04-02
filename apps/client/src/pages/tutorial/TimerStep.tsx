interface Props {
  onNext: () => void;
  onPrev: () => void;
}

export default function TimerStep({ onNext, onPrev }: Props) {
  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="flex flex-col items-center justify-center flex-1 pt-[80px] gap-12">
        <div className="w-full max-w-[1200px] bg-white rounded-2xl shadow-[0px_8px_16px_0px_rgba(0,0,0,0.06)] px-[60px] py-[30px] flex items-center gap-[60px]">
          {/* 타이머 + 시험시간 + 프로그래스바 그룹 */}
          <div className="flex flex-col flex-1 gap-2">
            <span className="text-[17px] font-extrabold leading-none tracking-[0.36px] text-transparent bg-clip-text bg-gradient-to-b from-[#333333] to-[#585858]">
              시험 종료까지 남은 시간
            </span>
            <div className="flex items-end justify-between">
              <span className="text-[48px] font-extrabold leading-none tracking-[0.36px] text-[#F44C47]">5초</span>
              <span className="text-[17px] font-semibold leading-none tracking-[0.36px] text-transparent bg-clip-text bg-gradient-to-b from-[#333333] to-[#585858]">
                시험 시간 60분
              </span>
            </div>
            <div className="w-full max-w-[632px] h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
              <div className="h-full w-[38px] bg-[#F44C47] rounded-l-full" />
            </div>
          </div>
          {/* 문제가 생겼나요? */}
          <button className="w-[200px] h-[60px] rounded-2xl bg-white flex items-center justify-center gap-[4px] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.03)] shrink-0 cursor-pointer">
            <img src="/svg/help.svg" className="w-4 h-4" alt="help" />
            <span className="text-[17px] font-bold leading-none tracking-[-0.41px] text-gs-1">문제가 생겼나요?</span>
          </button>
          {/* 답안 제출하기 */}
          <button className="w-[200px] h-[60px] rounded-2xl bg-gradient-to-b from-[#364F8E] to-[#5784F1] text-white text-sm font-bold shadow-[0px_8px_16px_0px_rgba(0,0,0,0.03)] shrink-0 cursor-pointer">
            답안 제출하기
          </button>
        </div>

        <div className="text-center space-y-[6px]">
          <p className="text-[36px] font-extrabold leading-none tracking-[0.36px] text-gs-1">
            시간이 모두 지나면 시험은 종료되고 OMR카드는 자동으로 제출돼요
          </p>
          <p className="text-[36px] font-extrabold leading-none tracking-[0.36px] text-[#F44C47]">
            마킹하지 못한 답안은 모두 오답 처리되니 미리 마킹하세요
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
          시험 화면으로 이동
        </button>
      </div>
    </div>
  );
}
