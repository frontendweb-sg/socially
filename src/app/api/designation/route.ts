import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "../middleware/error-handler";
import { CustomError } from "../errors/custom-error";
import {
  Designation,
  IDesignation,
  IDesignationDoc,
} from "@/models/designation";

import { BadRequestError } from "../errors/bad-request-error";
import { connectDb } from "@/lib/db";

/**
 * Get all designation
 * @param req
 * @returns
 */
export async function GET(req: NextRequest) {
  await connectDb();
  try {
    const results = (await Designation.find()) as IDesignationDoc[];
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
    const body = (await req.json()) as IDesignation;
    body.slug = body.title.replace(/\s+/g, "-");

    const hasSlug = (await Designation.findOne({
      slug: body.slug,
    })) as IDesignationDoc;

    if (hasSlug)
      throw new BadRequestError(body.title + " designation already present!");

    const skill = new Designation(body) as IDesignationDoc;
    const result = await skill.save();
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
