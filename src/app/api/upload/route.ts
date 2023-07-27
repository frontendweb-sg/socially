import { getSignature } from "@/app/_actions";
import { AxiosResponse } from "axios";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const formdata = await req.formData();
    const { signature, timestamp } = await getSignature();

    const files = Array.from(formdata.entries()).map(([_, value]) => value);

    const promise = uploader(files, signature, timestamp);

    // for (const [key, value] of Array.from(formdata.entries())) {
    //   const formData = new FormData();
    //   formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    //   formData.append("signature", signature);
    //   formData.append("timestamp", timestamp as any);
    //   formData.append("folder", "posts");
    //   formData.append("file", value);
    //   return await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_API_URL, {
    //     method: "POST",
    //     body: formData,
    //   }).then((res) => res.json());
    // }

    const response = await axios.all(promise);
    return NextResponse.json(response, {
      status: 201,
    });
  } catch (error) {}
}

function uploader(files: any, signature: string, timestamp: number | string) {
  return files.map(async (file: File) => {
    // Initial FormData
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp as any);
    formData.append("folder", "posts");

    // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    return axios
      .post(process.env.NEXT_PUBLIC_CLOUDINARY_API_URL, formData)
      .then((response: AxiosResponse) => {
        const data = response.data;
        data.fileURL = data.secure_url; // You should store this URL for future references in your app
        return data;
      });
  });
}
