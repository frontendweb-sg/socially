import Header from "@/components/layout/Header";
import Sidebar from "./sidebar";
import Footer from "@/components/layout/Footer";
import Loading from "./loading";
import { Suspense } from "react";
import { getCurrentUser } from "../action/getCurrentUser";
import Alert from "@/components/controls/Alert";
import { IUserDoc } from "@/models/user";
import ResendEmailButton from "../(auth)/email-verification/ResendVerificationButton";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = (await getCurrentUser()) as IUserDoc;

  return (
    <>
      <Header />
      <main className="container mt-4 mb-4">
        {session && !session.verify && (
          <Alert
            alert={{
              visible: true,
              color: "info",
              message: "Please verify your email!",
            }}
          >
            <ResendEmailButton email={session.email} />
          </Alert>
        )}
        <div className="row row-mod">
          <Sidebar />
          <div className="col-lg-9">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </div>
      </main>
      <Footer className="footer-public" />
    </>
  );
};

export default Layout;
