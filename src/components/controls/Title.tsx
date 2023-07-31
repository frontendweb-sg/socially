"use client";
import classNames from "classnames";
import Box from "./Box";
import Typography from "./Typography";
import {
  usePathname,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import Breadcrumbs from "./Breadcrumbs";
import { upperFirst } from "lodash";

export type TitleProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  label?: string;
  sublabel?: string;
};
const Title = ({ children, label, sublabel, ...rest }: TitleProps) => {
  const pathname = usePathname()
    ?.split("/")
    ?.filter((route) => route !== "");
  return (
    <Box
      className={classNames(
        "page-title d-flex align-items-center justify-content-between border-bottom pb-2 mb-3"
      )}
      {...rest}
    >
      <Box>
        <Typography variant="h5">
          {label ? label : upperFirst(pathname[pathname.length - 1])}
          <Typography className="small" variant="span">
            {sublabel
              ? sublabel
              : " welcome to the " + pathname[pathname.length - 1] + " page"}
          </Typography>
        </Typography>
        <Breadcrumbs />
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};
export default Title;
