import { connectDb } from "@/lib/db";
import { IPost, IPostDoc, Post } from "@/models/post";
import { NextResponse, NextRequest } from "next/server";
import { BadRequestError } from "../errors/bad-request-error";
import { CustomError } from "../errors/custom-error";
import { errorHandler } from "../middleware/error-handler";

/**
 * Add post
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
  await connectDb();
  try {
    const body = (await req.json()) as IPost;

    body.slug = body.title.replace(/\s+/g, "-");

    const post = await Post.findOne({ slug: body.slug });
    if (post) {
      throw new BadRequestError("Post already existed with this title!");
    }

    const newPost = new Post(body);
    const result = (await newPost.save()) as IPostDoc;

    return NextResponse.json(result, {
      status: 201,
      url: process.env.NEXTAUTH_URL + "/api/post",
      statusText: "ok",
    });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}

export async function GET() {
  await connectDb();
  try {
    const posts = (await Post.find()) as IPostDoc[];
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
