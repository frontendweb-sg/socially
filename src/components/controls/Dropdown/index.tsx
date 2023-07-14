import classNames from "classnames";
import Box from "../Box";
import Component from "../Component";
import { forwardRef } from "react";

export type DropdownProps = React.HtmlHTMLAttributes<
  HTMLDivElement | HTMLLIElement
> & {
  as?: string;
};

export type dropdownRef = HTMLDivElement | HTMLLIElement;
const Dropdown = forwardRef<dropdownRef, DropdownProps>(
  ({ children, as = "div", className, ...rest }, ref) => {
    const classes = classNames("dropdown");
    return (
      <Component as={as} className={classes} ref={ref!}>
        {children}
      </Component>
    );
  }
);

export default Dropdown;
