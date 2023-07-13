import classNames from "classnames";
import { forwardRef } from "react";

/**
 * Div component
 * @param param0
 * @returns
 */
export type BoxProps = React.HtmlHTMLAttributes<HTMLDivElement> & {};
export type boxRef = HTMLDivElement;
const Box = forwardRef<boxRef, BoxProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = classNames(className);
    return (
      <div className={classes} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

export default Box;
