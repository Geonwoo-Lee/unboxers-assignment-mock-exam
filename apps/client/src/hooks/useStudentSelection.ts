import { useState } from "react";

export function useStudentSelection(defaultSeatNumber: number, defaultGrade: number) {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSeatTens, setSelectedSeatTens] = useState<number | null>(null);
  const [selectedSeatOnes, setSelectedSeatOnes] = useState<number | null>(null);

  const resolvedGrade = selectedGrade ?? defaultGrade;
  const resolvedSeatNumber =
    selectedSeatTens !== null && selectedSeatOnes !== null
      ? selectedSeatTens * 10 + selectedSeatOnes
      : defaultSeatNumber;

  return {
    selectedGrade,
    selectedSeatTens,
    selectedSeatOnes,
    setSelectedGrade,
    setSelectedSeatTens,
    setSelectedSeatOnes,
    resolvedGrade,
    resolvedSeatNumber,
  };
}
