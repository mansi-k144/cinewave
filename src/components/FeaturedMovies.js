import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { VideoStoreContext } from "../context/VideoStoreProvider";

const FeaturedMovies = () => {
  const { movies } = useContext(VideoStoreContext); // Access movies from context
  const navigate = useNavigate(); // Initialize navigation function

  // Function to handle navigation to the details page
  const handleMovieClick = (id) => {
    navigate(`/moviedetails/${id}`); // Navigate to the details page of the clicked movie
  };

  // Function to navigate to the Movies & TV Shows Listing Page
  const handleViewMoreClick = () => {
    navigate("/movies"); // Navigate to the listing page
  };

  // Styling (consistent with the Hero Section)
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

  const movieContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  };

  const movieCardStyle = {
    width: "200px",
    margin: "10px",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  };

  const movieCardHoverStyle = { 
    transform: "scale(1.05)", // Adds a hover effect
     };

  const movieImageStyle = {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
  };

  const movieTitleStyle = {
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

      <h2 style={headingStyle}>Featured Movies</h2>
      <div style={movieContainerStyle}>
        {movies.slice(0, 6).map((movie) => (
          <div
            key={movie.id}
            style={movieCardStyle}
            onClick={() => handleMovieClick(movie.id)} // Trigger navigation

            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")} // Hover effect 
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
            <img
              src={movie.poster}
              alt={`Poster of ${movie.title}`}
              style={movieImageStyle}
            />
            <h3 style={movieTitleStyle}>{movie.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedMovies;
