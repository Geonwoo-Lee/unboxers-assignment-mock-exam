import TutorialButton from "./TutorialButton";

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

export default function TimerStep({ onNext, onPrev }: Props) {
  return (
    <div className="flex flex-col flex-1 min-h-0 w-full">
      <div className="flex flex-col items-center justify-center flex-1 min-h-0 pt-8 gap-12">
        <div className="w-full max-w-[1200px] bg-white rounded-2xl shadow-card px-15 py-7.5 flex items-center justify-between">
          <div className="flex flex-col gap-2 min-w-[632px]">
            <span className="text-[17px] font-extrabold leading-none tracking-[0.36px] text-gradient-dark">
              시험 종료까지 남은 시간
            </span>
            <div className="flex items-end justify-between">
              <span className="text-[48px] font-extrabold leading-none tracking-[0.36px] text-[#F44C47] tabular-nums">5초</span>
              <span className="text-[17px] font-semibold leading-none tracking-[0.36px] text-gradient-dark tabular-nums">
                시험 시간 60분
              </span>
            </div>
            <div className="w-full max-w-[632px] h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
              <div className="h-full w-9.5 bg-[#F44C47] rounded-l-full" />
            </div>
          </div>

          <div className="shrink-0 ml-9">
            <button className="w-50 h-15 rounded-2xl bg-white flex items-center justify-center gap-1 shadow-soft shrink-0 cursor-pointer">
              <img src="/svg/help.svg" className="w-4 h-4" alt="help" />
              <span className="text-[17px] font-bold leading-none tracking-[-0.41px] text-gs-1">문제가 생겼나요?</span>
            </button>
          </div>
        </div>

        <div className="text-center space-y-[6px]">
          <p className="heading-xl text-gs-1">
            시간이 모두 지나면 시험은 종료되고 OMR카드는 자동으로 제출돼요
          </p>
          <p className="heading-xl text-[#F44C47]">
            마킹하지 못한 답안은 모두 오답 처리되니 미리 마킹하세요
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-6 pb-10 flex items-center justify-between shrink-0">
        <TutorialButton variant="prev" onClick={onPrev}>이전으로</TutorialButton>
        <TutorialButton variant="primary" onClick={onNext}>시험 화면으로 이동</TutorialButton>
      </div>
    </div>
  );
}
