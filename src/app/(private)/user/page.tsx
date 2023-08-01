import Col from "@/components/controls/Col";
import Row from "@/components/controls/Row";
import AddPost from "@/components/post/AddPost";
import PostList from "@/components/post/PostList";
import Birthday from "@/components/user/Birthday";
import { getPosts } from "@/lib/post";
import { IPostDoc } from "@/models/post";
import { cookies } from "next/headers";

export const revalidate = 0;
const Page = async () => {
  const cookie = cookies();
  const posts = (await getPosts()) as IPostDoc[];

  return (
    <Row>
      <Col md={8}>
        <AddPost cookie={cookie} />
        <PostList posts={posts} />
      </Col>
      <Col md={4}>
        <Birthday />
      </Col>
    </Row>
  );
};

export default Page;
