import { CustomError } from "@/app/api/errors/custom-error";
import { NotFoundError } from "@/app/api/errors/not-found-error";
import { errorHandler } from "@/app/api/middleware/error-handler";
import { IPostDoc, Post } from "@/models/post";
import { NextResponse } from "next/server";

/**
 * Get all messages
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const post = (await Post.findById(id)) as IPostDoc;

    if (!post) {
      throw new NotFoundError("Post not found!");
    }

    return NextResponse.json(post.comments, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}

/**
 * Add message
 */
export async function POST(
  req: Request,
  { params }: { params: { id: string; messageId: string } }
) {
  try {
    const { id } = params;

    const body = await req.json();
    console.log("b", body, id);
    const post = (await Post.findById(id)) as IPostDoc;

    post.comments.push(body);

    await post.save();

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
