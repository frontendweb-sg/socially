import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "../../middleware/error-handler";
import { CustomError } from "../../errors/custom-error";
import { NotFoundError } from "../../errors/not-found-error";
import {
  Designation,
  IDesignation,
  IDesignationDoc,
} from "@/models/designation";
import { connectDb } from "@/lib/db";
import { admin } from "../../middleware/admin";

/**
 * Get designation
 * @param req
 * @param param1
 * @returns
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { designationId: string } }
) {
  await connectDb();
  try {
    const result = (await Designation.findById(
      params.designationId
    )) as IDesignationDoc;
    if (!result) throw new NotFoundError("Designation not found");
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
  { params }: { params: { designationId: string } }
) {
  await connectDb();
  try {
    await admin(req);
    const status = req.nextUrl.searchParams.get("status");

    const body = (await req.json()) as IDesignation;
    body.slug = body.title.replace(/\s+/g, "-");

    const designation = (await Designation.findById(
      params.designationId
    )) as IDesignationDoc;

    if (!designation) throw new NotFoundError("Designation not found");

    let update: any = body;
    if (status) {
      update = { active: status === "active" ? true : false };
    }
    const result = await Designation.findByIdAndUpdate(
      params.designationId,
      {
        $set: update,
      },
      {
        new: true,
      }
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
  { params }: { params: { designationId: string } }
) {
  await connectDb();
  try {
    const designation = (await Designation.findById(
      params.designationId
    )) as IDesignationDoc;

    if (!designation) throw new NotFoundError("Designation not found");

    const result = await Designation.findByIdAndDelete(params.designationId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
