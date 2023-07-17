import classNames from "classnames";
import Box from "../Box";
import Component from "../Component";
import Button, { ButtonProps } from "../Button";
import useToggle from "@/hooks/useToggle";
import { ReactElement, createContext, useContext, useRef } from "react";
import { forwardRef } from "react";
import { FaEllipsisV } from "react-icons/fa";
import DropdownBody from "./DropdownBody";
import { useClickOutside } from "@/hooks/useClickOutside";

type As = "div" | "li";
export type DropdownProps = React.HtmlHTMLAttributes<
  HTMLDivElement | HTMLLIElement
> & {
  as?: As;
  title?: ReactElement | string;
  buttonProps?: ButtonProps;
};

export type dropdownRef = HTMLDivElement | HTMLLIElement;
const Dropdown = forwardRef<dropdownRef, DropdownProps>(
  (
    {
      children,
      as = "div",
      title = <FaEllipsisV />,
      className,
      buttonProps,
      ...rest
    },
    ref
  ) => {
    const { isOpen, toggleHandler, closeHandler } = useToggle();
    const classes = classNames("dropdown", className);
    const btnClass = classNames("dropdown-toggle", isOpen && "show");
    const refs = useRef<dropdownRef>(null);

    useClickOutside(refs, closeHandler);

    return (
      <Component as={as} className={classes} ref={refs} {...rest}>
        <Button
          as="icon"
          variant="outline"
          size="xs"
          className={btnClass}
          onClick={toggleHandler}
          {...buttonProps}
        >
          {title}
        </Button>
        <DropdownBody isOpen={isOpen}>{children}</DropdownBody>
      </Component>
    );
  }
);

export default Dropdown;
