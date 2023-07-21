import { getUsers } from "@/lib/user";
import User from "./User";
import NoData from "@/components/controls/DataTable/NoData";
import { IUserDoc } from "@/models/user";
import Title from "@/components/controls/Title";
import Row from "@/components/controls/Row";

const Page = async () => {
  const users = (await getUsers()) as IUserDoc[] | null;

  if (!users) return <NoData />;
  return (
    <>
      <Title label="Users" sublabel="Welcome to users page" />
      <Row>
        {users.map((user: IUserDoc) => (
          <User key={user.id} user={user} />
        ))}
      </Row>
    </>
  );
};

export default Page;
