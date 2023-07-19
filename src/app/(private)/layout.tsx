import Header from "@/components/layout/Header";
import Sidebar from "./sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="container mt-4 mb-4">
        <div className="row">
          <Sidebar />
          <div className="col-md-9">{children}</div>
        </div>
      </main>
    </>
  );
};

export default Layout;
