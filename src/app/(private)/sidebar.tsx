import NavItem from "@/components/layout/NavItem";
import { AppRoutes } from "@/utils/routes";

const Sidebar = () => {
  return (
    <aside className="sidebar">
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
    </aside>
  );
};

export default Sidebar;
