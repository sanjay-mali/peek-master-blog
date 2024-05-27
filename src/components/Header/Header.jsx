import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, LogoutBtn } from "../index";
import Logo from "../../assets/logo.png";

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

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
  // #2b2f37 --dark mode

  return (
    <header className="py-3 shadow bg-[#fdfdfd]">
      <Container>
        <nav className="flex items-center justify-between mx-2">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              <img src={Logo} alt="logo" className="w-32" />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-2 ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="px-6 py-2 duration-200 text-black hover:text-white hover:bg-[#313538] rounded-md border border-black"
                >
                  {item.name}
                </button>
              ) : null
            )}
            {authStatus && <LogoutBtn />}
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle Menu">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </nav>
        {showMenu && (
          <ul className="md:hidden mt-2 space-y-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="block m-auto w-[90%] px-6 py-2 duration-200 text-black hover:text-white hover:bg-[#313538] rounded-md border border-black"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="m-auto w-[90%] px-6 py-2">
                <LogoutBtn />
              </li>
            )}
          </ul>
        )}
      </Container>
    </header>
  );
}

export default Header;

{
  /* <button
              className="block md:hidden ml-auto px-4 py-2 text-black focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button> 
<ul
  className={`flex-col md:flex-row md:flex ml-auto absolute top-full bg-white mt-2 md:mt-0 md:relative md:top-auto md:bg-transparent ${
    showMenu ? "flex" : "hidden"
  } transition duration-300 ease-in-out sm:w-[100%]`}
></ul>;
*/
}
