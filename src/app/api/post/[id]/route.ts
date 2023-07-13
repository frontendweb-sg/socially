import { NotFoundError } from "../../errors/not-found-error";
import { CustomError } from "../../errors/custom-error";
import { IPostDoc, Post } from "@/models/post";
import { NextResponse } from "next/server";
import { errorHandler } from "../../middleware/error-handler";

/**
 * Get post details
 * @returns
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const post = (await Post.findById(id)) as IPostDoc;

    if (!post) {
      throw new NotFoundError("Post not found related id");
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}

/**
 * Update posts
 */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const id = params.id;
    const post = await Post.findById(id);

    if (!post) {
      throw new NotFoundError("Post not found!");
    }

    body.slug = body.title.replace(/\s+/g, "-");

    const result = await Post.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}

/**
 * Delete posts
 * @param req
 * @param param1
 */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const post = await Post.findById(id);

    if (!post) {
      throw new NotFoundError("Post not found!");
    }

    const result = (await Post.findByIdAndDelete(id)) as IPostDoc;
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
