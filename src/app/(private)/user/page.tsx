import AddPost from "@/components/post/AddPost";
import { cookies } from "next/headers";

const Page = () => {
  const cookie = cookies();
  return (
    <>
      <AddPost cookie={cookie} />
    </>
  );
};

export default Page;
