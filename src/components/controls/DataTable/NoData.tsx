import Image from "next/image";
import Box from "../Box";

/**
 * No data
 * @returns
 */
const NoData = () => {
  return (
    <Box className="no-data">
      <Image fill src="/no-data.png" alt="no data" />
    </Box>
  );
};

export default NoData;
