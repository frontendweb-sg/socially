import { useCallback, useState } from "react";

export type IConfirm = {
  open?: boolean;
  label?: string;
  content?: string;
  onSubmit?: () => void;
};
export default function useConfirmation() {
  const [confirm, setConfirm] = useState<IConfirm>({
    open: false,
    label: "Delete",
    content: "Are you sure?",
    onSubmit: () => {},
  });

  const onConfirm = useCallback(
    async ({
      open = true,
      label = "Delete",
      content = "Are you sure?",
      onSubmit,
    }: IConfirm) => {
      setConfirm((prev) => ({ ...prev, label, content, open, onSubmit }));
    },
    []
  );

  const onCancelConfirm = useCallback(() => {
    setConfirm({ open: false, label: "", content: "" });
  }, []);

  return {
    confirm,
    onConfirm,
    onCancelConfirm,
  };
}
