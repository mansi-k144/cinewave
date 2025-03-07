import React from "react";

const ActorsSpotlight = () => {
  // Actor images (update paths if needed)
  const actors = [
    "/assets/spotlight/actor1.jpg",
    "/assets/spotlight/actor2.jpg",
    "/assets/spotlight/actor3.jpg",
    "/assets/spotlight/actor4.jpg",
    "/assets/spotlight/actor5.jpg",
  ];

  // Styling (consistent and visually appealing)
  const sectionStyle = {
    padding: "20px",
    backgroundColor: "#2C3E50",
    color: "white",
    borderRadius: "10px",
    margin: "15px 0",
    height: "450px",
    position: "relative",
  };

  const headingStyle = {
    borderBottom: "2px solid #FFD700",
    paddingBottom: "10px",
    marginBottom: "20px",
    fontSize: "24px",
  };

  const descriptionStyle = {
    fontSize: "16px",
    lineHeight: "1.5",
    marginBottom: "20px",
  };

  const actorContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
  };

  const actorImageStyle = {
    width: "18%", // Adjust size to fit 5 images in a row
    height: "340px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  };

  const hoverEffect = {
    transform: "scale(1.05)",
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>Actor's Spotlight</h2>
      <p style={descriptionStyle}>
        Discover the lives and achievements of your favorite actors, from the classics to today's stars!
      </p>
      <div style={actorContainerStyle}>
        {actors.map((actor, index) => (
          <img
            key={index}
            src={actor}
            alt={`Actor ${index + 1}`}
            style={actorImageStyle}
            onMouseEnter={(e) => (e.currentTarget.style.transform = hoverEffect.transform)}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        ))}
      </div>
    </section>
  );
};

export default ActorsSpotlight;
