"use client";
import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";

export type NavItemProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps & {
    menu?: boolean;
    custom?: boolean;
    parentProps?: React.LiHTMLAttributes<HTMLLIElement>;
  };

export type navItemRef = HTMLAnchorElement;
const NavItem = forwardRef<navItemRef, NavItemProps>(
  (
    {
      menu = false,
      children,
      href = "/",
      className,
      custom = false,
      parentProps,
      ...rest
    },
    ref
  ) => {
    const pathname = usePathname();
    const classes = classNames(
      "d-block",
      !custom && "nav-link",
      className,
      pathname === href && "active"
    );

    const LinkElement = (
      <Link href={href} ref={ref} className={classes} {...rest}>
        {children}
      </Link>
    );

    if (menu) {
      return (
        <li className={classNames("nav-item", parentProps?.className)}>
          {LinkElement}
        </li>
      );
    }

    return LinkElement;
  }
);

export default NavItem;
