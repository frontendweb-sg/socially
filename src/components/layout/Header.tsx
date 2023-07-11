import { AppContent } from "@/utils/content";
import Link from "next/link";

const Header = () => {
  return (
    <header className="navbar navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" href="/">
          {AppContent.brand}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
