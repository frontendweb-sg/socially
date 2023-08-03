import Box from "../Box";
import classNames from "classnames";
import React, { forwardRef, memo, useEffect, useRef } from "react";
import { FaCircle } from "react-icons/fa";
import PropTypes from "prop-types";

type Props<T> = SelectProps<T> &
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    currentIndex?: number;
    addItem?: (option: T) => void;
  };

const SelectList = forwardRef(
  <T extends Readonly<T>>(
    {
      className,
      options,
      currentIndex,
      defaultValue,
      getOptionLabel,
      addItem,
    }: Props<T>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classes = classNames("select-menu", className);
    const containerRef = useRef<HTMLDivElement>(null);

    const activeElement = (row: T) =>
      Array.isArray(defaultValue) &&
      defaultValue?.find(
        (item: T) => getOptionLabel?.(item) === getOptionLabel?.(row)
      ) ? (
        <FaCircle size="10px" className="me-2 text-secondary" />
      ) : null;

    useEffect(() => {
      if (!containerRef.current) return;
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, [currentIndex]);

    return (
      <Box ref={ref} className={classes}>
        {options.length > 0 ? (
          options.map((option: T, index: number) => (
            <div
              onClick={() => addItem?.(option)}
              className={classNames(
                "select-menu-item",
                currentIndex === index && "active"
              )}
              ref={index === currentIndex ? containerRef : null}
              key={getOptionLabel?.(option)}
            >
              {Array.isArray(defaultValue)
                ? activeElement(option)
                : getOptionLabel?.(defaultValue as T) ===
                    getOptionLabel?.(option) && (
                    <FaCircle size="10px" className="me-2 text-secondary" />
                  )}
              {getOptionLabel?.(option)}
            </div>
          ))
        ) : (
          <div className={classNames("select-menu-item")}>
            No match document
          </div>
        )}
      </Box>
    );
  }
);

export default memo(SelectList) as typeof SelectList;
