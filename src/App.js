import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import MoviesListing from "./pages/MoviesListing";
import TvShowsListing from "./pages/TvShowsListing";
import VideoStoreProvider from "./context/VideoStoreProvider";
import TvDetails from "./pages/TvDetails";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/Dashboard"; // Add this import
import PrivateRoute from "./components/PrivateRoute"; // Create this component
import SearchResultsPage from './pages/SearchResultsPage';

function App() {
  return (
    <div>
      <VideoStoreProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesListing />} />
              <Route path="/moviedetails/:id" element={<MovieDetails />} />
              <Route path="/tvshows" element={<TvShowsListing />} />
              <Route path="/tvdetails/:id" element={<TvDetails />} />
              <Route path="/signup" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              } />
            </Routes>
          </Layout>
        </Router>
      </VideoStoreProvider>
    </div>
  );
}

export default App;