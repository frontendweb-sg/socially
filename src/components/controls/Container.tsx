import classNames from "classnames";
import PropTypes from "prop-types";
import { Align, Size } from "@/utils/types";
import { FC } from "react";

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  full?: boolean;
  size?: Size;
  cover?: boolean;
  align?: Align;
}

/**
 * Container component
 * @param param0
 * @returns
 */
const Container: FC<IProps> = ({
  full,
  size,
  children,
  className,
  cover,
  align,
  ...rest
}) => {
  let common = { "h-100": cover, ["text-" + align]: align };

  let classes = classNames("container", common, className);
  if (full) classes = classNames("container-fluid", common, className);
  if (size) classes = classNames("fw-container-" + size, common, className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

Container.defaultProps = {
  full: false,
};
Container.propTypes = {
  full: PropTypes.bool,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl"]),
};

export default Container;
