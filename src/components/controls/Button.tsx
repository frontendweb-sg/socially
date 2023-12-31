import classNames from "classnames";
import { ReactElement, forwardRef } from "react";
import { Color, Size } from "@/utils/types";
import { FaSpinner } from "react-icons/fa";
import type { IconType } from "react-icons";

export type buttonRef = HTMLButtonElement;
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  custom?: boolean;
  color?: Color;
  size?: Size;
  startIcon?: ReactElement;
  endIcon?: IconType;
  loading?: boolean;
  block?: boolean;
  as?: "icon" | "button";
};
/**
 * Button component
 * @param param0
 * @returns
 */
const Button = forwardRef<buttonRef, ButtonProps>(
  (
    {
      type = "button",
      as = "button",
      variant = "filled",
      children,
      color = "primary",
      size = "sm",
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
    const common = {
      btn: true,
      ["btn-" + size]: as === "button",
      ["btn-icon-" + size]: as === "icon",
    };

    let classes = classNames(
      common,
      { "w-100": block, ["btn-" + color]: color },
      block ? "btn-block" : null,
      className
    );

    if (variant === "text") {
      classes = classNames(
        common,
        {
          ["btn-text-" + color]: color,
        },
        className
      );
    }

    if (variant === "outline") {
      classes = classNames(
        common,
        {
          ["btn-outline-" + color]: color,
        },
        className
      );
    }

    if (custom) {
      classes = classNames({ ["btn-" + color]: color }, className);
    }

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled || loading}
        {...rest}
      >
        {loading ? <FaSpinner className="me-2 spinner" /> : null}
        {startIcon} {children}
      </button>
    );
  }
);

export default Button;
