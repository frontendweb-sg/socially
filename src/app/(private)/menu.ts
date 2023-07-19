import { IconType } from "react-icons";
import {
  FaArrowLeft,
  FaComment,
  FaImages,
  FaList,
  FaNewspaper,
  FaTh,
  FaUser,
  FaUsers,
} from "react-icons/fa";
export type IMenu = {
  id: string;
  label: string;
  href: string;
  icon: IconType;
};

export const AdminMenu: IMenu[] = [
  {
    id: "0",
    label: "Dashboard",
    href: "/admin",
    icon: FaTh,
  },
  {
    id: "1",
    label: "Users",
    href: "/admin/users",
    icon: FaUsers,
  },
  {
    id: "2",
    label: "Posts",
    href: "/admin/posts",
    icon: FaNewspaper,
  },
  {
    id: "3",
    label: "Skills",
    href: "/admin/skills",
    icon: FaList,
  },
  {
    id: "4",
    label: "Designations",
    href: "/admin/designations",
    icon: FaArrowLeft,
  },
  {
    id: "5",
    label: "Comments",
    href: "/admin/comments",
    icon: FaComment,
  },
];

export const USER_MENU: IMenu[] = [
  {
    id: "0",
    label: "Dashboard",
    href: "/user",
    icon: FaTh,
  },
  {
    id: "1",
    label: "Posts",
    href: "/user/posts",
    icon: FaNewspaper,
  },
  {
    id: "3",
    label: "Photos",
    href: "/user/photos",
    icon: FaImages,
  },
  {
    id: "4",
    label: "Profile",
    href: "/user/profile",
    icon: FaUser,
  },
];
