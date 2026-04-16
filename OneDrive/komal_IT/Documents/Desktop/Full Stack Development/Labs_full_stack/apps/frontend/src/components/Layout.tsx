import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton
} from "@clerk/clerk-react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <nav
        style={{
          padding: "10px 20px",
          borderBottom: "1px solid #ccc",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <Link to="/employees" style={{ marginRight: "15px" }}>
            Employees
          </Link>
          <Link to="/organization">Organization</Link>
        </div>

        <div>
          <SignedOut>
            <SignInButton mode="modal">
              <button type="button">Log In</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <UserButton />
              <SignOutButton>
                <button type="button">Log Out</button>
              </SignOutButton>
            </div>
          </SignedIn>
        </div>
      </nav>
      <main style={{ padding: "20px" }}>{children}</main>
      <Footer />
    </>
  );
}
