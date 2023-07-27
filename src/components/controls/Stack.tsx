import classNames from "classnames";
import Box from "./Box";

type Props = React.HtmlHTMLAttributes<HTMLDivElement> & {
  gap?: number;
};
const Stack = ({ children, className, gap, ...rest }: Props) => {
  const classes = classNames(
    "d-flex flex-row align-items-center",
    {},
    className
  );

  return (
    <Box className={classes} {...rest}>
      {children}
    </Box>
  );
};

export default Stack;
