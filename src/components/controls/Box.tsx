import classNames from "classnames";

/**
 * Div component
 * @param param0
 * @returns
 */
export type BoxProps = React.HtmlHTMLAttributes<HTMLDivElement> & {};
const Box = ({ className, children, ...rest }: BoxProps) => {
  const classes = classNames(className);
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

export default Box;
