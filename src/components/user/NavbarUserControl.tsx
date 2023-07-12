"use client";

import { signOut, useSession } from "next-auth/react";

const NavbarUserControl = () => {
  const { data: session, status } = useSession();
  return (
    <li className="nav-item">
      <div className="nav-link">
        {session?.user.name}
        <button
          className="btn btn-sm btn-info ms-2"
          onClick={() => signOut({ redirect: true, callbackUrl: "/signin" })}
        >
          Sign out
        </button>
      </div>
    </li>
  );
};

export default NavbarUserControl;
