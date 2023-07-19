import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "../middleware/error-handler";
import { CustomError } from "../errors/custom-error";
import { ISkillDoc, ISkill, Skill } from "@/models/skill";
import { BadRequestError } from "../errors/bad-request-error";
import { connectDb } from "@/lib/db";

/**
 * Get all skill
 * @param req
 * @returns
 */
export async function GET(req: NextRequest) {
  await connectDb();
  try {
    const results = (await Skill.find()) as ISkillDoc[];
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}

/**
 * Add designation
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
  await connectDb();
  try {
    const body = (await req.json()) as ISkill;
    body.slug = body.title.replace(/\s+/g, "-");

    const hasSlug = (await Skill.findOne({
      slug: body.slug,
    })) as ISkillDoc;

    if (hasSlug)
      throw new BadRequestError(body.title + " skill already present!");

    const skill = new Skill(body) as ISkillDoc;
    const result = await skill.save();
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
