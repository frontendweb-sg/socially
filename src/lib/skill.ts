"use server";

import { skillService } from "@/services/skill.service";
import { revalidatePath } from "next/cache";

const addSkill = () => {};

const updateSkill = () => {};
const getSkills = () => {
  try {
  } catch (error) {}
};
const deleteSkill = async (id: string) => {
  try {
    await skillService.delete(id);
    revalidatePath("/admin/skill");
  } catch (error) {
    console.log(error);
  }
};

export { deleteSkill };
