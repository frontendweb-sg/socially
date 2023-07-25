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

export default function useTags<T extends unknown>({
  options,
  defaultValues,
  getOptionLabel,
  keyExtractor,
}: SelectProps<T>) {
  const tagRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<T[]>(defaultValues!);

  const { closeHandler, isOpen, openHandler } = useToggle();

  useClickOutside(tagRef, closeHandler);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.stopPropagation();
    setInputValue(ev.target.value);
  };

  const filteredOptions = useMemo(() => {
    setCurrentIndex(0);
    return inputValue
      ? options.filter((value: T) => {
          let filter = getOptionLabel?.(value);
          if (keyExtractor?.(value)) {
            filter = value[keyExtractor?.(value) as keyof T];
          }
          return filter?.toLowerCase().includes(inputValue.toLowerCase());
        })
      : options;
  }, [inputValue, getOptionLabel, keyExtractor, options]);

  const onRemoveItem = useCallback(
    (item: T) => {
      const items = [...selectedItems];
      const filterItems = items.filter(
        (row: T) => getOptionLabel?.(row) !== getOptionLabel?.(item)
      );
      setSelectedItems(filterItems);
    },
    [selectedItems, getOptionLabel]
  );

  const addItem = useCallback(
    (value?: T) => {
      const itemExist = selectedItems?.find(
        (item: T) => getOptionLabel?.(item) === getOptionLabel?.(value!)
      );
      if (itemExist) {
        onRemoveItem(itemExist);
      } else {
        if (value) {
          setSelectedItems((prev: T[]) => [...prev, value]);
        } else {
          const newItem = {
            id: Math.floor(Math.random() * 100 + 1),
            title: inputValue,
          } as unknown as T;
          setSelectedItems((prev: T[]) => [...prev, newItem]);
        }
      }
    },
    [inputValue, getOptionLabel, onRemoveItem, selectedItems]
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
    selectedItems,
    filteredOptions,
    openHandler,
    handleChange,
    onRemoveItem,
    addItem,
    onKeyHandler,
  };
}
