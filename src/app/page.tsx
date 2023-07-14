import Box from "@/components/controls/Box";
import Col from "@/components/controls/Col";
import Container from "@/components/controls/Container";
import Row from "@/components/controls/Row";
import Typography from "@/components/controls/Typography";
import Logo from "@/components/layout/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <Container full cover>
      <Row cover>
        <Col className="text-center bg-primary text-light align-items-center justify-content-center d-flex">
          <Container size="sm">
            <Logo className="mb-5" href="/" />
            <Typography>Welcome to Socially</Typography>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit
            eius sint, voluptatem nesciunt, laborum placeat sunt culpa magni
            expedita facilis aut iste amet, reprehenderit consequatur voluptate
            ullam veniam ipsam quae!
            <Box className="mt-5 mb-3">
              <Link className="btn btn-secondary btn-md me-4" href="/signin">
                Sign in
              </Link>
              <Link className="btn btn-secondary btn-md" href="/signup">
                Sign up
              </Link>
            </Box>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
