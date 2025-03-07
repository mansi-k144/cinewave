import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VideoStoreContext } from "../context/VideoStoreProvider";



const HeroSection = () => {
  const { movies, tvShows } = useContext(VideoStoreContext); // Access data from context
  const navigate = useNavigate();

  const handleMovieClick = (id) => {
    navigate(`/moviedetails/${id}`); // Navigate to the details page of the clicked movie
  }
  const handleShowClick = (id) => {
    navigate(`/tvdetails/${id}`); // Navigate to the details page of the clicked TV show
  };
  // Combine and filter for movies/TV shows of 2021
  const slides = [
    ...movies.filter((movie) => movie.releaseYear === 2021),
    ...tvShows.filter((tvShow) => tvShow.releaseYear === 2021),
  ].slice(0, 8); // Limit to 8 slides

  const [currentIndex, setCurrentIndex] = useState(0); // Current slide index

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [slides.length]);

  // Handler for manual navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Styles
  const heroStyle = {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "550px",
    backgroundColor: "#2C3E50",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  
  const slideContainerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
  };
  
  const slideStyle = {
    opacity: 0,
    transition: "opacity 1s ease-in-out",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "20px",
    boxSizing: "border-box",
    color: "white",
    zIndex: 1,
  };
  
  const activeSlideStyle = {
    ...slideStyle,
    opacity: 1,
  };
  
  const imageStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
    filter: "brightness(50%)", // Darkens the image for better text contrast
  };
  
  const textContainerStyle = {
    maxWidth: "50%",
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    borderRadius: "10px",
  };
  
  const titleStyle = {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#FFD700", // Standout color for the title
  };
  
  const synopsisStyle = {
    fontSize: "16px",
    marginBottom: "20px",
  };
  
  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#FFD700",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
  };
  
  const dotsContainerStyle = {
    position: "absolute",
    bottom: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    zIndex: 1,
  };
  
  const dotStyle = {
    width: "12px",
    height: "12px",
    margin: "0 5px",
    borderRadius: "50%",
    backgroundColor: "white",
    opacity: 0.5,
    cursor: "pointer",
    transition: "opacity 0.3s ease, transform 0.3s ease",
  };
  
  const activeDotStyle = {
    ...dotStyle,
    opacity: 1,
    backgroundColor: "#FFD700",
    transform: "scale(1.2)",
  };
  
  return (
    <div style={heroStyle}>
      <div style={slideContainerStyle}>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={index === currentIndex ? activeSlideStyle : slideStyle}
          >
            <img src={slide.poster} alt={slide.title} style={imageStyle} loading="lazy" />
            <div style={textContainerStyle}>
              <h2 style={titleStyle}>{slide.title}</h2>
              <p style={synopsisStyle}>{slide.synopsis}</p>
              <button style={buttonStyle} 
                   >More Info</button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div style={dotsContainerStyle}>
        {slides.map((_, index) => (
          <div
            key={index}
            style={index === currentIndex ? activeDotStyle : dotStyle}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
