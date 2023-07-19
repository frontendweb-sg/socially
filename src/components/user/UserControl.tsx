"use client";
import { useSession } from "next-auth/react";
import Box from "../controls/Box";
import Avatar from "../controls/Avatar";
import Typography from "../controls/Typography";
import Skeleton from "../controls/Skeleton";

const UserControl = () => {
  const { data: session, status } = useSession();

  return (
    <Box className="sidebar-user">
      <Skeleton
        className="auto"
        animate={status === "loading"}
        as="avatar"
        size={100}
      >
        <Avatar
          src={session?.user.image!}
          alt={session?.user.name!}
          size={100}
          align="auto"
          rounded={50}
        />
      </Skeleton>
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
