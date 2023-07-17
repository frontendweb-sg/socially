import { useCallback, useEffect, RefObject } from "react";

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  fn?: () => void
) {
  const handler = useCallback(
    (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        fn?.();
      }
    },
    [ref, fn]
  );

  useEffect(() => {
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [handler]);
}
