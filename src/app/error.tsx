"use client";
import Box from "@/components/controls/Box";
import { useEffect } from "react";

const Error = ({ error }: { error: string }) => {
  useEffect(() => {
    console.log("e", error);
  }, [error]);
  return <Box>Something went wrong</Box>;
};

export default Error;
