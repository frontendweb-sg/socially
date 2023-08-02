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
  startIcon,
  children,
  keyExtractor,
  defaultValue,
  getOptionLabel,
  isMulti,
  ...rest
}: TagProps<T>) => {
  const classes = classNames("tags");

  const {
    inpRef,
    isOpen,
    tagRef,
    currentIndex,
    search,
    textValue,
    filteredOptions,
    handleChange,
    onRemoveItem,
    addItem,
    onKeyHandler,
    openHandler,
  } = useTags({
    keyExtractor,
    defaultValue,
    getOptionLabel,
    isMulti,
    ...rest,
  });
  console.log("defaultValue", defaultValue);
  let element = null;
  if (Array.isArray(defaultValue)) {
    element = defaultValue?.length !== 0 && (
      <Box className="tags-list-inline">
        {defaultValue?.map((row: T, index: number) => (
          <Chip
            key={keyExtractor?.(row) ?? index}
            label={getOptionLabel?.(row)!}
            onRemove={(ev?: React.MouseEvent<HTMLButtonElement>) => {
              ev?.preventDefault();
              onRemoveItem(row);
            }}
          />
        ))}
      </Box>
    );
  }

  return (
    <Box className={classes} onKeyDown={onKeyHandler}>
      {isMulti && element}

      <Box ref={tagRef}>
        <Box className="form-control-input">
          <Input
            ref={inpRef}
            startIcon={startIcon}
            value={search || textValue}
            name="name"
            onClick={openHandler}
            onChange={handleChange}
            placeholder="Select or generate new tag"
          >
            {children}
          </Input>
        </Box>
        {isOpen && (
          <TagCreatorList
            options={filteredOptions}
            getOptionLabel={getOptionLabel}
            currentIndex={currentIndex}
            defaultValues={defaultValue!}
            addItem={addItem}
          />
        )}
      </Box>
    </Box>
  );
};

export default memo(TagCreator) as typeof TagCreator;
