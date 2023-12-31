import Box from "../controls/Box";
import IconButton from "../controls/IconButton";
import classNames from "classnames";
import Typography from "../controls/Typography";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { Api } from "@/axios-instance";
import { ILikeDoc } from "@/models/post";
import { useRouter } from "next/navigation";

type LikesProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  postId: string;
  likes: ILikeDoc[];
};
const Likes = ({ likes, postId, className, ...rest }: LikesProps) => {
  const router = useRouter();
  const classes = classNames(
    "post-likes d-flex align-items-center mb-3",
    className
  );

  const likesCount = likes.filter((like: ILikeDoc) => like.active).length;
  const dislikesCount = likes.filter((like: ILikeDoc) => !like.active).length;

  const addLikeHandler = async () => {
    await Api.post("/post/" + postId + "/like?status=active", null);
    router.refresh();
  };

  const dislikeHandler = async () => {
    await Api.post("/post/" + postId + "/like?status=inactive", null);
    router.refresh();
  };

  return (
    <Box className={classes}>
      <Typography variant="subtitle2" className="me-3">
        <IconButton
          onClick={addLikeHandler}
          className="me-1"
          icon={<FaHeart />}
        />
        Likes {likesCount}
      </Typography>
      <Typography variant="subtitle2">
        <IconButton
          onClick={dislikeHandler}
          className="me-1"
          icon={<FaHeartBroken />}
        />{" "}
        Dislikes {dislikesCount}
      </Typography>
    </Box>
  );
};

export default Likes;
