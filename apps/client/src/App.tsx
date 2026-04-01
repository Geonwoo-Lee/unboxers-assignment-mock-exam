import { useState } from "react";
import TutorialPage from "./pages/TutorialPage";
import ExamPage from "./pages/ExamPage";
import ResultPage from "./pages/ResultPage";
import type { SubmitResponse } from "./types/exam";

type Step = "tutorial" | "exam" | "result";

const TUTORIAL_DONE_KEY = "tutorial_done";

function App() {
  const [step, setStep] = useState<Step>(() => {
    const tutorialDone = localStorage.getItem(TUTORIAL_DONE_KEY);
    return tutorialDone ? "exam" : "tutorial";
  });
  const [result, setResult] = useState<SubmitResponse | null>(null);

  const handleTutorialDone = () => {
    localStorage.setItem(TUTORIAL_DONE_KEY, "true");
    setStep("exam");
  };

  const handleExamDone = (data: SubmitResponse) => {
    setResult(data);
    setStep("result");
  };

  const handleRestart = () => {
    setStep("exam");
  };

  if (step === "tutorial") return <TutorialPage onDone={handleTutorialDone} />;
  if (step === "result" && result) return <ResultPage result={result} onRestart={handleRestart} />;
  return <ExamPage onDone={handleExamDone} />;
}

export default App;
