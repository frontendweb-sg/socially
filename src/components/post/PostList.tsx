import { IPostDoc } from "@/models/post";
import Box from "../controls/Box";
import Post from "./Post";

type PostListProps = {
  posts: IPostDoc[];
};

const PostList = ({ posts, ...rest }: PostListProps) => {
  return (
    <Box>
      {posts.map((post: IPostDoc) => (
        <Post post={post} key={post.id} />
      ))}
    </Box>
  );
};

export default PostList;
