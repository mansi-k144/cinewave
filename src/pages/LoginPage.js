import React from "react";
import { NavLink } from "react-router-dom";


const LoginPage = () => {
  // Styling
  const pageStyle = {
    backgroundColor: "#2C3E50", // Matches your global background color
    color: "white",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  };

  const formStyle = {
    backgroundColor: "#fff", // White background for the form
    color: "#000", // Black text for form elements
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    width: "100%",
    maxWidth: "400px",
  };

  const headingStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    backgroundColor: "#FFD700",
    color: "#000",
    padding: "10px",
    width: "100%",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    margin: "15px 0",
    textAlign: "center",
  };

  const linkStyle = {
    color: "#FFD700",
    textDecoration: "none",
    fontWeight: "bold",
  };

  const socialButtonStyle = {
    display: "block",
    width: "100%",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    textAlign: "center",
    fontSize: "16px",
    marginBottom: "10px",
    cursor: "pointer",
  };

  const facebookStyle = { backgroundColor: "#4267B2" };
  const googleStyle = { backgroundColor: "#ff6600" };

  return (
    
    <div style={pageStyle}>
      {/* Login Form */}
      <form style={formStyle}>
        <h1 style={headingStyle}>Sign In</h1>
        <input type="email" placeholder="Email Address" style={inputStyle} />
        <input type="password" placeholder="Password" style={inputStyle} />

        <NavLink to="/forgot-password" style={{ ...linkStyle, fontSize: "14px", display: "block", marginBottom: "15px" }}>
          Forgot your password?
        </NavLink>

        <button type="submit" style={buttonStyle}>
          Sign In
        </button>

        <p style={{ textAlign: "center", fontSize: "14px", margin: "15px 0" }}>OR</p>

        <button type="button" style={{ ...socialButtonStyle, ...facebookStyle }}>
          Sign In with Facebook
        </button>
        <button type="button" style={{ ...socialButtonStyle, ...googleStyle }}>
          Sign In with Google
        </button>

        <p style={{ textAlign: "center", fontSize: "14px", marginTop: "15px" }}>
          Don’t have an account?{" "}
          <NavLink to="/signup" style={linkStyle}>
            Create one
          </NavLink>
        </p>
      </form>
    </div>
   
  );
};

export default LoginPage;
