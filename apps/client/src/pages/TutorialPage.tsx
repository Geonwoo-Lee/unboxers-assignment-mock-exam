interface Props {
  onDone: () => void;
}

export default function TutorialPage({ onDone }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <button onClick={onDone}>튜토리얼 (구현 예정)</button>
    </div>
  );
}
