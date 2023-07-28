"use server";
import axios from "axios";
import { cookies } from "next/headers";

export const addLike = async (id: string) => {
  const cookie = cookies();
  const response = await axios.post(
    "/post/" + id + "/like?status=active",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie}`,
      },
    }
  );
  console.log(response.data, "data");
};
