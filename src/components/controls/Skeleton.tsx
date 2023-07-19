import { Size } from "@/utils/types";
import Box from "./Box";
import Panel from "./Panel";
import classNames from "classnames";

type As = "avatar" | "progressbar";
type SkeletonProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  as?: As;
  size?: number;
  animate?: boolean;
};
const Skeleton = ({
  children,
  as = "progressbar",
  animate = false,
  size = 35,
  className,
  ...rest
}: SkeletonProps) => {
  if (as === "avatar") {
    return (
      <Box
        className={classNames(
          "skeleton d-flex align-items-center justify-content-center",
          animate && "rotate",
          animate && "skeleton-border",
          size && `avatar-${size}`,
          className
        )}
        {...rest}
        style={{ width: size + 10, height: size + 10 }}
      >
        {children}
      </Box>
    );
  }

  return (
    <Panel className={classNames("skeleton p-3", className)}>
      <Box className="width-md ht"></Box>
      <Box className="width-lg ht"></Box>
      <Box className="width-xl ht"></Box>
    </Panel>
  );
};

export default Skeleton;
