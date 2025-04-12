import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VideoStoreContext } from "../context/VideoStoreProvider";

const TVDetails = () => {
  const { id } = useParams();
  const { tvShows, loading } = useContext(VideoStoreContext);
  const navigate = useNavigate();

  if (loading) {
    return <div style={{ 
      color: "white", 
      textAlign: "center", 
      padding: "40px",
      backgroundColor: "#2C3E50"
    }}>Loading TV show details...</div>;
  }

  // Safely find the TV show
  const tvShow = tvShows?.find((show) => show.id === id); // Use strict equality

  if (!tvShow) {
    return (
      <div style={{ 
        color: "white", 
        textAlign: "center", 
        padding: "40px",
        backgroundColor: "#2C3E50"
      }}>
        <h2>TV Show not found</h2>
        <p>We couldn't find the show you're looking for.</p>
        <button 
          onClick={() => navigate("/tvshows")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#FFD700",
            color: "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          Browse TV Shows
        </button>
      </div>
    );
  }

  // Get similar shows with safety checks
  const similarShows = tvShows?.filter(
    (show) => show.id !== id && show.genre === tvShow.genre
  ).slice(0, 4) || []; // Limit to 4 shows


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
    backgroundImage: `url(${tvShow.poster})`, // Use large poster as background
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

  const similarShowsContainerStyle = {
    marginTop: "30px",
  };

  const similarShowsTitleStyle = {
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

  const tvCardStyle = {
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

  const tvImageStyle = {
    width: "100%",
    height: "80%", // Ensures the image fits fully and is visible
    objectFit: "cover",
    backgroundColor: "#000",
  };

  const tvTitleStyle = {
    padding: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
  };

  return (
    <div style={pageStyle}>
      {/* Main TV Show Details */}
      <div style={backgroundStyle}>
        <div style={overlayStyle}>
          <img
            src={tvShow.poster}
            alt={`Poster for ${tvShow.title}`}
            style={smallPosterStyle}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-poster.jpg"; // Fallback image
            }}
          />
          <div style={detailsStyle}>
            <h2 style={titleStyle}>{tvShow.title || "Untitled TV Show"}</h2>
            <p style={synopsisStyle}>
              {tvShow.synopsis || "No synopsis available."}
            </p>
            <div style={priceStyle}>
              <div style={priceItemStyle}>
                Rent: ${tvShow.rentPrice?.toFixed(2) || "N/A"}
              </div>
              <div style={priceItemStyle}>
                Buy: ${tvShow.buyPrice?.toFixed(2) || "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Shows Section - Only show if there are similar shows */}
      {similarShows.length > 0 && (
        <div style={similarShowsContainerStyle}>
          <h2 style={similarShowsTitleStyle}>Similar TV Shows</h2>
          <div style={gridStyle}>
            {similarShows.map((show) => (
              <div
                key={show.id}
                style={tvCardStyle}
                onClick={() => navigate(`/tvdetails/${show.id}`)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <img
                  src={show.poster}
                  alt={`Poster for ${show.title}`}
                  style={tvImageStyle}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-poster.jpg";
                  }}
                />
                <h3 style={tvTitleStyle}>
                  {show.title || "Untitled Show"}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TVDetails;