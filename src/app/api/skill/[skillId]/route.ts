import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "../../middleware/error-handler";
import { CustomError } from "../../errors/custom-error";
import { NotFoundError } from "../../errors/not-found-error";
import { ISkillDoc, ISkill, Skill } from "@/models/skill";
import { connectDb } from "@/lib/db";

/**
 * Get designation
 * @param req
 * @param param1
 * @returns
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { skillId: string } }
) {
  await connectDb();
  try {
    const result = (await Skill.findById(params.skillId)) as ISkillDoc;
    if (!result) throw new NotFoundError("Skill not found");
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}

/**
 * Update designation
 * @param req
 * @param param1
 * @returns
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { skillId: string } }
) {
  await connectDb();
  try {
    const status = req.nextUrl.searchParams.get("status");

    const body = (await req.json()) as ISkill;
    body.slug = body.title.replace(/\s+/g, "-");

    const designation = (await Skill.findById(params.skillId)) as ISkillDoc;
    if (!designation) throw new NotFoundError("Skill not found");

    let update: any = body;
    if (status) {
      update = { active: status === "active" ? true : false };
    }

    const result = await Skill.findByIdAndUpdate(
      params.skillId,
      { $set: update },
      { new: true }
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}

/**
 * Delete designation
 * @param req
 * @param param1
 * @returns
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { skillId: string } }
) {
  await connectDb();
  try {
    const designation = (await Skill.findById(params.skillId)) as ISkillDoc;
    if (!designation) throw new NotFoundError("Skill not found");
    const result = await Skill.findByIdAndDelete(params.skillId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
