import classNames from "classnames";
import Box from "../Box";
import { memo } from "react";
import { FaCircle } from "react-icons/fa";

type Props<T> = SelectProps<T> &
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    currentIndex: number;
    selectedItems: T[];
  };

const TagCreatorList = <T extends unknown>({
  options = [],
  currentIndex = 0,
  getOptionLabel,
  children,
  className,
  selectedItems,
  ...rest
}: Props<T>) => {
  const classes = classNames("tags-menu", className);
  return (
    <Box className={classes} {...rest}>
      <ul className="tags-list">
        {options.length ? (
          options.map((row: T, index: number) => (
            <li key={index} className={currentIndex === index ? "active" : ""}>
              {selectedItems.find(
                (item) => getOptionLabel?.(item) === getOptionLabel?.(row)
              ) ? (
                <FaCircle />
              ) : null}
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
