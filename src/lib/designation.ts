"use server";

import { designationService } from "@/services/designaion.service";

const getDesignations = async () => {
  const response = await designationService.getAll();
  return response.data;
};

export { getDesignations };
