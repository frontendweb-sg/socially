import Signout from "@/components/auth/Signout";
import Box from "@/components/controls/Box";
import Button from "@/components/controls/Button";
import Typography from "@/components/controls/Typography";
import NavItem from "@/components/layout/NavItem";
import UserControl from "@/components/user/UserControl";
import { AppContent } from "@/utils/content";
import { MENU } from "./menu";
import { FaCog } from "react-icons/fa";
import { getServerSession } from "next-auth";

/**
 * Sidebar
 * @returns
 */
const Sidebar = async () => {
  const session = await getServerSession();

  return (
    <aside className="col-md-3">
      <Box className="sidebar">
        <UserControl />
        <hr className="sidebar-divider" />
        <Box className="px-3">
          <ul>
            {MENU.map(({ href, icon: Icon, id, label }) => (
              <NavItem href={href} key={id} menu>
                <Icon /> {label}
              </NavItem>
            ))}
            <li>
              <hr className="sidebar-divider" />
            </li>
            <NavItem href={"/settings"}>
              <FaCog /> {AppContent.setting}
            </NavItem>
          </ul>
        </Box>
        <hr className="sidebar-divider" />
        <Box className="sidebar-footer">
          <Typography className="mb-0" variant="body2">
            version 0.0.1
          </Typography>
          <Signout />
        </Box>
      </Box>
    </aside>
  );
};

export default Sidebar;
