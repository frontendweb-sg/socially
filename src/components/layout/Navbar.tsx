"use client";
import { AppRoutes } from "@/utils/routes";
import NavItem from "./NavItem";
import NavbarUserControl from "../user/NavbarUserControl";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {session ? (
          <NavbarUserControl />
        ) : (
          <NavItem href={AppRoutes.signin}>Signin</NavItem>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
