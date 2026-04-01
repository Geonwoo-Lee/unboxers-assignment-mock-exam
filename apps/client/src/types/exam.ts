export type AnswerType = "objective" | "subjective";
export type ResultStatus = "correct" | "wrong" | "unanswered" | "duplicated";

export interface Answer {
  answerType: AnswerType;
  number: number;
  answer: number;
}

export interface ExamInfo {
  title: string;
  description: string;
  supervisorName: string;
  totalQuestions: number;
  totalScore: number;
}

export interface QuestionResult {
  answerType: AnswerType;
  number: number;
  result: ResultStatus;
}

export interface SubmitResponse {
  title: string;
  score: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  results: QuestionResult[];
}

export interface SubmitRequest {
  name: string;
  school: string;
  grade: number;
  studentNumber: number;
  seatNumber: number;
  answers: Answer[];
}
