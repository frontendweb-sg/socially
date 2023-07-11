import { NextRequest } from "next/server";
import { errorHandler } from "../middleware/error-handler";
import { CustomError } from "../errors/custom-error";
import { connectDb } from "@/lib/db";
import { auth } from "../middleware/auth";
import { IUserDoc, User } from "@/models/user";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const token = await auth(req);

    const user = (await User.findById(token?.id)) as IUserDoc;
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
