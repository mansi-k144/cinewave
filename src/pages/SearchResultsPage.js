import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { VideoStoreContext } from '../context/VideoStoreProvider';

const SearchResultsPage = () => {
  const { authFetch } = useContext(VideoStoreContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');

    if (query) {
      const fetchResults = async () => {
        try {
          const data = await authFetch(`/api/media/search?query=${query}`);
          setResults(data);
        } catch (err) {
          setError(err.message || 'Failed to load search results');
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    } else {
      setLoading(false);
      navigate('/');
    }
  }, [location.search, authFetch, navigate]);

  // Style objects matching your existing pages
  const pageStyle = {
    padding: '20px',
    backgroundColor: '#2C3E50',
    color: 'white',
    minHeight: 'calc(100vh - 120px)',
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    borderBottom: '2px solid #FFD700',
    paddingBottom: '10px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
  };

  const cardStyle = {
    height: '400px',
    width: '300px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: '#1C2833',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const imageStyle = {
    width: '100%',
    height: '80%',
    objectFit: 'cover',
    backgroundColor: '#000',
  };

  const titleStyle = {
    padding: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
  };

  const errorStyle = {
    color: '#e74c3c',
    marginBottom: '20px',
    textAlign: 'center',
  };

  if (loading) {
    return (
      <div style={pageStyle}>
        <h2 style={headingStyle}>Searching...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={pageStyle}>
        <div style={errorStyle}>{error}</div>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#FFD700',
            color: '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '0 auto',
            display: 'block'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <h2 style={headingStyle}>
        Search Results for "{new URLSearchParams(location.search).get('query')}"
      </h2>
      
      {results.length === 0 ? (
        <p>No results found for your search.</p>
      ) : (
        <div style={gridStyle}>
          {results.map((item) => (
            <div
              key={item.id}
              style={cardStyle}
              onClick={() => navigate(`/${item.type === 'movie' ? 'moviedetails' : 'tvdetails'}/${item.id}`)}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <img
                src={item.poster}
                alt={`Poster of ${item.title}`}
                style={imageStyle}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder-poster.jpg';
                }}
              />
              <h3 style={titleStyle}>{item.title}</h3>
              <p style={{ color: '#fff', fontSize: '14px', marginBottom: '10px' }}>
                {item.type === 'movie' ? 'Movie' : 'TV Show'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;