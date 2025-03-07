import React from "react";

import HeroSection from "../components/HeroSection";
import FeaturedMovies from "../components/FeaturedMovies";
import FeaturedTVShows from "../components/FeaturedTVShows";
import ActorsSpotlight from "../components/ActorsSpotlight";
import CinemaSpotlight from "../components/CinemaSpotlight";


const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedMovies />
      <FeaturedTVShows />
      <ActorsSpotlight />
      <CinemaSpotlight />
    </div>
  );
};

export default HomePage;
