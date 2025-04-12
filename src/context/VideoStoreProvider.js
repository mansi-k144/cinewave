import React, { createContext, useEffect, useState } from "react";

export const VideoStoreContext = createContext();

const VideoStoreProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState(null);

  // Enhanced fetch wrapper with better error handling
  const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
  
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    try {
      // Force use of production backend URL
      const backendUrl = 'https://cinewave-backend.onrender.com';
      const fullUrl = `${backendUrl}${url}`;
  
      console.log('Making request to:', fullUrl);
  
      const response = await fetch(fullUrl, {
        ...options,
        headers
      });
  
      console.log('Response status:', response.status);
  
      if (response.status === 401) {
        localStorage.removeItem('token');
        setUser(null);
        throw new Error('Session expired. Please log in again.');
      }
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('API request failed:', {
        url,
        error: error.message
      });
      setError(error.message);
      throw error;
    }
  };
  
  // Media data transformer
  const transformMedia = (media) => ({
    id: media.id,
    title: media.name,
    poster: media.smallPosterPath,
    genre: media.tag,
    synopsis: media.synopsis,
    rentPrice: media.rentPrice,
    buyPrice: media.purchasePrice,
    releaseYear: media.releaseYear,
    isFeatured: media.isFeatured
  });

  // Auth verification
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setAuthLoading(false);
          return;
        }

        const data = await authFetch('/api/auth/profile');
        setUser(data.user);
      } catch (error) {
        console.log('Auth verification failed:', error.message);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    verifyAuth();
  }, []);

  // Media data fetcher with robust error handling
  useEffect(() => {
    const fetchMedia = async (retryCount = 0) => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching media data...'); // Debug log
        
        const [moviesData, tvShowsData] = await Promise.all([
          authFetch('/api/media/movies').catch(error => {
            console.warn('Movies fetch error:', error);
            return [];
          }),
          authFetch('/api/media/tvshows').catch(error => {
            console.warn('TV shows fetch error:', error);
            return [];
          })
        ]);

        console.log('Fetched data:', { moviesData, tvShowsData }); // Debug log

        // If no data and we haven't retried yet, try once more
        if ((!moviesData || !tvShowsData) && retryCount < 1) {
          return fetchMedia(retryCount + 1);
        }

        setMovies(moviesData?.map(transformMedia) || []);
        setTVShows(tvShowsData?.map(transformMedia) || []);
      } catch (error) {
        console.error('Media fetch failed:', error);
        setError('Failed to load media. ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  // Auth functions
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const data = await authFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      localStorage.setItem('token', data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const searchMedia = async (query) => {
    try {
      setLoading(true);
      setError(null);
      
      const results = await authFetch(`/api/media/search?query=${encodeURIComponent(query)}`);
      
      // Transform results to include type information
      return results.map(item => ({
        ...transformMedia(item),
        type: item.type || (item.isTvShow ? 'tvshow' : 'movie') 
      }));
    } catch (error) {
      console.error('Search error:', error);
      setError(error.message || 'Search failed. Please try again.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <VideoStoreContext.Provider value={{ 
      movies, 
      tvShows, 
      loading,
      user,
      authLoading,
      error,
      login,
      logout,
      setUser,
      authFetch,
      searchMedia 
    }}>
      {children}
    </VideoStoreContext.Provider>
  );
};

export default VideoStoreProvider;