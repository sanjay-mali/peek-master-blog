import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="absolute bottom-0">
      <h3 className="text-center text-md  m-auto w-2/4  flex items-center text-white  ">
        Copyright &copy; {new Date().getFullYear()} BlogApp
      </h3>
    </footer>
  );
}

export default Footer;
