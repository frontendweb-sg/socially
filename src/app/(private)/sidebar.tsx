"use client";
import Signout from "@/app/(auth)/forms/Signout";
import Box from "@/components/controls/Box";
import Typography from "@/components/controls/Typography";
import NavItem from "@/components/layout/NavItem";
import UserControl from "@/components/user/UserControl";
import { AppContent } from "@/utils/content";
import { AdminMenu, USER_MENU } from "./menu";
import { FaCog } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useSelectedLayoutSegment } from "next/navigation";

/**
 * Sidebar
 * @returns
 */
const Sidebar = () => {
  const segment = useSelectedLayoutSegment();

  const { data: session, status } = useSession();
  let Menu = session?.user.role === "admin" ? AdminMenu : USER_MENU;
  return (
    <aside className="col-lg-3 d-none d-md-block">
      <Box className="sidebar">
        <UserControl />
        <hr className="sidebar-divider" />
        <Box className="px-3">
          <ul>
            {Menu.map(({ href, icon: Icon, id, label }) => (
              <NavItem href={href} key={id} menu>
                <Icon /> {label}
              </NavItem>
            ))}
            <li>
              <hr className="sidebar-divider" />
            </li>
            <NavItem href={"/" + segment + "/settings"}>
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
