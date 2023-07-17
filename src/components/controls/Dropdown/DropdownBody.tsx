import classNames from "classnames";
import Box from "../Box";
import { memo, useContext } from "react";

type DropdownBodyProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
};

/**
 * Dropdown body component
 * @param param0
 * @returns
 */
const DropdownBody = ({
  isOpen = false,
  children,
  className,
  ...rest
}: DropdownBodyProps) => {
  const classes = classNames("dropdown-menu", isOpen && "show", className);

  return (
    <Box className={classes} {...rest}>
      {children}
    </Box>
  );
};

export default memo(DropdownBody);
