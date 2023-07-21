import { IError } from "@/app/api/errors/custom-error";
import { Api } from "@/axios-instance";
import { ISkill, ISkillDoc } from "@/models/skill";
import type { AxiosResponse } from "axios";
/**
 * Skill service
 */
class SkillService {
  getIntialData() {
    return {
      title: "",
      slug: "",
      active: true,
    } as ISkill;
  }

  async getAll(): Promise<ISkillDoc[] | undefined> {
    try {
      const response = await Api.get("/skill");
      return response.data;
    } catch (error) {
      return undefined;
    }
  }

  add(body: ISkill): Promise<AxiosResponse<ISkill | { errors: IError }>> {
    return Api.post("/skill", body);
  }
  update(body: ISkillDoc): Promise<AxiosResponse<ISkill>> {
    return Api.put("/skill/" + body.id, body);
  }
  delete(id: string): Promise<AxiosResponse<ISkill>> {
    return Api.delete("/skill/" + id);
  }
}

const skillService = new SkillService();
export { skillService };
