"use client";
import React, { ReactNode, useState } from "react";
import Box, { BoxProps } from "../controls/Box";
import Typography from "../controls/Typography";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import AuthProvider from "../providers/AuthProvider";
import { Variant } from "@/utils/types";

interface AuthProps {
  title: string;
  subtitle?: string;
}
type AuthHeaderProps = AuthProps &
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    variant?: Variant;
    boxProps?: BoxProps;
  };

const AuthHeader = ({
  title,
  children,
  variant,
  boxProps,
  ...rest
}: AuthHeaderProps) => {
  return (
    <Box className="mb-4" {...boxProps}>
      <Typography variant={variant} className="mb-2">
        {title}
      </Typography>
      <Typography variant="span">{children}</Typography>
    </Box>
  );
};

const Auth = ({ children, ...rest }: { children?: ReactNode }) => {
  const [enable, setEnable] = useState(true);

  const onChangeHandler = () => setEnable((prev) => !prev);

  const element = enable ? (
    <SigninForm onChange={onChangeHandler} />
  ) : (
    <SignupForm onChange={onChangeHandler} />
  );

  return (
    <Box>
      {children}
      {element}
      <Box className="mt-2 mb-2 text-center">Or</Box>
      <AuthProvider />
    </Box>
  );
};

Auth.Header = AuthHeader;
export default Auth;
