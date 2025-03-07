import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  // Styling
  const footerStyle = {
    backgroundColor: "#2C3E50",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    borderTop: "2px solid #FFD700",
    fontSize: "14px",
  };

  const topSectionStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    flexWrap: "wrap", // Makes items wrap for smaller screens
  };

  const columnStyle = {
    flex: "1",
    marginRight: "10px",
    marginBottom: "20px", // Adds spacing for smaller screens
    minWidth: "150px", // Ensures columns stay readable on small screens
  };

  const listHeadingStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    borderBottom: "1px solid #FFD700",
    paddingBottom: "10px",
    marginBottom: "10px",
  };

  const listItemStyle = {
    listStyleType: "none",
    marginBottom: "5px",
  };

  const bottomSectionStyle = {
    display: "flex",
    flexDirection: "column", // Stack items vertically on smaller screens
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: "10px",
  };

  const socialMediaIconContainerStyle = {
    display: "flex",
    gap: "15px",
    fontSize: "20px",
  };

  const socialMediaIconStyle = {
    color: "#FFD700",
    cursor: "pointer",
    transition: "color 0.3s ease",
  };

  const hoverEffect = {
    color: "#FFFFFF",
  };

  // Media query for smaller screens
  const mediaQueryStyle = `
    @media (max-width: 768px) {
      footer {
        font-size: 12px;
      }

      .footer-top-section {
        flex-direction: column;
        gap: 10px;
      }

      .footer-bottom-section {
        flex-direction: column;
        text-align: center;
      }
    }
  `;

  return (
    <footer style={footerStyle}>
      <style>{mediaQueryStyle}</style>
      {/* Top Section with Lists */}
      <div style={topSectionStyle}>
        <div style={columnStyle}>
          <h4 style={listHeadingStyle}>Watch</h4>
          <ul>
            <li style={listItemStyle}>Spotlight</li>
            <li style={listItemStyle}>Movies</li>
            <li style={listItemStyle}>TV</li>
            <li style={listItemStyle}>Free</li>
          </ul>
        </div>
        <div style={columnStyle}>
          <h4 style={listHeadingStyle}>My Account</h4>
          <ul>
            <li style={listItemStyle}>CineWave</li>
            <li style={listItemStyle}>Account</li>
            <li style={listItemStyle}>Settings</li>
            <li style={listItemStyle}>Manage Devices</li>
          </ul>
        </div>
        <div style={columnStyle}>
          <h4 style={listHeadingStyle}>Features</h4>
          <ul>
            <li style={listItemStyle}>Lists</li>
            <li style={listItemStyle}>Family</li>
            <li style={listItemStyle}>Disc to Digital</li>
            <li style={listItemStyle}>InstaWatch</li>
            <li style={listItemStyle}>Movies Anywhere</li>
          </ul>
        </div>
        <div style={columnStyle}>
          <h4 style={listHeadingStyle}>Help</h4>
          <ul>
            <li style={listItemStyle}>About Us</li>
            <li style={listItemStyle}>Devices</li>
            <li style={listItemStyle}>Support</li>
            <li style={listItemStyle}>Forums</li>
            <li style={listItemStyle}>Contact Us</li>
            <li style={listItemStyle}>Jobs</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section with Social Media Icons */}
      <div style={bottomSectionStyle}>
        <p>&copy; {new Date().getFullYear()} Hollywood Spotlight. All rights reserved.</p>
        <div style={socialMediaIconContainerStyle}>
          <FaFacebookF
            style={socialMediaIconStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = hoverEffect.color)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#FFD700")}
          />
          <FaTwitter
            style={socialMediaIconStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = hoverEffect.color)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#FFD700")}
          />
          <FaInstagram
            style={socialMediaIconStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = hoverEffect.color)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#FFD700")}
          />
          <FaYoutube
            style={socialMediaIconStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = hoverEffect.color)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#FFD700")}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
