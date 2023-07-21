"use server";

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
  return response;
};
const updateDesignation = async (body: IDesignationDoc) => {
  const response = await designationService.update(body);
  return response;
};
const deleteDesignation = async (id: string) => {
  const response = await designationService.delete(id);
  return response;
};

export {
  getDesignations,
  addDesignation,
  updateDesignation,
  deleteDesignation,
};
