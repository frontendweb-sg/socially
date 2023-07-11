import { connectDb } from "@/lib/db";
import { CustomError } from "../../errors/custom-error";
import { errorHandler } from "../../middleware/error-handler";
import { IUserDoc, User } from "@/models/user";
import { NotFoundError } from "../../errors/not-found-error";
import { Password } from "@/utils/password";
import { AuthError } from "../../errors/auth-error";
import { Jwt } from "@/utils/jwt";
import { NextResponse } from "next/server";

/**
 * Login api handler
 * @param req
 * @returns
 */
export interface IAuth {
  email: "";
  password: "";
}

export async function POST(req: Request) {
  try {
    await connectDb();

    const body = (await req.json()) as IAuth;
    const user = (await User.findOne({
      $or: [{ email: body.email }, { mobile: body.email }],
    })) as IUserDoc;

    if (!user) throw new NotFoundError("Email not found!");

    const verify = Password.compare(body.password, user.password);
    if (!verify) throw new AuthError("Invalid password");

    const token = Jwt.genToken({ email: user.email, id: user.id });
    const doc = {
      ...user.toJSON(),
      accessToken: token,
    };

    return NextResponse.json(doc, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
