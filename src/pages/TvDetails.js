import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { VideoStoreContext } from "../context/VideoStoreProvider";
import { useNavigate } from "react-router-dom";


const TVDetails = () => {
  const { id } = useParams();
  const { tvShows, loading } = useContext(VideoStoreContext);
  const navigate = useNavigate();



  // Show loading message if data is still being fetched
  if (loading) {
    return <div style={{ color: "black", textAlign: "center" }}>Loading...</div>;
  }

  // Safely check if tvShows data is available
  if (!tvShows || tvShows.length === 0) {
    return <div style={{ color: "white", textAlign: "center" }}>Loading...</div>;
  }

  // Find the specific TV show by ID
  const tvShow = tvShows.find((tvShow) => tvShow.id == parseInt(id));

  // Handle case where TV show is not found
  if (!tvShow) {
    return (
      <div style={{ color: "white", textAlign: "center", padding: "20px" }}>
        <h2>TV Show not found.</h2>
        <p>The TV show you are looking for does not exist or may have been removed.</p>
      </div>
    );
  }

  // Filter similar genre TV shows (excluding the current TV show)
  const similarShows = tvShows.filter(
    (show) => show.genre === tvShow.genre && show.id !== tvShow.id
  );

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
      {/* Background with Small Poster and Details */}
      <div style={backgroundStyle}>
        <div style={overlayStyle}>
          <img
            src={tvShow.poster}
            alt={`Small poster of ${tvShow.title}`}
            style={smallPosterStyle}
          />
          <div style={detailsStyle}>
            <h2 style={titleStyle}>{tvShow.title}</h2>
            <p style={synopsisStyle}>{tvShow.synopsis}</p>
            <div style={priceStyle}>
              <div style={priceItemStyle}>Rent: ${tvShow.rentPrice.toFixed(2)}</div>
              <div style={priceItemStyle}>Buy: ${tvShow.buyPrice.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar TV Shows Section */}
      <div style={similarShowsContainerStyle}>
        <h2 style={similarShowsTitleStyle}>Similar TV Shows</h2>
        <div style={gridStyle}>
          {similarShows.map((similarShow) => (
            <div
              key={similarShow.id}
              style={tvCardStyle}
              onClick={() => navigate(`/tvdetails/${similarShow.id}`)} // Navigate to the similar TV show details
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={similarShow.poster}
                alt={`Poster of ${similarShow.title}`}
                style={tvImageStyle}
              />
              <h3 style={tvTitleStyle}>{similarShow.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default TVDetails;