"use client";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AuthContext from "@/contexts/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const pathname = usePathname();

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <h3 className="navbar-brand">M.Q</h3>
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/">
                <h3 className={`nav-link ${pathname === "/" ? " active" : ""}`}>
                  Home
                </h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/posts">
                <h3
                  className={`nav-link ${
                    pathname === "/posts" ? " active" : ""
                  }`}
                >
                  posts
                </h3>
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {user ? (
              <div className="d-flex align-items-center">
                <h6>{user.name}</h6>
                <button
                  type="button"
                  onClick={logout}
                  className="btn btn-primary btn-sm ms-3"
                >
                  logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/auth/register">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                  >
                    register
                  </button>
                </Link>
                <Link href="/auth/login">
                  <button type="button" className="btn btn-primary btn-sm ms-3">
                    login
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
