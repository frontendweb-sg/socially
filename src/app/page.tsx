import Typography from "@/components/controls/Typography";
import Container from "@/components/controls/Container";
import Box from "@/components/controls/Box";
import Col from "@/components/controls/Col";
import Row from "@/components/controls/Row";
import Logo from "@/components/layout/Logo";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AppContent } from "@/utils/content";

export default async function Home({ searchParams }: { searchParams: any }) {
  const session = await getServerSession();

  return (
    <Container full cover>
      <Row cover>
        <Col className="text-center bg-primary text-light align-items-center justify-content-center d-flex">
          <Container size="sm">
            <Logo className="mb-5" href="/" />
            <Typography>{AppContent.homeTitle}</Typography>
            <Typography variant="body2">{AppContent.homeContent}</Typography>
            {session ? (
              <></>
            ) : (
              <Box className="mt-5 mb-3">
                <Link className="btn btn-secondary btn-md me-4" href="/signin">
                  {AppContent.signIn}
                </Link>
                <Link className="btn btn-secondary btn-md" href="/signup">
                  {AppContent.signUp}
                </Link>
              </Box>
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
