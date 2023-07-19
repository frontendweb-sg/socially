import Avatar from "@/components/controls/Avatar";
import Box from "@/components/controls/Box";
import Typography from "@/components/controls/Typography";
import { ICommentDoc } from "@/models/post";

type CommentProps = {
  comment: ICommentDoc;
};
const Comment = ({ comment }: CommentProps) => {
  return (
    <Box className="post-comment">
      <Avatar
        rounded={50}
        size={30}
        className="mr-2"
        src="/avatar.png"
        alt="avatar"
      />
      <Box className="post-comment-content">
        <Typography className="mb-0" variant="body2">
          {comment.message}
        </Typography>
      </Box>
    </Box>
  );
};

export default Comment;
