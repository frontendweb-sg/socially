import { getCurrentUser } from "@/app/action/getCurrentUser";
import Col from "@/components/controls/Col";
import Row from "@/components/controls/Row";
import PostList from "@/components/post/PostList";
import Birthday from "@/components/user/Birthday";
import { getPostsByUser } from "@/lib/post";
import { IUserDoc } from "@/models/user";

const Page = async () => {
  const session = (await getCurrentUser()) as IUserDoc;
  const posts = (await getPostsByUser(session?.id)) as any;

  if (posts?.errors) {
    return <div>{posts.errors.message}</div>;
  }
  return (
    <Row>
      <Col md={8}>
        <PostList posts={posts} />
      </Col>
      <Col md={4}>
        <Birthday />
      </Col>
    </Row>
  );
};

export default Page;
