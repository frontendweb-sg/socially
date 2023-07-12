import classNames from "classnames";
import { FC, forwardRef } from "react";
import { Color, Size } from "@/utils/types";
import { FaSpinner } from "react-icons/fa";
import type { IconType } from "react-icons";

export type ButtonVariant = "text" | "filled" | "outline";
export type buttonRef = HTMLButtonElement;
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  custom?: boolean;
  color?: Color;
  size?: Size;
  startIcon?: IconType;
  endIcon?: IconType;
  loading?: boolean;
  block?: boolean;
};
/**
 * Button component
 * @param param0
 * @returns
 */
const Button = forwardRef<buttonRef, ButtonProps>(
  (
    {
      variant = "filled",
      children,
      color = "primary",
      size = "md",
      className,
      custom,
      startIcon,
      endIcon,
      loading,
      disabled,
      block,
      ...rest
    },
    ref
  ) => {
    let classes = classNames(
      {
        btn: true,
        "w-100": block,
        ["btn-" + color]: color,
        ["btn-" + size]: size,
      },
      block ? "btn-block" : null,
      className
    );
    if (variant === "text") {
      classes = classNames(
        "btn",
        { ["btn-text-" + color]: color, ["btn-" + size]: size },
        className
      );
    }

    if (variant === "outline") {
      classes = classNames(
        "btn",
        { ["btn-outline-" + color]: color, ["btn-" + size]: size },
        className
      );
    }

    if (custom) {
      classes = classNames(
        { ["btn-" + color]: color, ["btn-" + size]: size },
        className
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...rest}
      >
        {loading && !loading ? <FaSpinner className="me-2" /> : null}
        {children}
      </button>
    );
  }
);

export default Button;
