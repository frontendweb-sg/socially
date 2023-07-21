import Header from "@/components/layout/Header";
import Sidebar from "./sidebar";
import { Suspense } from "react";
import Loading from "./loading";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
    </>
  );
};

export default Layout;
