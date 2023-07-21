import Box from "@/components/controls/Box";
import Col from "@/components/controls/Col";
import Panel from "@/components/controls/Panel";
import Title from "@/components/controls/Title";
import Typography from "@/components/controls/Typography";
import { IUserDoc } from "@/models/user";
import Image from "next/image";

/**
 *
 * @returns
 */
const Users = ({ user }: { user: IUserDoc }) => {
  console.log(user);
  return (
    <Col sm={6} md={3} lg={4}>
      <Panel className="p-3 user">
        <Typography variant="subtitle1">{user.name}</Typography>
        <Box className="user-img">
          <Box className="position-relative">
            <Image
              priority={false}
              fill
              src={user.image || "/password.jpg"}
              alt={user.name}
            />
          </Box>
        </Box>
        <Panel.Body>
          <ul>
            <li>Email: {user.email}</li>
            <li>Mobile: {user.mobile}</li>
            <li>Role: {user.role}</li>
          </ul>
        </Panel.Body>
      </Panel>
    </Col>
  );
};

export default Users;
