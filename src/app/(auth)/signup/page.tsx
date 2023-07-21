import SignupForm from "@/app/(auth)/forms/SignupForm";
import Logo from "@/components/layout/Logo";
import Container from "@/components/controls/Container";
import Col from "@/components/controls/Col";
import Typography from "@/components/controls/Typography";
const Page = () => {
  return (
    <>
      <Col
        sm={12}
        md={6}
        className="bg-primary text-light align-items-center justify-content-center d-flex"
      >
        <Container size="sm">
          <Logo className="mb-5" href="/" />
          <Typography>Welcome to sign up</Typography>
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
        <SignupForm />
      </Col>
    </>
  );
};

export default Page;
