import Box from "../Box";
import classNames from "classnames";
import Input from "../Input";
import SelectList from "./SelectList";
import { memo, useRef, type ReactElement } from "react";
import useSelect from "@/hooks/useSelect";
import { useClickOutside } from "@/hooks/useClickOutside";

type Props<T> = SelectProps<T> &
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    startIcon?: ReactElement;
    endIcon?: ReactElement;
  };
const Select = <T extends Readonly<T>>({
  className,
  children,
  startIcon,
  endIcon,
  defaultValue,
  getOptionLabel = (option: any) => option?.label,
  keyExtractor,
  options,
  setValues,
  ...rest
}: Props<T>) => {
  const classes = classNames("select", className);

  const {
    isOpen,
    inpRef,
    inputText,
    selectRef,
    searchText,
    currentIndex,
    filteredOptions,
    onSearch,
    openHandler,
    onKeyHandler,
  } = useSelect({
    options,
    defaultValue,
    getOptionLabel,
    keyExtractor,
    setValues,
  });

  console.log("Hi", currentIndex);
  return (
    <Box onKeyUp={onKeyHandler} ref={selectRef} className={classes}>
      <Input
        className={classNames("select-input")}
        startIcon={startIcon}
        placeholder="Select..."
        value={searchText ?? inputText}
        onChange={onSearch}
        onClick={openHandler}
        ref={inpRef}
      />
      {isOpen && (
        <SelectList
          options={filteredOptions}
          getOptionLabel={getOptionLabel}
          currentIndex={currentIndex}
          defaultValue={defaultValue}
        />
      )}
    </Box>
  );
};

export default memo(Select) as typeof Select;
