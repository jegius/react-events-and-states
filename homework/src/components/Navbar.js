import React from "react";
import { NavLink } from "react-router-dom";
import "./Form.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/auth">Авторизация</NavLink>
      <NavLink to="/chat">Чат</NavLink>
    </nav>
  );
};

export default Navbar;