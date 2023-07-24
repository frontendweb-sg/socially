"use client";

import Box from "./Box";
import classNames from "classnames";
import useToggle from "@/hooks/useToggle";
import Input from "./Input";
import { devEnv } from "@/lib/devEnv";
import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Props<T> = {
  options: T[];
  values: T[];
  getOptionLabel?: (option: T) => string;
};
const TagCreator = <T extends Readonly<T>>({
  options,
  values,
  getOptionLabel,
}: Props<T>) => {
  const classes = classNames("tags");

  const tagRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [tags, setTags] = useState<T[]>(values);

  const { closeHandler, isOpen, openHandler } = useToggle();

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.stopPropagation();
    setInputValue(ev.target.value);
  };

  useClickOutside(tagRef, closeHandler);

  const filteredOptions = useMemo(() => {
    setCurrentIndex(0);
    return inputValue
      ? options.filter((value: T) =>
          getOptionLabel?.(value)
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        )
      : options;
  }, [inputValue, getOptionLabel, options]);

  const addItem = useCallback(
    (value?: T) => {
      const itemExist = tags?.find(
        (item: T) => getOptionLabel?.(item) === getOptionLabel?.(value!)
      );
      if (itemExist) {
        console.log("HI", itemExist);
      } else {
        const newItem = {
          id: Math.floor(Math.random() * 100 + 1),
          title: inputValue,
        } as unknown as T;
        setTags((prev: T[]) => [...prev, newItem]);
      }
    },
    [inputValue, getOptionLabel, tags]
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

  const handler = useCallback(
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
          if (exist) {
            console.log(exist);
          } else {
            addItem();
          }
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
  console.log("HI");
  return (
    <Box ref={tagRef} className={classes} onKeyDown={handler}>
      <ul>
        {tags?.map((row: T, index: number) => (
          <li key={index}> {getOptionLabel?.(row)}</li>
        ))}
      </ul>
      <Input
        onFocus={openHandler}
        value={inputValue}
        name="name"
        onChange={handleChange}
        placeholder="Select or generate new tag"
      />
      {isOpen && (
        <TagCreatorDropdown
          options={filteredOptions}
          getOptionLabel={getOptionLabel}
          currentIndex={currentIndex}
        />
      )}
    </Box>
  );
};

type creatorDropdownProps<T> = React.HtmlHTMLAttributes<HTMLDivElement> & {
  options: T[];
  currentIndex: number;
  getOptionLabel?: (option: T) => string;
};
const TagCreatorDropdown = <T extends unknown>({
  options = [],
  currentIndex = 0,
  getOptionLabel,
  children,
  ...rest
}: creatorDropdownProps<T>) => {
  return (
    <Box>
      <ul className="dropdown">
        {options.length ? (
          options.map((row: T, index: number) => (
            <li
              style={{ color: currentIndex === index ? "red" : "grey" }}
              key={index}
            >
              {getOptionLabel?.(row)}
            </li>
          ))
        ) : (
          <li style={{ color: "green" }}>Create new tag</li>
        )}
      </ul>
    </Box>
  );
};

export default memo(TagCreator) as typeof TagCreator;
