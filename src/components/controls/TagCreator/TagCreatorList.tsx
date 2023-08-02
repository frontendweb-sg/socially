import classNames from "classnames";
import Box from "../Box";
import { memo } from "react";
import { FaCircle } from "react-icons/fa";

type Props<T> = SelectProps<T> &
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    currentIndex: number;
    defaultValues: string | T | T[];
    addItem: (option: T) => void;
  };

const TagCreatorList = <T extends unknown>({
  options = [],
  currentIndex = 0,
  getOptionLabel,
  children,
  className,
  defaultValues,
  addItem,
  ...rest
}: Props<T>) => {
  const classes = classNames("tags-menu", className);

  const activeElement = (row: T) =>
    Array.isArray(defaultValues) &&
    defaultValues?.find(
      (item) => getOptionLabel?.(item) === getOptionLabel?.(row)
    ) ? (
      <FaCircle />
    ) : null;

  return (
    <Box className={classes} {...rest}>
      <ul className="tags-list">
        {options.length ? (
          options.map((row: T, index: number) => (
            <li
              onClick={() => addItem(row)}
              key={index}
              className={currentIndex === index ? "active" : ""}
            >
              {Array.isArray(defaultValues)
                ? activeElement(row)
                : getOptionLabel?.(defaultValues as T) ===
                    getOptionLabel?.(row) && <FaCircle />}
              {getOptionLabel?.(row)}
            </li>
          ))
        ) : (
          <li style={{ color: "green" }}>Create (new tag)</li>
        )}
      </ul>
    </Box>
  );
};

export default memo(TagCreatorList) as typeof TagCreatorList;
