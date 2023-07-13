import { IError } from "@/app/api/errors/custom-error";
import AddPost from "@/components/post/AddPost";
import Post from "@/components/post/Post";
import { getPosts } from "@/lib/post";
import { IPostDoc } from "@/models/post";
import { cookies } from "next/headers";

const Page = async () => {
  const cookie = cookies();
  const posts = (await getPosts()) as any;

  if (posts?.errors) {
    return <div>{posts.errors.message}</div>;
  }

  return (
    <div>
      <h1>User posts</h1>
      <AddPost cookie={cookie} />
      {posts?.map((post: IPostDoc) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Page;
