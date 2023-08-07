import Logo from "@/components/layout/Logo";
import Container from "@/components/controls/Container";
import Col from "@/components/controls/Col";
import Typography from "@/components/controls/Typography";
import Box from "@/components/controls/Box";
import { Base64 } from "js-base64";
import TokenExpired from "./TokenExpired";
import { FaCheck, FaEnvelope } from "react-icons/fa";
import Link from "next/link";

type Status = "token expired" | "success";
const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | Status };
}) => {
  const status = Base64.decode(searchParams.status);
  let element = null;
  if (status === "token expired") element = <TokenExpired />;
  if (status === "verified")
    element = (
      <Box>
        <div className="email-icon">
          <FaCheck size={50} />
        </div>
        <Typography>Thank you</Typography>
        <Typography>You have verified your email!</Typography>
        <Link href="/signin" className="btn btn-sm mt-4 btn-primary">
          Sign in
        </Link>
      </Box>
    );
  return (
    <>
      <Col
        sm={12}
        md={6}
        className="bg-primary text-light align-items-center justify-content-center d-flex"
      >
        <Container size="sm">
          <Logo className="mb-5" href="/" />
          <Typography>Welcome to sign in</Typography>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit eius
          sint, voluptatem nesciunt, laborum placeat sunt culpa magni expedita
          facilis aut iste amet, reprehenderit consequatur voluptate ullam
          veniam ipsam quae!
          <Typography variant="h5" className="mt-4">
            Learn frontend technologies by expert
          </Typography>
        </Container>
      </Col>
      <Col
        className="justify-content-center align-items-center d-flex"
        sm={12}
        md={6}
        style={{ position: "relative" }}
      >
        <Box className="auth-verify">
          {element}
          {/* <ResendEmail /> */}
        </Box>
      </Col>
    </>
  );
};

export default Page;
