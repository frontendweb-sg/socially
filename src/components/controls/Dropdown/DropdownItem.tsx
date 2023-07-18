import { forwardRef } from "react";
import Box from "../Box";
import NavItem, { NavItemProps } from "@/components/layout/NavItem";
import { LinkProps } from "next/link";

type DropdownItemProps = React.HtmlHTMLAttributes<
  HTMLLIElement | HTMLDivElement
> &
  LinkProps & {};

export type dropdownItem = HTMLDivElement | HTMLLIElement | HTMLAnchorElement;
const DropdownItem = forwardRef<dropdownItem, DropdownItemProps>(
  ({ children, href, menu, ...rest }, ref) => {
    return (
      <NavItem href={href} {...rest}>
        {children}
      </NavItem>
    );
  }
);
export default DropdownItem;
