import Box from "@/components/controls/Box";
import Col from "@/components/controls/Col";
import Panel from "@/components/controls/Panel";
import Typography from "@/components/controls/Typography";
import { IUserDoc } from "@/models/user";
import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaMobile, FaUser } from "react-icons/fa";

/**
 *
 * @returns
 */
const Users = ({ user }: { user: IUserDoc }) => {
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
              sizes="100vw"
            />
          </Box>
        </Box>
        <Panel.Body>
          <ul className="list">
            <li className="list-item">
              <FaEnvelope className="me-2" />
              <Typography variant="span">{user.email}</Typography>
            </li>
            <li className="list-item">
              <FaMobile className="me-2" />
              <Typography variant="span"> {user.mobile}</Typography>
            </li>
            <li className="list-item">
              <FaUser className="me-2" />
              <Typography variant="span">{user.role}</Typography>
            </li>
          </ul>
          <Link href={"/admin/users/" + user.id}>Detail</Link>
        </Panel.Body>
      </Panel>
    </Col>
  );
};

export default Users;
