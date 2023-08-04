"use server";

import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_API_URL + "/user";

export async function getUsers() {
  const cookieStore = cookies();
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${cookieStore}`,
    },
  });
  if (response.statusText !== "OK") return null;
  return await response.json();
}
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

export async function sendMail({ email }: { email: string }) {
  const response = await fetch(process.env.NEXTAUTH_URL + "/verify-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return response.json();
}
