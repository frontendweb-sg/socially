import { CustomError } from "@/app/api/errors/custom-error";
import { errorHandler } from "@/app/api/middleware/error-handler";
import { connectDb } from "@/lib/db";
import { IPostDoc, Post } from "@/models/post";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDb();
  const { id } = params;

  try {
    const post = (await Post.findById(id)) as IPostDoc;
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
export async function GET() {}
