import Box from "../Box";
import classNames from "classnames";
import Input from "../Input";
import SelectList from "./SelectList";
import useSelect from "@/hooks/useSelect";
import Chip from "./Chip";
import { memo, useRef, type ReactElement } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import PropTypes from "prop-types";
import IconButton from "../IconButton";
import { FaCaretDown, FaCaretUp, FaTimes } from "react-icons/fa";
type Props<T> = SelectProps<T> &
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    startIcon?: ReactElement;
    endIcon?: ReactElement;
  };
const Select = <T extends Readonly<T>>({
  className,
  startIcon,
  defaultValue,
  getOptionLabel = (option: any) => option?.label,
  keyExtractor,
  options,
  children,
  setValues,
  isMulti,
  isClear,
}: Props<T>) => {
  const classes = classNames("select", className);
  const selectRef = useRef<HTMLDivElement>(null);

  const {
    isOpen,
    inputText,
    searchText,
    currentIndex,
    filteredOptions,
    onKeyHandler,
    openHandler,
    closeHandler,
    setCurrentIndex,
    onSearch,
    addItem,
    onRemoveItem,
    setInputText,
  } = useSelect({
    options,
    defaultValue,
    getOptionLabel,
    keyExtractor,
    setValues,
    isMulti,
    isClear,
  });

  useClickOutside(selectRef, () => {
    closeHandler();
    setCurrentIndex(0);
  });

  const onClear = () => {
    setValues?.(null);
    setInputText("");
  };

  const values = Array.isArray(defaultValue) ? defaultValue : [];
  return (
    <Box onKeyUp={onKeyHandler} ref={selectRef} className={classes}>
      <Box className="select-input">
        {values.map((item: T, index: number) => (
          <Chip
            key={keyExtractor?.(item) ?? index}
            label={getOptionLabel?.(item)!}
            onRemove={(ev?: React.MouseEvent<HTMLButtonElement>) => {
              ev?.preventDefault();
              onRemoveItem?.(item);
            }}
          />
        ))}
        <Input
          startIcon={startIcon}
          endIcon={
            isClear ? (
              <IconButton icon={<FaTimes />} onClick={onClear} />
            ) : (
              <></>
            )
          }
          placeholder="Select..."
          value={searchText || inputText}
          onChange={onSearch}
          onClick={openHandler}
        >
          {isOpen ? (
            <FaCaretUp className="ms-2" />
          ) : (
            <FaCaretDown className="ms-2" />
          )}
        </Input>
      </Box>
      {isOpen && (
        <SelectList
          options={filteredOptions}
          getOptionLabel={getOptionLabel}
          currentIndex={currentIndex}
          defaultValue={defaultValue}
          addItem={addItem}
        />
      )}
    </Box>
  );
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  defaultValue: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
  getOptionLabel: PropTypes.func,
};

export default memo(Select);
