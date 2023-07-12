import classNames from "classnames";
import PropTypes from "prop-types";
import { FC } from "react";
export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  cover?: boolean;
}

/**
 * Row component
 * @param param0
 * @returns
 */
const Row: FC<IProps> = ({ children, className, cover, ...rest }) => {
  const classes = classNames("row", { "h-100": cover }, className);
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

Row.defaultProps = {};

Row.propTypes = {
  className: PropTypes.string,
};
export default Row;
