"use client";

import { useSession } from "next-auth/react";
import Avatar from "../controls/Avatar";
import Skeleton from "../controls/Skeleton";

type Props = {
  size?: number;
};
const LoggedInUserAvatar = ({ size }: Props) => {
  const { data, status } = useSession();
  return (
    <Skeleton as="avatar" animate={status === "loading"} size={size}>
      <Avatar src={data?.user.image!} alt={data?.user.name!} width={size} />
    </Skeleton>
  );
};

export default LoggedInUserAvatar;
