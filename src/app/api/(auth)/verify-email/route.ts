import { connectDb } from "@/lib/db";
import { IUserDoc, User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "../../middleware/error-handler";
import { CustomError } from "../../errors/custom-error";
import { NotFoundError } from "../../errors/not-found-error";

/**
 * Verify email
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
  await connectDb();
  try {
    const { email } = (await req.json()) as { email: string };

    const user = (await User.findOne({ email })) as IUserDoc;

    if (!user) throw new NotFoundError("Email not found!");

    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
