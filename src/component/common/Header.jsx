import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../css/header2.css";

const Header = () => {

  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  return (
    <header className="header">

      {/* Left Logo */}
      <div className="logo">
        Writing<span>Mitra</span>
      </div>

      {/* Center Menu */}
      <nav className="nav">
        <Link className={isActive("/")} to="/">Home</Link>
        <Link className={isActive("/about")} to="/about">About</Link>
        <Link className={isActive("/contact")} to="/contact">Contact</Link>
        <Link className={isActive("/user/allCompetition")} to="/user/allCompetition">Competitions</Link>
        <Link className={isActive("/user/ourwinners")} to="/user/ourwinners">Winners</Link>
        <Link className={isActive("/userHelp")} to="/userHelp">UserHelp</Link>
      </nav>

      {/* Right Buttons */}
      <div className="actions">
        <Link to="/login/user" className="login">Login</Link>
        <Link to="/register/user" className="register">Register</Link>
      </div>

    </header>
  );
};

export default Header;