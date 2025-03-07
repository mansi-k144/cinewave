import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { VideoStoreContext } from "../context/VideoStoreProvider";


const TvShowsListing = () => {
  const { tvShows } = useContext(VideoStoreContext); // Access TV shows from context
  const navigate = useNavigate();

  // Group TV shows by genre
  const genres = tvShows.reduce((acc, tvShow) => {
    acc[tvShow.genre] = acc[tvShow.genre] || [];
    acc[tvShow.genre].push(tvShow);
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

  const tvShowCardStyle = {
    height: "400px", // Ensures all cards are the same height
    width: "300px",
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

  const tvShowImageStyle = {
    width: "100%",
    height: "80%", // Ensures image takes up 80% of the card height
    objectFit: "cover", // Ensures the image fits fully and is visible
    backgroundColor: "#000", // Adds a background for images with transparent parts
  };

  const tvShowTitleStyle = {
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
            {genres[genre].map((tvShow) => (
              <div
                key={tvShow.id}
                style={tvShowCardStyle}
                onClick={() => navigate(`/tvdetails/${tvShow.id}`)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")} // Hover effect
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <img
                  src={tvShow.poster}
                  alt={`Poster of ${tvShow.title}`}
                  style={tvShowImageStyle}
                />
                <h3 style={tvShowTitleStyle}>{tvShow.title}</h3>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
   
  );
};

export default TvShowsListing;
