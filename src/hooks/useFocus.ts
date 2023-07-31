import { inputRef } from "@/components/controls/Input";
import { useEffect, useRef } from "react";

export default function useFocus() {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  return ref;
}
