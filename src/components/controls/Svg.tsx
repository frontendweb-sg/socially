import { AppProps } from "@/utils/types";
import { FC } from "react";
interface ISvgProps extends AppProps, React.SVGProps<SVGSVGElement> {
  size?: string;
}

/**
 * Svg component
 * @param param0
 * @returns
 */
const Svg: FC<ISvgProps> = ({ children, viewBox, size, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={size}
      height={size}
      {...rest}
    >
      {children}
    </svg>
  );
};

Svg.defaultProps = {
  size: "24",
  viewBox: "0 0 24 24",
};
export default Svg;
