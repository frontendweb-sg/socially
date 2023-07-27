import classNames from "classnames";
import { forwardRef, memo, type ReactElement } from "react";
import { Color, Size } from "@/utils/types";
import { FaImage } from "react-icons/fa";

type iconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: Color;
  size?: Size;
  icon?: ReactElement;
  variant?: ButtonVariant;
};
type iconButtonRef = HTMLButtonElement;
const IconButton = forwardRef<iconButtonRef, iconButtonProps>(
  (
    {
      type = "button",
      children,
      color = "primary",
      icon = <FaImage />,
      size = "xs",
      className,
      variant = "text",
      ...rest
    },
    ref
  ) => {
    const common = {
      icon: true,
      ["icon-" + size]: size,
    };

    let classes = classNames(
      common,
      {
        "btn-text": !(variant === "filled" || variant === "outline"),
      },
      className
    );

    if (variant === "filled") {
      classes = classNames(
        {
          ...common,
          ["btn-" + color]: color,
        },
        className
      );
    }

    if (variant === "outline") {
      classes = classNames(
        {
          ...common,
          ["btn-outline-" + color]: color,
        },
        className
      );
    }

    return (
      <button type="button" className={classes} ref={ref} {...rest}>
        {children ? children : icon}
      </button>
    );
  }
);

export default memo(IconButton) as typeof IconButton;
