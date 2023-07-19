import classNames from "classnames";
import Box from "./Box";
import Typography from "./Typography";

export type TitleProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  label?: string;
  sublabel?: string;
};
const Title = ({ children, label, sublabel, ...rest }: TitleProps) => {
  return (
    <Box
      className={classNames(
        "page-title d-flex align-items-center justify-content-between border-bottom pb-2 mb-3"
      )}
      {...rest}
    >
      <Typography variant="h5">
        {label}
        {sublabel && (
          <Typography className="small" variant="span">
            {sublabel}
          </Typography>
        )}
      </Typography>
      <Box>{children}</Box>
    </Box>
  );
};
export default Title;
