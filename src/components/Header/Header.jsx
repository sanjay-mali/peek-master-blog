import React, { act } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, LogoutBtn } from "../index";

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "About",
      path: "/about",
      active: authStatus,
    },
    {
      name: "All Posts",
      path: "/all-post",
      active: authStatus,
    },
    {
      name: "Create Post",
      path: "/create-post",
      active: authStatus,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Register",
      path: "/signup",
      active: !authStatus,
    },
  ];

  return (
    <>
      <header className="py-3 shadow bg-[#fdfdfd]">
        <Container>
          <nav className="flex">
            <div className="mr-4">
              <Link to="/" className="text-white text-2xl font-bold"></Link>
            </div>
            <ul className="flex ml-auto">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.path)}
                      className="inline-bock px-6 py-2 duration-200 text-black hover:text-white mx-2 hover:bg-[#313538] rounded-md border border-black border-1"
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
