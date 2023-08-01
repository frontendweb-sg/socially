"use client";
import classNames from "classnames";
import useTags from "@/hooks/useTags";
import Box from "../Box";
import Input from "../Input";
import TagCreatorList from "./TagCreatorList";
import Chip from "./Chip";
import { ReactElement, ReactNode, memo } from "react";

type TagProps<T> = SelectProps<T> & {
  startIcon?: ReactElement;
  children?: ReactNode;
};
const TagCreator = <T extends Readonly<T>>({
  options,
  defaultValues,
  getOptionLabel,
  keyExtractor,
  setValues,
  startIcon,
  children,
}: TagProps<T>) => {
  const classes = classNames("tags");

  const {
    isOpen,
    tagRef,
    currentIndex,
    inputValue,
    filteredOptions,

    handleChange,
    onRemoveItem,
    addItem,
    onKeyHandler,
    openHandler,
  } = useTags({
    options,
    defaultValues,
    getOptionLabel,
    keyExtractor,
    setValues,
  });

  return (
    <Box className={classes} onKeyDown={onKeyHandler}>
      {defaultValues?.length !== 0 && (
        <Box className="tags-list-inline">
          {defaultValues?.map((row: T, index: number) => (
            <Chip
              key={keyExtractor?.(row) ?? index}
              label={getOptionLabel?.(row)!}
              onRemove={() => onRemoveItem(row)}
            />
          ))}
        </Box>
      )}

      <Box ref={tagRef}>
        <Box className="form-control-input">
          <Box className="">
            {startIcon}
            <Input
              onFocus={openHandler}
              value={inputValue}
              name="name"
              onChange={handleChange}
              placeholder="Select or generate new tag"
            />
          </Box>
          {children}
        </Box>
        {isOpen && (
          <TagCreatorList
            options={filteredOptions}
            getOptionLabel={getOptionLabel}
            currentIndex={currentIndex}
            selectedItems={defaultValues!}
            addItem={addItem}
          />
        )}
      </Box>
    </Box>
  );
};

export default memo(TagCreator) as typeof TagCreator;
