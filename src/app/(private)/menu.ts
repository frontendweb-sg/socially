import { ReactElement } from "react";
import { IconType } from "react-icons";
import { FaImages, FaNewspaper, FaTh, FaUser } from "react-icons/fa";
export type IMenu = {
  id: string;
  label: string;
  href: string;
  icon: IconType;
};
export const MENU: IMenu[] = [
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
