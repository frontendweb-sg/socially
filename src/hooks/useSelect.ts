import useToggle from "./useToggle";
import useFocus from "./useFocus";
import {
  useMemo,
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
  KeyboardEvent,
} from "react";
import { devEnv } from "@/lib/devEnv";
import { getKeyByValue } from "@/utils";
import { v4 as uuidv4 } from "uuid";

function useSelect<T extends Readonly<T>>({
  options,
  defaultValue,
  getOptionLabel,
  keyExtractor,
  setValues,
  isMulti,
}: SelectProps<T>) {
  const [searchText, setSearchText] = useState("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputText, setInputText] = useState("");

  const inpRef = useFocus();

  const { isOpen, openHandler, closeHandler } = useToggle();

  const filteredOptions = useMemo(() => {
    return options.filter((option: T) => {
      let filter = getOptionLabel?.(option);
      const key = getKeyByValue(option, keyExtractor?.(option)!);
      if (key) filter = option[key as keyof T];
      return filter?.toLowerCase().includes(searchText.toLowerCase());
    });
  }, [options, getOptionLabel, keyExtractor, searchText]);

  const onSearch = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    ev.stopPropagation();
    setInputText("");
    setSearchText(ev.target.value);
  }, []);

  const findByLabel = useCallback(
    (value: T) =>
      Array.isArray(defaultValue)
        ? defaultValue?.find(
            (item: T) => getOptionLabel?.(item) === getOptionLabel?.(value!)
          )
        : null,
    [defaultValue, getOptionLabel]
  );

  const onRemoveItem = useCallback(
    (item: T) => {
      const items = Array.isArray(defaultValue) ? defaultValue : [];
      const filterItems = items.filter(
        (row: T) => getOptionLabel?.(row) !== getOptionLabel?.(item)
      );
      setValues?.(filterItems);
      inpRef.current?.focus();
    },
    [setValues, defaultValue, inpRef, getOptionLabel]
  );

  const addItem = useCallback(
    (item?: T) => {
      let exist = findByLabel(item!);
      if (exist) onRemoveItem(exist);
      else {
        const items = Array.isArray(defaultValue) ? defaultValue : [];
        if (item) {
          !isMulti && setInputText(getOptionLabel?.(item! as T)!);
          setValues?.(isMulti ? [...items, item] : item);
        } else {
          const newItem = {
            id: uuidv4(),
            [getKeyByValue(
              options[0],
              keyExtractor ? keyExtractor?.(item!)! : getOptionLabel?.(item!)!
            ) ?? "label"]: searchText,
          } as unknown as T;
          exist = findByLabel(newItem!);
          if (!exist) setValues?.(isMulti ? [...items, newItem] : newItem);
        }
      }
    },
    [
      isMulti,
      options,
      searchText,
      setValues,
      findByLabel,
      keyExtractor,
      defaultValue,
      getOptionLabel,
      onRemoveItem,
    ]
  );

  const onKeyHandler = useCallback(
    (ev: KeyboardEvent) => {
      const { code } = ev;
      const optionsLen = filteredOptions.length - 1;
      switch (code) {
        case "ArrowUp":
          openHandler();
          setCurrentIndex((current) =>
            current === 0 ? optionsLen : (current = current - 1)
          );
          break;
        case "ArrowDown":
          openHandler();
          setCurrentIndex((current) =>
            current < optionsLen ? (current = current + 1) : 0
          );
          break;
        case "Enter":
          ev.preventDefault();
          ev.stopPropagation();
          setSearchText("");
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
    [openHandler, closeHandler, addItem, currentIndex, filteredOptions]
  );

  return {
    isOpen,
    searchText,
    currentIndex,
    inputText,
    filteredOptions,
    onSearch,
    openHandler,
    closeHandler,
    onRemoveItem,
    setCurrentIndex,
    addItem,
    onKeyHandler,
    setInputText,
  };
}

export default useSelect;
