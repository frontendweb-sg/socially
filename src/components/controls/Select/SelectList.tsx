import React, { forwardRef, memo } from "react";
import Box from "../Box";
import classNames from "classnames";
import { FaCircle } from "react-icons/fa";

type Props<T> = SelectProps<T> &
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    currentIndex?: number;
  };
const SelectList = forwardRef(
  <T extends Readonly<T>>(
    {
      className,
      children,
      options,
      currentIndex,
      defaultValue,
      getOptionLabel,
      ...rest
    }: Props<T>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classes = classNames("select-menu", className);

    const activeElement = (row: T) =>
      Array.isArray(defaultValue) &&
      defaultValue?.find(
        (item: T) => getOptionLabel?.(item) === getOptionLabel?.(row)
      ) ? (
        <FaCircle />
      ) : null;

    return (
      <Box ref={ref} className={classes}>
        {options.map((option: T, index: number) => (
          <div
            className={classNames(
              "select-menu-item",
              currentIndex === index && "active"
            )}
            key={getOptionLabel?.(option)}
          >
            {Array.isArray(defaultValue)
              ? activeElement(option)
              : getOptionLabel?.(defaultValue as T) ===
                  getOptionLabel?.(option) && <FaCircle />}
            {getOptionLabel?.(option)}
          </div>
        ))}
      </Box>
    );
  }
);

export default memo(SelectList) as typeof SelectList;
