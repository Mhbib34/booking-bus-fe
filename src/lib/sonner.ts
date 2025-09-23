import { toast } from "sonner";

export const showSuccess = (message: string) => {
  toast.success(message, {
    duration: 2000,
    position: "top-right",
  });
};

export const showError = (message: string) => {
  toast.error(message, {
    duration: 2000,
    position: "top-right",
  });
};

export const showWarning = (message: string) => {
  toast.warning(message, {
    duration: 2000,
    position: "top-right",
  });
};

export const showConfirm = (
  message: string,
  description: string,
  onConfirm: () => void,
  label: string
) => {
  toast.warning(message, {
    description,
    action: {
      label: label,
      onClick: onConfirm,
    },
    duration: 2000,
    position: "top-right",
  });
};
