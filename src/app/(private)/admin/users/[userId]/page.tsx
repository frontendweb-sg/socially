import Box from "@/components/controls/Box";
import { getUser } from "@/lib/user";

const Page = async ({ params }: { params: { userId: string } }) => {
  const user = await getUser();

  return <Box>User detail {JSON.stringify(user)}</Box>;
};

export default Page;
