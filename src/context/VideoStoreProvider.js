import React, { createContext, useEffect, useState } from "react";

export const VideoStoreContext = createContext();

const VideoStoreProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movies
        const moviesResponse = await fetch("https://cinewave-api.onrender.com/movies");
        if (!moviesResponse.ok) {
          throw new Error("Failed to fetch movies");
        }
        const moviesData = await moviesResponse.json();
        setMovies(moviesData);

        // Fetch TV shows
        const tvShowsResponse = await fetch("https://cinewave-api.onrender.com/tvShows");
        if (!tvShowsResponse.ok) {
          throw new Error("Failed to fetch TV shows");
        }
        const tvShowsData = await tvShowsResponse.json();
        setTVShows(tvShowsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched (or if an error occurs)
      }
    };

    fetchData(); // Call the fetchData function
  }, []);

  return (
    <VideoStoreContext.Provider value={{ movies, tvShows, loading }}>
      {children}
    </VideoStoreContext.Provider>
  );
};

export default VideoStoreProvider;