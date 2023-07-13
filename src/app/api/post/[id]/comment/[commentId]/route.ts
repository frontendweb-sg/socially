import { CustomError } from "@/app/api/errors/custom-error";
import { NotFoundError } from "@/app/api/errors/not-found-error";
import { errorHandler } from "@/app/api/middleware/error-handler";
import { IPostDoc, Post } from "@/models/post";
import { NextResponse } from "next/server";

/**
 * Delete comment
 * @param req
 * @param param1
 * @returns
 */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string; commentId: string } }
) {
  try {
    const { id, commentId } = params;
    const post = (await Post.findById(id)) as IPostDoc;

    if (!post) {
      throw new NotFoundError("Post not found!");
    }

    const result = await Post.findByIdAndUpdate(
      id,
      {
        $pull: { comments: { _id: commentId } },
      },
      {
        new: true,
      }
    );

    return NextResponse.json(result.comments, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
