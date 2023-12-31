import { connectDb } from "@/lib/db";
import { IPost, IPostDoc, Post } from "@/models/post";
import { NextResponse, NextRequest } from "next/server";
import { CustomError } from "../errors/custom-error";
import { errorHandler } from "../middleware/error-handler";
import { auth } from "../middleware/auth";

/**
 * Add post
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
  await connectDb();
  try {
    const token = await auth(req);
    const body = (await req.json()) as IPost;
    body.user = token.id as string;
    const newPost = new Post(body);
    const result = (await newPost.save()) as IPostDoc;
    return NextResponse.json(result, {
      status: 201,
    });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}

export async function GET(req: NextRequest) {
  await connectDb();
  try {
    await auth(req);
    const searchParams = req.nextUrl.searchParams;
    console.log("s", searchParams);
    const posts = (await Post.find().sort({ createdAt: -1 })) as IPostDoc[];
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
