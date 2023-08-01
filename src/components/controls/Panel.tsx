import { forwardRef } from "react";
import Box from "./Box";
import classNames from "classnames";
import Typography from "./Typography";
import { Variant } from "@/utils/types";

/**
 * Panel component
 * @returns
 */
type PanelProps = React.HtmlHTMLAttributes<HTMLDivElement> & {};
export type panelRef = HTMLDivElement;
const Panel = forwardRef<panelRef, PanelProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = classNames("card", className);
    return (
      <Box ref={ref} className={classes} {...rest}>
        {children}
      </Box>
    );
  }
);

const PanelTitle = forwardRef<panelRef, PanelProps & { variant?: Variant }>(
  ({ className, children, variant = "h4", ...rest }, ref) => {
    const classes = classNames("card-title pb-2", className);
    return (
      <Box ref={ref} className={classes} {...rest}>
        {children}
      </Box>
    );
  }
);

const PanelBody = forwardRef<panelRef, PanelProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = classNames(className);
    return (
      <Box ref={ref} className={classes} {...rest}>
        {children}
      </Box>
    );
  }
);

export default Object.assign(Panel, { Title: PanelTitle, Body: PanelBody });
