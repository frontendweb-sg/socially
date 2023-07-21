"use client";
import { signOut } from "next-auth/react";
import Button from "../../../components/controls/Button";
import { AppContent } from "@/utils/content";
import { FaSignOutAlt } from "react-icons/fa";

const Signout = () => {
  return (
    <Button
      variant="text"
      size="sm"
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: "/signin",
        })
      }
    >
      <FaSignOutAlt /> {AppContent.signout}
    </Button>
  );
};

export default Signout;
