import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { VideoStoreContext } from "../context/VideoStoreProvider";

const LoginPage = () => {
  const { login } = useContext(VideoStoreContext);
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/dashboard'); // Redirect on successful login
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError(error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  // Style objects 
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

  const errorStyle = {
    color: "#e74c3c",
    fontSize: "14px",
    marginBottom: "15px",
    textAlign: "center"
  };

  return (
    <div style={pageStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h1 style={headingStyle}>Sign In</h1>
        
        {error && <div style={errorStyle}>{error}</div>}

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

        <NavLink 
          to="/forgot-password" 
          style={{ ...linkStyle, fontSize: "14px", display: "block", marginBottom: "15px" }}
        >
          Forgot your password?
        </NavLink>

        <button 
          type="submit" 
          style={buttonStyle}
          disabled={loading}
          onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = "#FFC000")}
          onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = "#FFD700")}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <p style={{ textAlign: "center", fontSize: "14px", margin: "15px 0" }}>OR</p>

        <button 
          type="button" 
          style={{ ...socialButtonStyle, ...facebookStyle }}
          disabled={loading}
        >
          Sign In with Facebook
        </button>
        <button 
          type="button" 
          style={{ ...socialButtonStyle, ...googleStyle }}
          disabled={loading}
        >
          Sign In with Google
        </button>

        <p style={{ textAlign: "center", fontSize: "14px", marginTop: "15px" }}>
          Don't have an account?{" "}
          <NavLink to="/signup" style={linkStyle}>
            Create one
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;