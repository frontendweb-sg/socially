import { getToken } from "next-auth/jwt";
import { AuthError } from "../errors/auth-error";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";

export const auth = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token) throw new AuthError("Unauthorized error");

  return token;
};
