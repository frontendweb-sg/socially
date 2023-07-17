import { useState } from "react";

export default function useToggle() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => setIsOpen(true);
  const closeHandler = () => setIsOpen(false);
  const toggleHandler = () => setIsOpen((prev) => !prev);

  return {
    isOpen,
    openHandler,
    closeHandler,
    toggleHandler,
  };
}
