import Box from "@/components/controls/Box";
import Skeleton from "@/components/controls/Skeleton";

const Loading = () => {
  return (
    <Box className="page-loader">
      <Skeleton animate as="avatar" size={150} />
    </Box>
  );
};

export default Loading;
