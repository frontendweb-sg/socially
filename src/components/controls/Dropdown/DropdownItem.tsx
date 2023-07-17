import { forwardRef } from "react";
import Box from "../Box";
import NavItem, { NavItemProps } from "@/components/layout/NavItem";

type DropdownItemProps = React.HtmlHTMLAttributes<
  HTMLLIElement | HTMLDivElement
> & {
  menu?: boolean;
  linkProps?: NavItemProps;
};

export type dropdownItem = HTMLDivElement | HTMLLIElement | HTMLAnchorElement;
const DropdownItem = forwardRef<dropdownItem, DropdownItemProps>(
  ({ children, menu, linkProps, ...rest }, ref) => {
    return menu ? (
      <NavItem href={linkProps?.href!} {...linkProps}>
        {children}
      </NavItem>
    ) : (
      <NavItem href={linkProps?.href!} {...linkProps}>
        {children}
      </NavItem>
    );
  }
);
export default DropdownItem;
