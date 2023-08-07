"use server";
import { IError } from "@/app/api/errors/custom-error";
import { IPost, IPostDoc } from "@/models/post";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getPosts(query: string = "") {
  const cookie = cookies();
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/post" + (!!query ? "?" + query : ""),
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie}`,
      },
    }
  );

  const data: IPostDoc[] | Promise<{ errors: IError }> = await response.json();
  return data;
}

export async function getPostsByUser(userId: string) {
  const posts = (await getPosts()) as IPostDoc[];
  const userPosts = posts?.filter((post: IPostDoc) => post.user == userId);

  return userPosts;
}

export async function getPost(postId: string) {
  const cookie = cookies();

  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/post/" + postId,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie}`,
      },
    }
  );

  return await response.json();
}

export async function addPost(body: IPost, cookie: ReturnType<typeof cookies>) {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${cookie}`,
    },
    body: JSON.stringify(body),
  });

  revalidatePath("/user/posts");
  return await response.json();
}

export async function updatePost(
  body: IPostDoc,
  cookie: ReturnType<typeof cookies>
) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/post/" + body.id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie}`,
      },
      body: JSON.stringify(body),
    }
  );

  return await response.json();
}

export async function deletePost(id: string) {
  const cookie = cookies();
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/post/" + id,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie}`,
      },
    }
  );
  return await response.json();
}

/**
 * Get all comments
 * @param id
 */
export async function getComments(id: string) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/post/" + id + "/comment",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
}
