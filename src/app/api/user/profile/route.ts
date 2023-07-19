import { NextRequest, NextResponse } from "next/server";
import { CustomError } from "../../errors/custom-error";
import { auth } from "../../middleware/auth";
import { errorHandler } from "../../middleware/error-handler";
import { IProfile, IProfileDoc, Profile } from "@/models/profile";
import { connectDb } from "@/lib/db";

/**
 * Get user profile
 * @returns
 */
export async function GET(req: NextRequest) {
  try {
    const token = await auth(req);
    const profile = (await Profile.findOne({ user: token.id })) as IProfileDoc;
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}

/**
 * Update user profile
 * @param req
 */
export async function PUT(req: NextRequest) {}

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
