import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VideoStoreContext } from '../context/VideoStoreProvider';
import Layout from '../components/Layout';

const DashboardPage = () => {
  const { user, authLoading, authFetch, logout } = useContext(VideoStoreContext);
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data when user is available
  useEffect(() => {
    if (user) {
      const fetchDashboardData = async () => {
        try {
          const data = await authFetch('/api/auth/dashboard');
          setDashboardData(data);
        } catch (err) {
          setError(err.message || 'Failed to load dashboard data');
        } finally {
          setLoadingStats(false);
        }
      };
      fetchDashboardData();
    }
  }, [user, authFetch]);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { replace: true });
    }
  }, [user, authLoading, navigate]);

  // Loading state
  if (authLoading || !user) {
    return (
      <Layout>
        <div style={styles.loadingContainer}>
          Loading dashboard...
        </div>
      </Layout>
    );
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      // Option 1: If you have a logout endpoint
      await authFetch('/api/auth/logout', { method: 'POST' });
      
      // Option 2: If you don't have a logout endpoint, just clear local storage
      // This will automatically trigger the auth state change via your VideoStoreProvider
      logout();
      
      navigate('/login');
    } catch (err) {
      setError('Logout failed. Please try again.');
      console.error('Logout error:', err);
    }
  };


  // Style objects matching your other pages
  const styles = {
    pageContainer: {
      padding: '20px',
      backgroundColor: '#2C3E50',
      color: 'white',
      minHeight: 'calc(100vh - 120px)',
      borderRadius: '10px',
      margin: '20px'
    },
    loadingContainer: {
      padding: '20px',
      backgroundColor: '#2C3E50',
      color: 'white',
      minHeight: 'calc(100vh - 120px)',
      borderRadius: '10px',
      margin: '20px',
      textAlign: 'center'
    },
    heading: {
      borderBottom: '2px solid #FFD700',
      paddingBottom: '10px',
      marginBottom: '20px'
    },
    card: {
      backgroundColor: '#1C2833',
      padding: '20px',
      borderRadius: '10px',
      marginBottom: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#FFD700',
      color: '#000',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
      marginTop: '10px',
      transition: 'all 0.3s ease'
    },
    logoutButton: {
      padding: '10px 20px',
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
      marginTop: '20px',
      transition: 'all 0.3s ease'
    },
    statsContainer: {
      display: 'flex',
      gap: '20px',
      marginTop: '15px'
    },
    statCard: {
      backgroundColor: '#34495E',
      padding: '15px',
      borderRadius: '5px',
      flex: 1,
      textAlign: 'center'
    },
    error: {
      color: '#e74c3c',
      marginBottom: '20px',
      textAlign: 'center'
    }
  };

  return (
      <div style={styles.pageContainer}>
        <h1 style={styles.heading}>Welcome, {user.firstName}!</h1>
        
        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.card}>
          <h2>Your Profile</h2>
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button 
            style={styles.button}
            onClick={() => navigate('/profile/edit')}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#FFC000'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#FFD700'}
          >
            Edit Profile
          </button>
        </div>

        {loadingStats ? (
          <div style={styles.card}>
            <p>Loading dashboard statistics...</p>
          </div>
        ) : (
          <div style={styles.card}>
            <h2>Your Stats</h2>
            {dashboardData?.stats && (
              <div style={styles.statsContainer}>
                <div style={styles.statCard}>
                  <h3>Favorites</h3>
                  <p>{dashboardData.stats.favorites || 0}</p>
                </div>
                <div style={styles.statCard}>
                  <h3>Watchlist</h3>
                  <p>{dashboardData.stats.watchlist || 0}</p>
                </div>
              </div>
            )}
          </div>
        )}

        <div style={styles.card}>
          <h2>Quick Actions</h2>
          <button 
            style={{ ...styles.button, marginRight: '10px' }}
            onClick={() => navigate('/movies')}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#FFC000'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#FFD700'}
          >
            Browse Movies
          </button>
          <button 
            style={styles.button}
            onClick={() => navigate('/tvshows')}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#FFC000'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#FFD700'}
          >
            Browse TV Shows
          </button>
        </div>

        
      </div>
  );
};

export default DashboardPage;