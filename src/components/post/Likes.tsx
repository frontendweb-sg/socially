import { FaHeart, FaHeartBroken } from "react-icons/fa";
import Box from "../controls/Box";
import IconButton from "../controls/IconButton";
import classNames from "classnames";
import Typography from "../controls/Typography";

type LikesProps = React.HtmlHTMLAttributes<HTMLDivElement> & {};
const Likes = ({ className, ...rest }: LikesProps) => {
  const classes = classNames(
    "post-likes d-flex align-items-center mb-3",
    className
  );
  return (
    <Box className={classes}>
      <Typography variant="subtitle2" className="me-3">
        <IconButton className="me-1" icon={<FaHeart />} /> Likes
      </Typography>
      <Typography variant="subtitle2">
        <IconButton className="me-1" icon={<FaHeartBroken />} /> Dislikes
      </Typography>
    </Box>
  );
};

export default Likes;
