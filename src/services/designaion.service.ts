import { IError } from "@/app/api/errors/custom-error";
import { Api } from "@/axios-instance";
import { IDesignation, IDesignationDoc } from "@/models/designation";
import type { AxiosResponse } from "axios";
/**
 * Designation service
 */
class DesignationService {
  getIntialData() {
    return {
      id: 0,
      title: "",
      slug: "",
      active: true,
    } as IDesignation;
  }
  getAll(): Promise<AxiosResponse<IDesignationDoc[]>> {
    return Api.get("/designation");
  }
  add(
    body: IDesignation
  ): Promise<AxiosResponse<IDesignation | { errors: IError }>> {
    return Api.post("/designation", body);
  }
  update(body: IDesignationDoc): Promise<AxiosResponse<IDesignationDoc>> {
    return Api.put("/designation/" + body.id, body);
  }
  delete(id: string): Promise<AxiosResponse<IDesignationDoc>> {
    return Api.delete("/designation/" + id);
  }
}

const designationService = new DesignationService();
export { designationService };
