import PropTypes from "prop-types";
import classNames from "classnames";
import { AppProps } from "@/utils/types";
import { FC } from "react";

export interface IColProps
  extends React.HTMLAttributes<HTMLDivElement>,
    AppProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

const Col: FC<IColProps> = ({
  children,
  className,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  ...rest
}) => {
  const classes = classNames(
    {
      ["col-xs-" + xs]: xs !== 0,
      ["col-sm-" + sm]: sm !== 0,
      ["col-md-" + md]: md !== 0,
      ["col-lg-" + lg]: lg !== 0,
      ["col-xl-" + xl]: xl !== 0,
      ["col-xxl-" + xxl]: xxl !== 0,
      col: !xs && !sm && !md && !lg && !xl && !xxl,
    },
    className
  );
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

Col.defaultProps = {
  xs: 0,
  sm: 0,
  md: 0,
  lg: 0,
  xl: 0,
  xxl: 0,
};

Col.propTypes = {
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  xxl: PropTypes.number,
};

export default Col;
