import type { ExamInfo, SubmitRequest, SubmitResponse } from "../types/exam";

interface ExamResponse {
  message: string;
  data: ExamInfo;
}

interface SubmitApiResponse {
  message: string;
  data: SubmitResponse;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchExam(): Promise<ExamInfo> {
  const res = await fetch("/api/exams");
  const json = await handleResponse<ExamResponse>(res);
  return json.data;
}

export async function submitExam(request: SubmitRequest): Promise<SubmitResponse> {
  const res = await fetch("/api/exams/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  const json = await handleResponse<SubmitApiResponse>(res);
  return json.data;
}
