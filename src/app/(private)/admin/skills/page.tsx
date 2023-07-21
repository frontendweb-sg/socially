import { Skill } from "./Skill";
import { skillService } from "@/services/skill.service";

/**
 * Skill page
 * @returns
 */
export const revalidate = 0;
const Page = async () => {
  const data = await skillService.getAll();
  return <Skill data={data} />;
};

export default Page;
