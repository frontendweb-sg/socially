import { connectDb } from "@/lib/db";
import { CustomError } from "../errors/custom-error";
import { errorHandler } from "../middleware/error-handler";
import { IUserDoc, User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { admin } from "../middleware/admin";

/**
 * User handler
 * @param req
 * @returns
 */
export async function GET(req: NextRequest) {
  try {
    await connectDb();

    // await admin(req);

    // const users = (await User.find()) as IUserDoc[];
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
