import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import useToggle from "./useToggle";
import { useClickOutside } from "./useClickOutside";
import { devEnv } from "@/lib/devEnv";
import { getKeyByValue } from "@/utils";
import useFocus from "./useFocus";

export default function useTags<T extends unknown>({
  options,
  defaultValues,
  getOptionLabel,
  keyExtractor,
  setValues,
  isMulti,
}: SelectProps<T>) {
  const tagRef = useRef<HTMLDivElement>(null);
  const inpRef = useFocus();
  const [textValue, setTextValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  const { closeHandler, isOpen, openHandler } = useToggle();

  useClickOutside(tagRef, closeHandler);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.stopPropagation();
    setTextValue("");
    setSearch(ev.target.value);
  };

  const filteredOptions = useMemo(() => {
    if (search.length) setCurrentIndex(0);
    return search
      ? options.filter((item: T) => {
          let filter = getOptionLabel?.(item);
          const key = getKeyByValue(item, keyExtractor?.(item)!);
          if (key) {
            filter = item[key as keyof T];
          }
          return filter?.toLowerCase().includes(search.toLowerCase());
        })
      : options;
  }, [search, getOptionLabel, keyExtractor, options]);

  const onRemoveItem = useCallback(
    (item: T) => {
      const items = [...(Array.isArray(defaultValues) ? defaultValues! : [])];
      const filterItems = items.filter(
        (row: T) => getOptionLabel?.(row) !== getOptionLabel?.(item)
      );
      setValues?.(filterItems);
      inpRef.current?.focus();
    },
    [setValues, defaultValues, inpRef, getOptionLabel]
  );

  // find by label
  const findByLabel = useCallback(
    (value: T) =>
      Array.isArray(defaultValues)
        ? defaultValues?.find(
            (item: T) => getOptionLabel?.(item) === getOptionLabel?.(value!)
          )
        : null,
    [defaultValues, getOptionLabel]
  );

  const addItem = useCallback(
    (value?: T) => {
      let itemExist = findByLabel(value!);
      if (itemExist) {
        onRemoveItem(itemExist);
      } else {
        if (value) {
          console.log(value, "v");
          setValues?.(
            isMulti
              ? [...(Array.isArray(defaultValues) ? defaultValues! : []), value]
              : value
          );
        } else {
          const newItem = {
            id: Math.floor(Math.random() * 100 + 1),
            [getKeyByValue(options[0], getOptionLabel?.(value!)!) ?? "label"]:
              search,
          } as unknown as T;

          itemExist = findByLabel(newItem!);
          if (itemExist) {
            onRemoveItem(itemExist);
          } else {
            setValues?.(
              isMulti
                ? [
                    ...(Array.isArray(defaultValues) ? defaultValues! : []),
                    newItem,
                  ]
                : newItem
            );
          }
        }
      }
      inpRef.current?.focus();
    },
    [
      isMulti,
      inpRef,
      search,
      getOptionLabel,
      options,
      onRemoveItem,
      setValues,
      defaultValues,
      findByLabel,
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
      console.log(code, "code");
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
          setSearch("");
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

  useEffect(() => {
    if (typeof defaultValues === "object" && defaultValues && !isMulti) {
      setTextValue(getOptionLabel?.(defaultValues as T)!);
    }

    if (typeof defaultValues === "string" && defaultValues && !isMulti) {
      setTextValue(defaultValues);
    }
    return () => {};
  }, [getOptionLabel, defaultValues, setTextValue, isMulti]);

  console.log("HI", textValue, isOpen);
  return {
    inpRef,
    tagRef,
    isOpen,
    currentIndex,
    search,
    textValue,
    filteredOptions,
    openHandler,
    closeHandler,
    handleChange,
    onRemoveItem,
    addItem,
    onKeyHandler,
  };
}
