import { toast } from "react-toastify";

export function showNotification(
  message: string,
  type: "success" | "error" | "info",
  options = {}
) {
  let tst =
    type === "success"
      ? toast.success
      : type === "error"
      ? toast.error
      : toast.info;

  tst(message, options);
}

export function handleErrors(err: any) {
  if (err?.response?.data?.error && !err?.response?.data?.error?.errorType) {
    showNotification(
      err?.response?.data?.error?.type,
      err?.response?.data?.error?.message,
      "error"
    );
  } else if (err?.response?.data?.errors) {
    for (const [key, value] of Object.entries(err.response?.data?.errors)) {
      let title = key as any;
      let message = (value as any)[0] as any;
      showNotification(title, message, "error");
    }
  } else if (err?.response?.data?.error?.errorType) {
    showNotification(
      "Error",
      err?.response?.data?.error?.errorMessage,
      "error"
    );
  } else {
    showNotification(
      "Error",
      err?.response?.data?.error?.errorMessage,
      "error"
    );
  }

  console.error(err, err.response);
}
