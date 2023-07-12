import Header from "@/components/layout/Header";
import Sidebar from "./sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">{children}</div>
        </div>
      </main>
    </>
  );
};

export default Layout;
