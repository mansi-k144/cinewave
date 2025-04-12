import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { VideoStoreContext } from "../context/VideoStoreProvider";

const RegistrationPage = () => {
  const { authFetch } = useContext(VideoStoreContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      setError("You must accept the terms and conditions");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await authFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        })
      });

      if (response.error) {
        throw new Error(response.error);
      }

      navigate('/login', { 
        state: { 
          success: true,
          message: 'Registration successful! Please log in.' 
        } 
      });
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Style objects (unchanged from your original)
  const pageStyle = {
    backgroundColor: "#2C3E50",
    color: "white",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  };

  const formStyle = {
    backgroundColor: "#fff",
    color: "#000",
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
    display: "flex",
    alignItems: "center"
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
    transition: "all 0.3s ease",
    opacity: loading ? 0.7 : 1
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
    opacity: loading ? 0.7 : 1
  };

  const facebookStyle = { backgroundColor: "#4267B2" };
  const googleStyle = { backgroundColor: "#ff6600" };

  const errorStyle = {
    color: "#e74c3c",
    fontSize: "14px",
    marginBottom: "15px",
    textAlign: "center"
  };

  return (
    <div style={pageStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h1 style={headingStyle}>Create an Account</h1>
        
        {error && <div style={errorStyle}>{error}</div>}

        <input 
          type="text" 
          placeholder="First Name" 
          name="firstName"
          style={inputStyle} 
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input 
          type="text" 
          placeholder="Last Name" 
          name="lastName"
          style={inputStyle} 
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          name="email"
          style={inputStyle} 
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          name="password"
          style={inputStyle} 
          value={formData.password}
          onChange={handleChange}
          required
          minLength="6"
        />

        <div style={checkboxStyle}>
          <input 
            type="checkbox" 
            id="termsCheckbox" 
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
          />
          <label htmlFor="termsCheckbox" style={{ marginLeft: "10px", fontSize: "14px" }}>
            I certify that I am at least 18 years old and agree to the{" "}
            <NavLink to="/terms" style={linkStyle}>
              Terms and Policies
            </NavLink>{" "}
            and{" "}
            <NavLink to="/privacy" style={linkStyle}>
              Privacy Policy
            </NavLink>.
          </label>
        </div>

        <button 
          type="submit" 
          style={buttonStyle}
          disabled={loading}
          onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = "#FFC000")}
          onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = "#FFD700")}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        <p style={{ textAlign: "center", fontSize: "14px", margin: "15px 0" }}>OR</p>

        <button 
          type="button" 
          style={{ ...socialButtonStyle, ...facebookStyle }}
          disabled={loading}
        >
          Sign Up with Facebook
        </button>
        <button 
          type="button" 
          style={{ ...socialButtonStyle, ...googleStyle }}
          disabled={loading}
        >
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