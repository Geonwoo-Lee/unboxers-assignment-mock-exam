import { useState } from "react";
import TutorialPage from "./pages/TutorialPage";
import ExamPage from "./pages/ExamPage";

type AppStep = "tutorial" | "exam";

const TUTORIAL_DONE_KEY = "tutorial_done";

function App() {
  const [step, setStep] = useState<AppStep>(() =>
    localStorage.getItem(TUTORIAL_DONE_KEY) ? "exam" : "tutorial"
  );

  const handleTutorialDone = () => {
    localStorage.setItem(TUTORIAL_DONE_KEY, "true");
    setStep("exam");
  };

  if (step === "tutorial") return <TutorialPage onDone={handleTutorialDone} />;
  return <ExamPage />;
}

export default App;
