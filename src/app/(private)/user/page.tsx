import AddPost from "@/components/post/AddPost";
import PostList from "@/components/post/PostList";
import { getPosts } from "@/lib/post";
import { IPostDoc } from "@/models/post";
import { cookies } from "next/headers";

const Page = async () => {
  const cookie = cookies();
  const posts = (await getPosts()) as IPostDoc[];

  return (
    <>
      <AddPost cookie={cookie} />
      <PostList posts={posts} />
    </>
  );
};

export default Page;
