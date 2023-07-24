import { connectDb } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";
import { IUser, IUserDoc, User } from "@/models/user";
import { auth } from "@/app/api/middleware/auth";
import { errorHandler } from "@/app/api/middleware/error-handler";
import { CustomError } from "@/app/api/errors/custom-error";
import { NotFoundError } from "@/app/api/errors/not-found-error";

/**
 * User handler
 * @returns
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await connectDb();
    const token = await auth(req);

    const userId = params.userId;

    const user = (await User.findById(token.id)) as IUserDoc;
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}

/**
 *
 * @param req
 * @returns
 */
export async function PUT(req: NextRequest) {
  try {
    await connectDb();
    const token = await auth(req);
    const { name, mobile } = (await req.json()) as IUser;
    const user = (await User.findById(token.id)) as IUserDoc;
    if (!user) throw new NotFoundError("User not found!");
    const result = await User.findByIdAndUpdate(
      user.id,
      { $set: { name, mobile } },
      { new: true }
    );
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
