import Signout from "@/components/auth/Signout";
import Box from "@/components/controls/Box";
import Button from "@/components/controls/Button";
import Typography from "@/components/controls/Typography";
import NavItem from "@/components/layout/NavItem";
import UserControl from "@/components/user/UserControl";
import { AppContent } from "@/utils/content";
import { AppRoutes } from "@/utils/routes";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  return (
    <aside className="col-md-3">
      <Box className="sidebar">
        <UserControl />
        <hr className="sidebar-divider" />
        <Box className="px-3">
          <ul>
            <NavItem menu href={AppRoutes.userProfile}>
              Profile
            </NavItem>
            <NavItem menu href={AppRoutes.userPost}>
              Posts
            </NavItem>
            <NavItem menu href={AppRoutes.userPhoto}>
              Photos
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
