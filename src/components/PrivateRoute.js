import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { VideoStoreContext } from '../context/VideoStoreProvider';

const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useContext(VideoStoreContext);

  if (authLoading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;