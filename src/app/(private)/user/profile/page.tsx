import Profile from "@/components/user/Profile";
import { getUser } from "@/lib/user";
import { cookies } from "next/headers";
import AddEducation from "./AddEducation";

export const revalidate = 0;
const Page = async () => {
  const cookie = cookies();
  const user = await getUser();

  return (
    <div>
      <h1>Profile</h1>
      <Profile user={user} cookie={cookie} />

      <AddEducation />
    </div>
  );
};

export default Page;
