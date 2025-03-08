import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { VideoStoreContext } from "../context/VideoStoreProvider";

const FeaturedTVShows = () => {
  const { tvShows } = useContext(VideoStoreContext); // Access TV shows from context
  const navigate = useNavigate(); // Initialize navigation function

  // Pre-sliced TV Shows for display
  const featuredTVShows = tvShows.slice(0, 6);

  // Function to handle navigation to the details page
  const handleShowClick = (id) => {
    navigate(`/tvdetails/${id}`); // Navigate to the details page of the clicked TV show
  };

  // Function to navigate to the TV Shows Listing Page
  const handleViewMoreClick = () => {
    navigate("/tvshows"); // Navigate to the TV Shows listing page
  };

  // Styling (consistent with the Hero Section and Featured Movies)
  const sectionStyle = {
    padding: "20px",
    backgroundColor: "#2C3E50",
    color: "white",
    borderRadius: "10px",
    margin: "20px 0",
    position: "relative",
  };

  const headingStyle = {
    borderBottom: "2px solid #FFD700",
    paddingBottom: "10px",
    marginBottom: "20px",
    fontSize: "24px",
  };

  const viewMoreButtonStyle = {
    position: "absolute",
    top: "20px",
    right: "20px",
    padding: "10px 20px",
    backgroundColor: "#FFD700",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const tvShowContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  };

  const tvShowCardStyle = {
    width: "200px",
    margin: "10px",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  };

  const tvShowImageStyle = {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
  };

  const tvShowTitleStyle = {
    marginTop: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#FFD700", // Title color consistent with Hero Section
  };

  return (
    <section style={sectionStyle}>
      {/* "View More" Button */}
      <button style={viewMoreButtonStyle} onClick={handleViewMoreClick}>
        View More
      </button>

      <h2 style={headingStyle}>Featured TV Shows</h2>
      <div style={tvShowContainerStyle}>
        {featuredTVShows.map((show) => (
          <div
            key={show.id}
            style={tvShowCardStyle}
            onClick={() => handleShowClick(show.id)} // Trigger navigation
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")} // Hover effect
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
            <img
              src={show.poster}
              alt={`Poster of ${show.title}`}
              style={tvShowImageStyle}
            />
            <h3 style={tvShowTitleStyle}>{show.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedTVShows;
