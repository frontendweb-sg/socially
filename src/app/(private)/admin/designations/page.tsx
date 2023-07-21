import { getDesignations } from "@/lib/designation";
import Designation from "./Designation";

const Page = async () => {
  const designaions = await getDesignations();
  console.log("designaions", designaions);
  return <Designation data={designaions} />;
};

export default Page;
