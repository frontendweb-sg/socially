import Header from "@/components/layout/Header";
import Sidebar from "./sidebar";
import Footer from "@/components/layout/Footer";
import Loading from "./loading";
import { Suspense } from "react";
import { getCurrentUser } from "../action/getCurrentUser";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getCurrentUser();

  return (
    <>
      <Header />
      <main className="container mt-4 mb-4">
        <div className="row">
          <Sidebar />
          <div className="col-md-9">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </div>
      </main>
      <Footer className="footer-public" />
    </>
  );
};

export default Layout;
