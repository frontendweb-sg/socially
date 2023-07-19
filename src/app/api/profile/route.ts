import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "../middleware/error-handler";
import { CustomError } from "../errors/custom-error";
import { connectDb } from "@/lib/db";
import { IProfile, IProfileDoc, Profile } from "@/models/profile";
import { auth } from "../middleware/auth";

/**
 * get user profile
 * @param req
 * @returns
 */
export async function GET(req: NextRequest) {
  try {
    const profiles = await Profile.find();
    return NextResponse.json(profiles, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}

/**
 * Add user profile
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
  await connectDb();
  try {
    const token = await auth(req);
    const body = (await req.json()) as IProfile;
    body.user = token.id as string;
    const newProfile = new Profile(body) as IProfileDoc;
    const result = await newProfile.save();
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
