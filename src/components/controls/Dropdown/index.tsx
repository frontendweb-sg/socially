import classNames from "classnames";
import Component from "../Component";
import useToggle from "@/hooks/useToggle";
import IconButton, { type iconButtonProps } from "../IconButton";
import DropdownBody from "./DropdownBody";
import { ReactElement, useRef } from "react";
import { forwardRef } from "react";
import { FaEllipsisH, FaEllipsisV } from "react-icons/fa";
import { useClickOutside } from "@/hooks/useClickOutside";

type As = "div" | "li";
export type DropdownProps = React.HtmlHTMLAttributes<
  HTMLDivElement | HTMLLIElement
> & {
  as?: As;
  title?: ReactElement | string;
  buttonProps?: iconButtonProps;
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
    const btnClass = classNames(isOpen && "show");
    const refs = useRef<dropdownRef>(null);

    useClickOutside(refs, closeHandler);

    return (
      <Component as={as} className={classes} ref={refs} {...rest}>
        <IconButton
          icon={<FaEllipsisH size={16} />}
          size="xs"
          variant="text"
          className={btnClass}
          onClick={toggleHandler}
          {...buttonProps}
        />
        <DropdownBody isOpen={isOpen}>{children}</DropdownBody>
      </Component>
    );
  }
);

export default Dropdown;
