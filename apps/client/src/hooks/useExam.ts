import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchExam, submitExam } from "../api/exam";
import type { SubmitRequest, SubmitResponse } from "../types/exam";

export function useExam() {
  return useQuery({
    queryKey: ["exam"],
    queryFn: fetchExam,
  });
}

export function useSubmitExam(onSuccess: (data: SubmitResponse) => void) {
  return useMutation<SubmitResponse, Error, SubmitRequest>({
    mutationFn: submitExam,
    onSuccess,
  });
}
