import React from "react";
import { NavLink } from "react-router-dom";


const RegistrationPage = () => {
  // Styling
  const pageStyle = {
    backgroundColor: "#2C3E50", // Matches the background color of the homepage
    color: "white",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  };

  const formStyle = {
    backgroundColor: "#fff", // White form background
    color: "#000", // Black text for the form
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

  const checkboxStyle = {
    margin: "10px 0",
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

  const footerStyle = {
    textAlign: "center",
    marginTop: "10px",
    fontSize: "14px",
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
    
      {/* Registration Form */}
      <form style={formStyle}>
        <h1 style={headingStyle}>Create an Account</h1>
        <input type="text" placeholder="First Name" style={inputStyle} />
        <input type="text" placeholder="Last Name" style={inputStyle} />
        <input type="email" placeholder="Email Address" style={inputStyle} />
        <input type="password" placeholder="Password" style={inputStyle} />

        <div style={checkboxStyle}>
          <input type="checkbox" id="termsCheckbox" />
          <label htmlFor="termsCheckbox" style={{ marginLeft: "10px", fontSize: "14px" }}>
            I certify that I am at least 18 years old and agree to the{" "}
            <NavLink to=" " style={linkStyle}>
              Terms and Policies
            </NavLink>{" "}
            and{" "}
            <NavLink to=" " style={linkStyle}>
              Privacy Policy
            </NavLink>.
          </label>
        </div>

        <button type="submit" style={buttonStyle}>
          Create Account
        </button>

        <p style={{ textAlign: "center", fontSize: "14px", margin: "15px 0" }}>OR</p>

        <button type="button" style={{ ...socialButtonStyle, ...facebookStyle }}>
          Sign Up with Facebook
        </button>
        <button type="button" style={{ ...socialButtonStyle, ...googleStyle }}>
          Sign Up with Google
        </button>

        <p style={footerStyle}>
          Already have an account?{" "}
          <NavLink to="/login" style={linkStyle}>
            Sign In
          </NavLink>
        </p>
      </form>
      
  
    </div>
  );
};

export default RegistrationPage;
