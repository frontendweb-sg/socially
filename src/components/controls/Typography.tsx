import PropTypes from "prop-types";
import classNames from "classnames";
import { FC, createElement } from "react";
import { AppProps, Color, Size, Variant } from "@/utils/types";

export interface ITypographyProps extends AppProps {
  variant?: Variant;
  color?: Color;
  size?: Size;
}

const Typography: FC<ITypographyProps> = ({
  variant = "h1",
  children,
  className,
  color,
  size,
  ...rest
}) => {
  const classes = classNames(
    "text",
    variant ? "text-" + variant : null,
    size ? "text-" + size : null,
    color ? "text-" + color : null,
    className
  );
  const _h6 = variant === "subtitle1" || variant === "subtitle2" ? "h6" : null;
  const _p = variant === "body1" || variant === "body2" ? "p" : null;
  const tag = _h6 || _p || variant;
  return createElement(tag!, { className: classes, ...rest }, children);
};

Typography.propTypes = {
  variant: PropTypes.oneOf<Variant>([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "subtitle1",
    "subtitle2",
    "body1",
    "body2",
    "span",
  ]),
};
export default Typography;
