import { getSignature } from "@/app/_actions";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

const config = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET_KEY,
  secure: true,
});

export async function POST(req: NextRequest) {
  try {
    const formdata = await req.formData();

    const { signature, timestamp } = await getSignature();
    console.log(signature, "signature");
    const formData = new FormData();

    for (const [key, value] of Array.from(formdata.entries())) {
      formData.append(key, value);
    }

    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp as any);
    formData.append("folder", "posts");
    const data = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_API_URL, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    return NextResponse.json(
      { data },
      {
        status: 201,
      }
    );
  } catch (error) {}
}
