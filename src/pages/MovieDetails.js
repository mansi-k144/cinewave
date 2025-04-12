import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VideoStoreContext } from "../context/VideoStoreProvider";

const MovieDetails = () => {
  const { id } = useParams();
  const { movies, loading } = useContext(VideoStoreContext);
  const navigate = useNavigate();

  if (loading) {
    return <div style={{ color: "black", textAlign: "center" }}>Loading...</div>;
  }

  // Safely find the movie and handle undefined cases
  const movie = movies.find((m) => m.id === id); // Use strict equality
  
  if (!movie) {
    return (
      <div style={{ color: "white", textAlign: "center", padding: "20px" }}>
        <h2>Movie not found</h2>
        <button onClick={() => navigate("/movies")} style={{ 
          padding: "10px 20px",
          backgroundColor: "#FFD700",
          color: "#000",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px"
        }}>
          Back to Movies
        </button>
      </div>
    );
  }

  // Safely get similar movies
  const similarMovies = movies.filter(
    (m) => m.id !== movie.id && m.genre === movie.genre
  ).slice(0, 4); // Limit to 4 similar movies

  // Styling for the page
  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    color: "white",
    backgroundColor: "#2C3E50",
    padding: "20px",
    borderRadius: "10px",
  };

  const backgroundStyle = {
    position: "relative",
    width: "100%",
    height: "500px",
    backgroundImage: `url(${movie.poster})`, // Use large poster as background
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "20px",
    boxSizing: "border-box",
    color: "white",
  };

  const overlayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay for contrast
    borderRadius: "10px",
    padding: "20px",
    display: "flex",
    alignItems: "flex-start",
    gap: "20px",
    width: "100%",
    maxWidth: "80%",
  };

  const smallPosterStyle = {
    width: "150px",
    height: "225px",
    objectFit: "cover",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
  };

  const detailsStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "space-between",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#FFD700",
  };

  const synopsisStyle = {
    fontSize: "16px",
    lineHeight: "1.5",
  };

  const priceStyle = {
    display: "flex",
    gap: "20px",
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "15px",
  };

  const priceItemStyle = {
    padding: "10px 20px",
    backgroundColor: "#FFD700",
    color: "black",
    borderRadius: "5px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
  };

  const similarMoviesContainerStyle = {
    marginTop: "30px",
  };

  const similarMoviesTitleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
    borderBottom: "2px solid #FFD700",
    paddingBottom: "10px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
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
    transform: "scale(1.05)",
  };

  const movieImageStyle = {
    width: "100%",
    height: "80%", // Ensures image takes up 70% of the card height
    objectFit: "cover", // Ensures the image fits fully and is visible
    backgroundColor: "#000",
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
    {/* Background with Small Poster and Details */}
    <div style={backgroundStyle}>
      <div style={overlayStyle}>
        <img
          src={movie.poster}
          alt={`Poster of ${movie.title}`}
          style={smallPosterStyle}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "/placeholder-poster.jpg"; // Fallback image
          }}
        />
        <div style={detailsStyle}>
          <h2 style={titleStyle}>{movie.title}</h2>
          <p style={synopsisStyle}>{movie.synopsis || "No synopsis available"}</p>
          <div style={priceStyle}>
            <div style={priceItemStyle}>
              Rent: ${movie.rentPrice?.toFixed(2) || "N/A"}
            </div>
            <div style={priceItemStyle}>
              Buy: ${movie.buyPrice?.toFixed(2) || "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Similar Movies Section */}
    {similarMovies.length > 0 && (
      <div style={similarMoviesContainerStyle}>
        <h2 style={similarMoviesTitleStyle}>Similar Movies</h2>
        <div style={gridStyle}>
          {similarMovies.map((similarMovie) => (
            <div
              key={similarMovie.id}
              style={movieCardStyle}
              onClick={() => navigate(`/moviedetails/${similarMovie.id}`)}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={similarMovie.poster}
                alt={`Poster of ${similarMovie.title}`}
                style={movieImageStyle}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "/placeholder-poster.jpg";
                }}
              />
              <h3 style={movieTitleStyle}>
                {similarMovie.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
};

export default MovieDetails;
