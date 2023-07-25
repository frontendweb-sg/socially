"use client";
import classNames from "classnames";
import useTags from "@/hooks/useTags";
import Box from "../Box";
import Input from "../Input";
import { memo } from "react";
import { FaCircle } from "react-icons/fa";
import TagCreatorList from "./TagCreatorList";
import Chip from "./Chip";

const TagCreator = <T extends Readonly<T>>({
  options,
  defaultValues,
  getOptionLabel,
  keyExtractor,
}: SelectProps<T>) => {
  const classes = classNames("tags");

  const {
    isOpen,
    tagRef,
    currentIndex,
    inputValue,
    selectedItems,
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
  });

  return (
    <Box className={classes} onKeyDown={onKeyHandler}>
      {selectedItems.length !== 0 && (
        <Box className="tags-list-inline">
          {selectedItems?.map((row: T, index: number) => (
            <Chip
              key={keyExtractor?.(row) ?? index}
              label={getOptionLabel?.(row)!}
              onRemove={() => onRemoveItem(row)}
            />
          ))}
        </Box>
      )}

      <Box ref={tagRef}>
        <Input
          onFocus={openHandler}
          value={inputValue}
          name="name"
          onChange={handleChange}
          placeholder="Select or generate new tag"
        />
        {isOpen && (
          <TagCreatorList
            options={filteredOptions}
            getOptionLabel={getOptionLabel}
            currentIndex={currentIndex}
            selectedItems={selectedItems}
          />
        )}
      </Box>
    </Box>
  );
};

export default memo(TagCreator) as typeof TagCreator;
