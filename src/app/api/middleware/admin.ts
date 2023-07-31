import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import { IUserDoc, User } from "@/models/user";
import { AuthError } from "../errors/auth-error";

export const admin = async (req: NextRequest) => {
  const token = await auth(req);
  console.log("token", token);
  const user = (await User.findById(token?.id)) as IUserDoc;
  if (user.role !== "admin") throw new AuthError("You have not right access!");
  return NextResponse.next();
};
