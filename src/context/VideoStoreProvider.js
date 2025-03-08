import React, { createContext, useEffect, useState } from "react";

export const VideoStoreContext = createContext();

const VideoStoreProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const baseURL = process.env.REACT_APP_BACKEND_URL;

    // Fetch movies
    fetch(`${baseURL}/movies`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        return response.json();
      })
      .then((moviesData) => setMovies(moviesData))
      .catch((error) => console.error("Error fetching movies:", error));

    // Fetch TV shows
    fetch(`${baseURL}/tvShows`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch TV shows");
        }
        return response.json();
      })
      .then((tvShowsData) => setTVShows(tvShowsData))
      .catch((error) => console.error("Error fetching TV shows:", error))
      .finally(() => setLoading(false)); // Set loading to false after both fetches are complete
  }, []);

  return (
    <VideoStoreContext.Provider value={{ movies, tvShows, loading }}>
      {children}
    </VideoStoreContext.Provider>
  );
};

export default VideoStoreProvider;
