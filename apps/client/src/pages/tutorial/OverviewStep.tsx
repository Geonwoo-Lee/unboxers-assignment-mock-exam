import TutorialButton from "./TutorialButton";

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

export default function OverviewStep({ onNext, onPrev }: Props) {
  return (
    <div className="flex flex-col flex-1 min-h-0 w-full">
      <div className="flex flex-col items-center justify-center flex-1 min-h-0 py-8 gap-8">
        <div className="flex items-center gap-8 min-h-0">
          <img src="/workbook.png" className="max-h-[38vh] w-auto object-contain" alt="수학 문제집" />
          <img src="/omr-card.png" className="max-h-[38vh] w-auto object-contain" alt="OMR 카드" />
        </div>
        <div className="text-center space-y-[6px]">
          <p className="heading-xl text-gs-1">
            실제 시험지 크기와 인쇄된 시험지에 문제를 풀고
          </p>
          <p className="heading-xl text-gs-1">
            화면에 표시된 OMR카드에 답을 마킹해요
          </p>
        </div>
      </div>
      <div className="w-full max-w-[1200px] mx-auto px-6 pb-10 flex items-center justify-between shrink-0">
        <TutorialButton variant="prev" onClick={onPrev}>이전으로</TutorialButton>
        <TutorialButton variant="primary" onClick={onNext}>다음</TutorialButton>
      </div>
    </div>
  );
}
