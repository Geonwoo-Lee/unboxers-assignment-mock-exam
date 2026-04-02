import ObjectiveSection from "./ObjectiveSection";
import SubjectiveSection from "./SubjectiveSection";
import type { ObjectiveAnswers, SubjectiveAnswers } from "../../types/exam";

interface Props {
  objectiveAnswers: ObjectiveAnswers;
  subjectiveAnswers: SubjectiveAnswers;
  activeObjective: number;
  activeSubjective: number;
  focusedSubjective: number | null;
  onObjectiveMark: (questionNumber: number, option: number) => void;
  onSubjectiveFocus: (questionNumber: number) => void;
  locked?: boolean;
}

export default function QuestionSection({
  objectiveAnswers,
  subjectiveAnswers,
  activeObjective,
  activeSubjective,
  focusedSubjective,
  onObjectiveMark,
  onSubjectiveFocus,
  locked = false,
}: Props) {
  return (
    <div className="flex">
      <ObjectiveSection
        objectiveAnswers={objectiveAnswers}
        activeObjective={activeObjective}
        onObjectiveMark={onObjectiveMark}
        locked={locked}
      />
      <SubjectiveSection
        subjectiveAnswers={subjectiveAnswers}
        activeSubjective={activeSubjective}
        focusedSubjective={focusedSubjective}
        onSubjectiveFocus={onSubjectiveFocus}
        locked={locked}
        flexible
        footerText="선 아래부분은 절대 칠하지 말 것."
        footerNumberSpacer
      />
    </div>
  );
}
