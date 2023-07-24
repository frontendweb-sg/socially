"use server";

import { Api } from "@/axios-instance";

const getProfile = async (id: string) => {
  const response = await Api.get("/user/profile");
  const data = await response.data;

  return data;
};

export { getProfile };
