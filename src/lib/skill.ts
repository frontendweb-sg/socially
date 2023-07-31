"use server";

import axios from "axios";
import { Api } from "@/axios-instance";
import { ISkill, ISkillDoc } from "@/models/skill";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_API_URL + "/skill";
const addSkill = async (body: ISkill) => {
  const cookie = cookies();
  await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `${cookie}`,
    },
  });
  revalidatePath("/admin/skill");
};

const skillUpdate = async (body: ISkillDoc) => {
  try {
    const cookie = cookies();
    const response = await axios.put(url + "/" + body.id, body, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie}`,
      },
    });
    revalidatePath("/admin/skill");
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.data;
  }
};
const getSkills = () => {
  try {
  } catch (error) {}
};

const deleteSkill = async (id: string) => {
  await Api.delete(url + "/" + id);
  revalidatePath("/admin/skills");
};

export { deleteSkill, addSkill, skillUpdate };
