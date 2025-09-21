import { showError } from "@/lib/sonner";
import { AxiosError } from "axios";

export const isErrorResponse = (error: unknown, message: string) => {
  const err = error as AxiosError<{
    errors: { field: string; message: string }[];
  }>;
  const errorData = err.response?.data?.errors;
  let errorMessage: string;
  if (Array.isArray(errorData)) {
    errorMessage = errorData.map((e) => e.message).join(", ");
  } else if (typeof errorData === "string") {
    errorMessage = errorData;
  } else {
    errorMessage = message;
  }

  showError(errorMessage);
};
