import { toast } from "react-toastify";

export function showErrorToast(error) {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong";

  toast.error(message);
}