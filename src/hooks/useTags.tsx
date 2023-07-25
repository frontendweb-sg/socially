import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import useToggle from "./useToggle";
import { useClickOutside } from "./useClickOutside";
import { devEnv } from "@/lib/devEnv";
import { getKeyByValue } from "@/utils";

export default function useTags<T extends unknown>({
  options,
  defaultValues,
  getOptionLabel,
  keyExtractor,
  setValues,
}: SelectProps<T>) {
  const tagRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");

  const { closeHandler, isOpen, openHandler } = useToggle();

  useClickOutside(tagRef, closeHandler);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.stopPropagation();
    setInputValue(ev.target.value);
  };

  const filteredOptions = useMemo(() => {
    if (inputValue.length) setCurrentIndex(0);
    return inputValue
      ? options.filter((item: T) => {
          let filter = getOptionLabel?.(item);
          const key = getKeyByValue(item, keyExtractor?.(item)!);
          if (key) {
            filter = item[key as keyof T];
          }
          return filter?.toLowerCase().includes(inputValue.toLowerCase());
        })
      : options;
  }, [inputValue, getOptionLabel, keyExtractor, options]);

  const onRemoveItem = useCallback(
    (item: T) => {
      const items = [...defaultValues!];
      const filterItems = items.filter(
        (row: T) => getOptionLabel?.(row) !== getOptionLabel?.(item)
      );
      setValues?.("tags", filterItems);
    },
    [setValues, defaultValues, getOptionLabel]
  );

  const addItem = useCallback(
    (value?: T) => {
      const itemExist = defaultValues?.find(
        (item: T) => getOptionLabel?.(item) === getOptionLabel?.(value!)
      );
      if (itemExist) {
        onRemoveItem(itemExist);
      } else {
        if (value) {
          setValues?.("tags", [...defaultValues!, value]);
        } else {
          const newItem = {
            id: Math.floor(Math.random() * 100 + 1),
            [getKeyByValue(options[0], getOptionLabel?.(value!)!) ?? "label"]:
              inputValue,
          } as unknown as T;

          console.log("HI");
          setValues?.("tags", [...defaultValues!, newItem]);
        }
      }
    },
    [
      inputValue,
      getOptionLabel,
      options,
      onRemoveItem,
      setValues,
      defaultValues,
    ]
  );

  const handlerDown = useCallback(
    (len: number) => {
      openHandler();
      if (!isOpen) return;
      setCurrentIndex((current) =>
        current < len ? (current = current + 1) : 0
      );
    },
    [openHandler, isOpen]
  );

  const handlerUp = useCallback(
    (len: number) => {
      openHandler();
      if (!isOpen) return;
      setCurrentIndex((current) =>
        current === 0 ? len : (current = current - 1)
      );
    },
    [openHandler, isOpen]
  );

  const onKeyHandler = useCallback(
    (event: KeyboardEvent) => {
      const { code } = event;
      const optionsLen = filteredOptions.length - 1;
      switch (code) {
        case "ArrowUp":
          handlerUp(optionsLen);
          break;
        case "ArrowDown":
          handlerDown(optionsLen);
          break;
        case "Enter":
          event.preventDefault();
          event.stopPropagation();
          const exist = filteredOptions.find(
            (_v, index) => index === currentIndex
          );
          if (exist) addItem(exist);
          else addItem();
          break;
        case "Escape":
          closeHandler();
          break;
        default:
          devEnv("Wrong key, please up,down and esc to close!");
          break;
      }
    },
    [
      handlerUp,
      handlerDown,
      filteredOptions,
      addItem,
      closeHandler,
      currentIndex,
    ]
  );

  return {
    tagRef,
    isOpen,
    currentIndex,
    inputValue,
    filteredOptions,
    openHandler,
    handleChange,
    onRemoveItem,
    addItem,
    onKeyHandler,
  };
}
