import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { VideoStoreContext } from "../context/VideoStoreProvider";

const Header = () => {
  const { user, logout } = useContext(VideoStoreContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Styles
  const headerStyle = {
    backgroundColor: "#111",
    color: "#fff",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)"
  };

  const navStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "15px",
    alignItems: "center",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    padding: "5px 10px",
    transition: "all 0.3s ease",
    borderRadius: "4px",
  };

  const activeLinkStyle = {
    color: "#FFD700",
    fontWeight: "bold",
    backgroundColor: "rgba(255, 215, 0, 0.1)",
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
    gap: "10px",
  };

  const searchStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.3s ease",
  };

  const searchInputStyle = {
    padding: "8px 15px",
    borderRadius: "20px",
    border: "none",
    outline: "none",
    fontSize: "14px",
    width: "200px",
    backgroundColor: "#333",
    color: "white",
  };

  const searchButtonStyle = {
    background: "#FFD700",
    color: "#000",
    border: "none",
    borderRadius: "20px",
    padding: "8px 15px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#FFC000",
    },
  };

  const toggleButtonStyle = {
    ...linkStyle,
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => {
        document.getElementById("search-input")?.focus();
      }, 100);
    } else {
      setSearchQuery("");
    }
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <NavLink to="/" style={linkStyle} activestyle={activeLinkStyle}>
          <img
            src="/assets/logo.png"
            alt="CineWave Logo"
            style={{ height: "40px", verticalAlign: "middle" }}
          />
        </NavLink>
        <span>CINEWAVE</span>
      </div>

      <nav style={navStyle}>
        {/* Search Form */}
        {showSearch && (
          <form onSubmit={handleSearch} style={searchStyle}>
            <input
              id="search-input"
              type="text"
              placeholder="Search movies and shows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={searchInputStyle}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              autoFocus
            />
            <button type="submit" style={searchButtonStyle}>
              Search
            </button>
          </form>
        )}

        {/* Navigation Links */}
        {!showSearch && (
          <>
            <NavLink 
              to="/movies" 
              style={({ isActive }) => ({
                ...linkStyle,
                ...(isActive ? activeLinkStyle : {})
              })}
            >
              Movies
            </NavLink>
            <NavLink 
              to="/tvShows" 
              style={({ isActive }) => ({
                ...linkStyle,
                ...(isActive ? activeLinkStyle : {})
              })}
            >
              TV Shows
            </NavLink>
          </>
        )}

        {/* Search Toggle Button */}
        <button 
          onClick={toggleSearch}
          style={toggleButtonStyle}
          aria-label={showSearch ? "Close search" : "Open search"}
        >
          {showSearch ? "Close" : "Search"}
        </button>

        {/* User Auth Links */}
        {user ? (
          <>
            <NavLink 
              to="/dashboard" 
              style={({ isActive }) => ({
                ...linkStyle,
                ...(isActive ? activeLinkStyle : {})
              })}
            >
              Dashboard
            </NavLink>
            <button 
              onClick={handleLogout}
              style={{
                ...linkStyle,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink 
              to="/signup" 
              style={({ isActive }) => ({
                ...linkStyle,
                ...(isActive ? activeLinkStyle : {})
              })}
            >
              Sign Up
            </NavLink>
            <NavLink 
              to="/login" 
              style={({ isActive }) => ({
                ...linkStyle,
                ...(isActive ? activeLinkStyle : {})
              })}
            >
              Login
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;