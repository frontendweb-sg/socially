import { Align, Display, alignItems, justifyContent } from "@/utils/types";
import classNames from "classnames";
import { forwardRef } from "react";

/**
 * Div component
 * @param param0
 * @returns
 */
export type BoxProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  align?: Align;
  display?: Display;
  alignItmes?: alignItems;
  justifyContent?: justifyContent;
};

export type boxRef = HTMLDivElement;
const Box = forwardRef<boxRef, BoxProps>(
  (
    { className, children, display, alignItmes, justifyContent, ...rest },
    ref
  ) => {
    const classes = classNames(className);
    return (
      <div className={classes} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

export default Box;
