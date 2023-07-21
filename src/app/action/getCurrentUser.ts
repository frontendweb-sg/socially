import { connectDb } from "@/lib/db";
import { IUserDoc, User } from "@/models/user";
import { getServerSession } from "next-auth";

export const getCurrentUser = async () => {
  const session = await getServerSession();
  if (!session) return null;

  await connectDb();
  const user = (await User.findOne({ email: session.user.email })) as IUserDoc;
  if (!user) return null;

  return {
    ...session.user,
    ...user.toJSON(),
  };
};
