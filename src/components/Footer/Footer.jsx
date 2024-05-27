import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <h3 className="text-center  text-md  m-auto w-2/4  flex justify-center items-center text-black  ">
        Copyright &copy; {new Date().getFullYear()} BlogApp
      </h3>
    </footer>
  );
}

export default Footer;
