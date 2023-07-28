import { CustomError } from "@/app/api/errors/custom-error";
import { auth } from "@/app/api/middleware/auth";
import { errorHandler } from "@/app/api/middleware/error-handler";
import { connectDb } from "@/lib/db";
import { ILike, ILikeDoc, IPostDoc, Post } from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDb();
  const searchParams = req.nextUrl.searchParams;
  const status = searchParams.get("status");

  const { id } = params;
  try {
    const token = await auth(req);
    const post = (await Post.findById(id)) as IPostDoc;
    const likes = post.likes as ILikeDoc[];

    const userLikes = likes.filter(
      (like: ILike) => like.user.toString() === token.id
    ) as ILikeDoc[];

    if (userLikes.length > 0) {
      const like = <ILike>(
        post.likes?.find((like: ILike) => like.user.toString() === token.id)
      );

      if (like.active && status == "inactive") {
        like.active = false;
      }
      if (!like.active && status === "active") {
        like.active = true;
      }
    } else {
      post?.likes?.unshift({
        user: token?.id as string,
        active: status === "active" ? true : false,
      });
    }

    const result = await post.save();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
export async function GET() {}
