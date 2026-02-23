import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode; // <- THIS is needed
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />

      {/* Navbar */}
      <nav style={{ padding: "10px 20px", borderBottom: "1px solid #ccc" }}>
        <Link to="/employees" style={{ marginRight: "15px" }}>Employees</Link>
        <Link to="/organization">Organization</Link>
      </nav>

      <main style={{ padding: "20px" }}>{children}</main>

      <Footer />
    </>
  );
}