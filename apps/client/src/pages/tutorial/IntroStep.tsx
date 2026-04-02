import TutorialButton from "./TutorialButton";

interface Props {
  onNext: () => void;
  onSkip: () => void;
}

export default function IntroStep({ onNext, onSkip }: Props) {
  return (
    <div className="flex flex-col flex-1 min-h-0 w-full">
      <div className="flex flex-col items-center justify-center flex-1 min-h-0 py-8 gap-8">
        <img src="/workbook.png" className="max-h-[45vh] w-auto object-contain flex-shrink" alt="수학 문제집" />
        <div className="text-center space-y-[6px]">
          <p className="heading-xl text-gs-1">
            모의고사가 처음이시죠?
          </p>
          <p className="heading-xl text-gs-1">
            실전 모의고사는 실전과 최대한 비슷한 환경으로 진행해요
          </p>
        </div>
      </div>
      <div className="w-full max-w-[1200px] mx-auto px-6 pb-10 flex items-center justify-between shrink-0">
        <TutorialButton variant="secondary" onClick={onSkip}>튜토리얼 건너뛰기</TutorialButton>
        <TutorialButton variant="primary" onClick={onNext}>다음</TutorialButton>
      </div>
    </div>
  );
}
