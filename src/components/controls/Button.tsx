import classNames from "classnames";
import { FC } from "react";
import { Color, Size } from "@/utils/types";
import { FaSpinner } from "react-icons/fa";
import type { IconType } from "react-icons";

type ButtonVariant = "text" | "filled" | "outline";
export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  custom?: boolean;
  color?: Color;
  size?: Size;
  startIcon?: IconType;
  endIcon?: IconType;
  loading?: boolean;
  block?: boolean;
}

/**
 * Button component
 * @param param0
 * @returns
 */
const Button: FC<IButtonProps> = ({
  variant,
  children,
  color,
  size,
  className,
  custom,
  startIcon,
  endIcon,
  loading,
  disabled,
  block,
  ...rest
}) => {
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

  if (custom)
    classes = classNames(
      { ["btn-" + color]: color, ["btn-" + size]: size },
      className
    );
  const StartIcon = startIcon!;
  const EndIcon = endIcon!;
  return (
    <button className={classes} disabled={disabled || loading} {...rest}>
      {loading && !loading ? <FaSpinner className="me-2" /> : null}
      {<StartIcon />}
      {children}
      {endIcon && !loading ? <EndIcon className="ms-2" /> : null}
    </button>
  );
};

Button.defaultProps = {
  color: "primary",
  size: "md",
  variant: "filled",
};

export default Button;
