import { Skill } from "./Skill";
import { skillService } from "@/services/skill.service";

/**
 * Skill page
 * @returns
 */
const Page = async () => {
  const data = await skillService.getAll();
  return <Skill data={data} />;
};

export default Page;
