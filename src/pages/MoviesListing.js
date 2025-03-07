import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { VideoStoreContext } from "../context/VideoStoreProvider";

const MoviesListing = () => {
  const { movies } = useContext(VideoStoreContext); // Access movies from context
  const navigate = useNavigate();

  // Group movies by genre
  const genres = movies.reduce((acc, movie) => {
    acc[movie.genre] = acc[movie.genre] || [];
    acc[movie.genre].push(movie);
    return acc;
  }, {});

  // Styling
  const pageStyle = {
    padding: "20px",
    backgroundColor: "#2C3E50",
    color: "white",
  };

  const genreSectionStyle = {
    marginBottom: "40px",
  };

  const genreTitleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    borderBottom: "2px solid #FFD700",
    paddingBottom: "10px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "10px", // Spacing between cards
  };

  const movieCardStyle = {
    height: "400px", // Ensures all cards are the same height
    width : "300px",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "#1C2833",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const movieCardHoverStyle = {
    transform: "scale(1.05)", // Adds a hover effect
  };

  const movieImageStyle = {
    width: "100%",
    height: "80%", // Ensures image takes up 70% of the card height
    objectFit: "cover", // Ensures the image fits fully and is visible
    backgroundColor: "#000", // Adds a background for images with transparent parts
  };

  const movieTitleStyle = {
    padding: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
  };

  return (
    
    <div style={pageStyle}>
      {Object.keys(genres).map((genre) => (
        <div key={genre} style={genreSectionStyle}>
          <h2 style={genreTitleStyle}>{genre}</h2>
          <div style={gridStyle}>
            {genres[genre].map((movie) => (
              <div
                key={movie.id}
                style={movieCardStyle}
                onClick={() => navigate(`/moviedetails/${movie.id}`)} // Navigate to details page
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <img
                  src={movie.poster}
                  alt={`Poster of ${movie.title}`}
                  style={movieImageStyle}
                />
                <h3 style={movieTitleStyle}>{movie.title}</h3>
              </div>
            ))}
          </div>
        </div>
      ))}
    
    </div>
  );
};

export default MoviesListing;
