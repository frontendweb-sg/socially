"use client";
import Avatar from "../controls/Avatar";
import Panel from "../controls/Panel";
import { useSession } from "next-auth/react";
import Skeleton from "../controls/Skeleton";
import Typography from "../controls/Typography";

const Birthday = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Skeleton />;
  }

  return (
    <Panel className="card" style={{ maxWidth: "240px" }}>
      <Avatar
        src={session?.user.image!}
        alt={session?.user.name!}
        size={100}
        rounded={50}
        align="auto"
      />
      <Typography>{session?.user.name}</Typography>
      <Typography>Date of birth</Typography>
    </Panel>
  );
};

export default Birthday;
