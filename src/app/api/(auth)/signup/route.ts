import { connectDb } from "@/lib/db";
import { CustomError } from "../../errors/custom-error";
import { ValidationError } from "../../errors/validation-error";
import { errorHandler } from "../../middleware/error-handler";
import { Error } from "mongoose";
import { IAuthRegister } from "@/utils/types";
import { IUserDoc, User } from "@/models/user";
import { NotFoundError } from "../../errors/not-found-error";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb(); // db connection

    const body = (await req.json()) as IAuthRegister; // body
    const user = (await User.findOne({
      email: body.email,
    })) as IUserDoc;

    if (user)
      throw new NotFoundError(
        "User with this email already registred, please login"
      );

    const newUser = new User(body);
    const result = (await newUser.save()) as IUserDoc;
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      error = new ValidationError(error);
    }
    return errorHandler(error as CustomError);
  }
}
