import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "../middleware/error-handler";
import { CustomError } from "../errors/custom-error";
import { connectDb } from "@/lib/db";
import { auth } from "../middleware/auth";
import { User } from "@/models/user";
import { Password } from "@/utils/password";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const token = await auth(req);

    const { password } = (await req.json()) as { password: string };

    const user = await User.findByIdAndUpdate(
      token.id,
      {
        $set: { password: Password.hash(password) },
      },
      { new: true }
    );

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
