import { AuthError } from "@/app/api/errors/auth-error";
import { connectDb } from "@/lib/db";
import { User } from "@/models/user";
import { Jwt } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";
import { Base64 } from "js-base64";

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;
  await connectDb();
  try {
    const url = req.nextUrl.clone();
    const verify = Jwt.verifyToken(token) as any;
    if (!token)
      return NextResponse.redirect(
        process.env.NEXTAUTH_URL +
          "/email-verification?status=" +
          Base64.encode("token expired")
      );
    let isTrue: string = new Boolean(!!verify).toString();
    url.searchParams.set("status", isTrue && Base64.encode("verified"));
    url.pathname = encodeURI("/email-verification");

    const date = new Date(verify.exp * 1000);
    const user = await User.findOne({ email: verify.email });
    if (user && date > new Date()) {
      await User.findByIdAndUpdate(
        verify.id,
        {
          $set: { resetToken: "", verify: true },
        },
        { new: true }
      );
      return NextResponse.redirect(url);
    }
    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.redirect(
      process.env.NEXTAUTH_URL +
        "/email-verification?status=" +
        Base64.encode("token expired")
    );
  }
}
