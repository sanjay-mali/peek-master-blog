import React, { act } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, LogoutBtn } from '../index'

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true
    },
    {
      name: "About",
      path: "/about",
      active: authStatus
    },
    {
      name: "All Posts",
      path: "/posts",
      active: authStatus
    },
    {
      name: "Create Post",
      path: "/create-post",
      active: authStatus
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus
    },
    {
      name: "Register",
      path: "/register",
      active: !authStatus
    },
  ];

  return (
    <>
      <header className="py-3 shadow bg-slate-500">
        <Container>
          <nav className="flex">
            <div className="mr-4">
              <Link to="/" className="text-white text-2xl font-bold">
                BlogApp
              </Link>
            </div>
            <ul className="flex ml-auto">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.path)}
                      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>
    </>
  );
}

export default Header;
