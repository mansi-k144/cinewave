import React, { useContext } from "react";
import { VideoStoreContext } from "../context/VideoStoreProvider";

const CinemaSpotlight = () => {
  const { movies } = useContext(VideoStoreContext); // Access movies from context

  // Styling
  const sectionStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px",
    backgroundColor: "#2C3E50",
    color: "white",
    borderRadius: "10px",
    margin: "20px 0",
  };

  const textContainerStyle = {
    flex: "1",
    marginRight: "20px",
  };

  const headingStyle = {
    fontSize: "24px",
    borderBottom: "2px solid #FFD700",
    paddingBottom: "10px",
    marginBottom: "20px",
  };

  const paragraphStyle = {
    fontSize: "16px",
    lineHeight: "1.5",
  };

  const posterContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    flex: "2",
    flexWrap: "wrap",
    gap: "10px",
  };

  const posterStyle = {
    width: "150px",
    height: "220px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    objectFit: "cover",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  };

  const hoverEffect = {
    transform: "scale(1.05)",
  };

  return (
    <section style={sectionStyle}>
      <div style={textContainerStyle}>
        <h2 style={headingStyle}>Cinema Spotlight</h2>
        <p style={paragraphStyle}>
          Explore trending movies lighting up the big screen for just $5.99! Experience Hollywood's best right from the comfort of your home.
        </p>
      </div>
      <div style={posterContainerStyle}>
        {movies.slice(0, 5).map((movie, index) => (
          <img
            key={index}
            src={movie.poster} // Use movie posters from context
            alt={`Poster of ${movie.title}`}
            style={posterStyle}
            onMouseEnter={(e) => (e.currentTarget.style.transform = hoverEffect.transform)}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        ))}
      </div>
    </section>
  );
};

export default CinemaSpotlight;
