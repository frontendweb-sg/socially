"use client";
import Container from "@/components/controls/Container";
import Row from "@/components/controls/Row";
import { useRedirect } from "@/hooks/useRedirect";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  useRedirect();
  return (
    <Container full cover>
      <Row cover>{children}</Row>
    </Container>
  );
};

export default Layout;
