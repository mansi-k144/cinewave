import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const headerStyle = {
    backgroundColor: "#111",
    color: "#fff",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap", // Makes it responsive
  };

  const navStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "15px",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    padding: "5px 10px",
    transition: "color 0.3s ease",
  };

  const activeLinkStyle = {
    color: "#FFD700",
    fontWeight: "bold",
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
  };

  return (
    <header style={headerStyle}>
      {/* Website Logo */}
      <div style={logoStyle}>
       
        <NavLink
          to="/"
          style={linkStyle}
          activestyle={activeLinkStyle}
        >
           <img
          src="/assets/logo.png" 
          alt="Digital Video Store Logo"
          style={{ height: "40px", marginRight: "10px", verticalAlign: "middle" }}
        />
        </NavLink>
        CINEWAVE
      </div>

      {/* Navigation Bar */}
      <nav style={navStyle}>
        <NavLink
          to="/movies"
          style={linkStyle}
          activestyle={activeLinkStyle}
        >
          Movies
        </NavLink>
        <NavLink
          to="/tvShows"
          style={linkStyle}
          activestyle={activeLinkStyle}
        >
          TV Shows
        </NavLink>
        <NavLink
          to="/signup"
          style={linkStyle}
          activestyle={activeLinkStyle}
        >
          Sign Up
        </NavLink>
        <NavLink
          to="/login"
          style={linkStyle}
          activestyle={activeLinkStyle}
        >
          Login
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
