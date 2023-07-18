import { ICommentDoc } from "@/models/post";
import Comment from "./Comment";

type CommentProps = {
  comments: ICommentDoc[];
};
const Comments = ({ comments }: CommentProps) => {
  return (
    <div className="post-comments">
      {comments?.map((comment: ICommentDoc) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
};
export default Comments;
