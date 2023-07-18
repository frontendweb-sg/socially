"use client";
import { useSession } from "next-auth/react";
import Box from "../controls/Box";
import Avatar from "../controls/Avatar";
import Typography from "../controls/Typography";

const UserControl = () => {
  const { data: session, status } = useSession();

  return (
    <Box className="sidebar-user">
      <Avatar
        src={session?.user.image!}
        alt={session?.user.name!}
        circle
        size="xl"
        width={100}
        align="auto"
      />
      <Typography className="mt-3" variant="subtitle2">
        {session?.user.name}
        <Typography className="d-block mt-1" variant="span">
          ( {session?.user.mobile} )
        </Typography>
      </Typography>
    </Box>
  );
};

export default UserControl;
