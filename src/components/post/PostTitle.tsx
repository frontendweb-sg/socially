import classNames from "classnames";
import Box from "../controls/Box";
import Avatar from "../controls/Avatar";
import Typography from "../controls/Typography";
import DateTime from "../controls/DateTime";

type PostTitle = React.HtmlHTMLAttributes<HTMLDivElement> & {
  name?: string;
  image?: string;
  insertAt?: string;
};
const PostTitle = ({
  children,
  image,
  name,
  className,
  insertAt,
  ...rest
}: PostTitle) => {
  return (
    <Box
      className={classNames(
        "post-title d-flex align-items-center justify-content-between",
        className
      )}
      {...rest}
    >
      <Box className="d-flex align-items-center">
        <Avatar size={40} alt={name!} src={image!} className="me-3" />
        <Typography variant="subtitle1">{name}</Typography>
        <DateTime date={insertAt!} />
      </Box>
      {children}
    </Box>
  );
};

export default PostTitle;
