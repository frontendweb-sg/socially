import classNames from "classnames";
import Box from "../Box";
import { useContext } from "react";
import { TabContext } from ".";

type Props = React.HtmlHTMLAttributes<HTMLDivElement> & {
  index: number;
};
const TabContent = ({ index = 0, className, children }: Props) => {
  const { active } = useContext(TabContext);
  const classes = classNames(
    "tabs-content",
    {
      active: index === active,
    },
    className
  );
  return index === active ? <Box className={classes}>{children}</Box> : null;
};

export default TabContent;
