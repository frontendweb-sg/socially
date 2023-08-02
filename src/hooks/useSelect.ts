import {
  ChangeEvent,
  useMemo,
  KeyboardEvent,
  useCallback,
  useState,
  useRef,
} from "react";
import useToggle from "./useToggle";
import { devEnv } from "@/lib/devEnv";
import { getKeyByValue } from "@/utils";
import { useClickOutside } from "./useClickOutside";
import useFocus from "./useFocus";

function useSelect<T extends Readonly<T>>({
  options,
  defaultValue,
  getOptionLabel,
  keyExtractor,
  setValues,
  isMulti,
}: SelectProps<T>) {
  const [searchText, setSearchText] = useState("");
  const [inputText, setInputText] = useState("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { isOpen, openHandler, closeHandler } = useToggle();

  const selectRef = useRef<HTMLDivElement>(null);
  const inpRef = useFocus();

  useClickOutside(selectRef, () => {
    closeHandler();
    setCurrentIndex(0);
  });

  const onSearch = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    ev.stopPropagation();
    setInputText("");
    setSearchText(ev.target.value);
  }, []);

  // filtered options
  const filteredOptions = useMemo(() => {
    if (searchText.length) setCurrentIndex(0);

    return searchText
      ? options.filter((option: T) => {
          let filter = getOptionLabel?.(option);
          const key = getKeyByValue(option, keyExtractor?.(option)!);
          if (key) filter = option[key as keyof T];
          return filter?.toLowerCase().includes(searchText.toLowerCase());
        })
      : options;
  }, [searchText, getOptionLabel, keyExtractor, options]);

  const onRemoveItem = useCallback(
    (item: T) => {
      const items = [...(Array.isArray(defaultValue) ? defaultValue! : [])];
      const filterItems = items.filter(
        (row: T) => getOptionLabel?.(row) !== getOptionLabel?.(item)
      );
      setValues?.(filterItems);
      inpRef.current?.focus();
    },
    [setValues, defaultValue, inpRef, getOptionLabel]
  );

  const onKeyHandler = useCallback(
    (ev: KeyboardEvent) => {
      const { code } = ev;
      const optionsLen = filteredOptions.length - 1;
      switch (code) {
        case "ArrowUp":
          setCurrentIndex((current) =>
            current === 0 ? optionsLen : (current = current - 1)
          );
          break;
        case "ArrowDown":
          setCurrentIndex((current) =>
            current < optionsLen ? (current = current + 1) : 0
          );
          break;
        case "Enter":
          ev.preventDefault();
          ev.stopPropagation();
        default:
          closeHandler();
          break;
      }
    },
    [closeHandler, filteredOptions]
  );

  return {
    inpRef,
    selectRef,
    isOpen,
    searchText,
    inputText,
    currentIndex,
    filteredOptions,
    onSearch,
    openHandler,
    closeHandler,
    onKeyHandler,
    onRemoveItem,
  };
}

export default useSelect;
