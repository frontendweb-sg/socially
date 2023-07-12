import { User } from "@/models/user";
import { getCsrfToken } from "next-auth/react";
import { cookies } from "next/headers";

export async function getUser() {
  const cookieStore = cookies();
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/me", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${cookieStore}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function updateUser(body: { mobile: string; name: string }) {
  const cookieStore = cookies();
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/me", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${cookieStore}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;
}
