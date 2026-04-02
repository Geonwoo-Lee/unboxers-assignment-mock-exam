import { useState, useCallback } from "react";
import type { ObjectiveAnswers, SubjectiveAnswers } from "../types/exam";

export function useExamAnswers() {
  const [objectiveAnswers, setObjectiveAnswers] = useState<ObjectiveAnswers>({});
  const [subjectiveAnswers, setSubjectiveAnswers] = useState<SubjectiveAnswers>({});
  const [focusedSubjective, setFocusedSubjective] = useState<number | null>(null);

  const handleObjectiveMark = useCallback((n: number, option: number) => {
    setObjectiveAnswers((prev) => {
      const current = prev[n] ?? [];
      const next = current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option];
      return { ...prev, [n]: next };
    });
  }, []);

  const handleSubjectiveFocus = useCallback((n: number) => setFocusedSubjective(n), []);

  const handleNumPadChange = useCallback((value: string) => {
    if (focusedSubjective === null) return;
    setSubjectiveAnswers((prev) => ({ ...prev, [focusedSubjective]: value }));
  }, [focusedSubjective]);

  const handleNumPadConfirm = useCallback(() => setFocusedSubjective(null), []);

  return {
    objectiveAnswers,
    subjectiveAnswers,
    focusedSubjective,
    setFocusedSubjective,
    handleObjectiveMark,
    handleSubjectiveFocus,
    handleNumPadChange,
    handleNumPadConfirm,
  };
}
