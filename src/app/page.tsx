import Auth from "@/components/auth";
import Col from "@/components/controls/Col";
import Container from "@/components/controls/Container";
import Row from "@/components/controls/Row";
import Typography from "@/components/controls/Typography";
import Logo from "@/components/layout/Logo";

export default function Home() {
  return (
    <Container full cover>
      <Row cover>
        <Col
          sm={12}
          md={6}
          className="bg-primary text-light align-items-center justify-content-center d-flex"
        >
          <Container size="sm">
            <Logo className="mb-5" href="/" />
            <Typography>Welcome to sign in</Typography>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit
            eius sint, voluptatem nesciunt, laborum placeat sunt culpa magni
            expedita facilis aut iste amet, reprehenderit consequatur voluptate
            ullam veniam ipsam quae!
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
          <Auth />
        </Col>
      </Row>
    </Container>
  );
}
