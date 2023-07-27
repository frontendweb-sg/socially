import classNames from "classnames";
import Button from "../Button";

type TabProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: number;
  color?: Color;
};

const Tab = ({ active, className, color, children, ...rest }: TabProps) => {
  const classes = classNames("tabs-tab", className);
  return (
    <Button color={color} className={classes} {...rest}>
      {children}
    </Button>
  );
};

export default Tab;
