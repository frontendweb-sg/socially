import { getDesignations } from "@/lib/designation";
import Designation from "./Designation";

export const revalidate = 0;
const Page = async () => {
  const designaions = await getDesignations();
  return <Designation data={designaions!} />;
};

export default Page;
