import classNames from "classnames";
import Box from "../controls/Box";
import Avatar from "../controls/Avatar";
import Typography from "../controls/Typography";

type PostTitle = React.HtmlHTMLAttributes<HTMLDivElement> & {
  name?: string;
  image?: string;
  insertAt?: number;
};
const PostTitle = ({
  children,
  image,
  name,
  className,
  ...rest
}: PostTitle) => {
  return (
    <Box
      className={classNames("post-title d-flex align-it", className)}
      {...rest}
    >
      <Box className="d-flex align-items-center">
        <Avatar alt={name!} src={image!} className="me-2" />
        <Typography variant="subtitle1">{name}</Typography>
      </Box>
      {children}
    </Box>
  );
};

export default PostTitle;
