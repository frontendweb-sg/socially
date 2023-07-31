"use server";

import { Api } from "@/axios-instance";
import { IDesignation, IDesignationDoc } from "@/models/designation";
import { designationService } from "@/services/designaion.service";
import { revalidatePath } from "next/cache";

const getDesignations = async () => {
  const response = await designationService.getAll();
  if (response.statusText !== "OK") return undefined;
  return response.data;
};

const addDesignation = async (body: IDesignation) => {
  const response = await designationService.add(body);
  revalidatePath("/admin/designations");
  return response;
};

const updateDesignation = async (body: IDesignationDoc) => {
  const response = await designationService.update(body);
  revalidatePath("/admin/designations");
  return response;
};

const deleteDesignation = async (id: string) => {
  await designationService.delete(id);
  revalidatePath("/admin/designations");
};

export {
  getDesignations,
  addDesignation,
  updateDesignation,
  deleteDesignation,
};
