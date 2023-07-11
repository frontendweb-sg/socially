import { connectDb } from "@/lib/db";
import { CustomError } from "../../errors/custom-error";
import { errorHandler } from "../../middleware/error-handler";
import { auth } from "../../middleware/auth";
import { NextRequest, NextResponse } from "next/server";
import { IUserDoc, User } from "@/models/user";

/**
 * User handler
 * @returns
 */
export async function GET(req: NextRequest) {
  try {
    await connectDb();
    // const token = await auth(req);
    // const user = (await User.findById(token.id)) as IUserDoc;
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
