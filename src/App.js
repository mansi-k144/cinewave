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
              <Route path="/tvShows" element={<TvShowsListing />} />
              <Route path="/tvdetails/:id" element={<TvDetails />} />
              <Route path="/signup" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Layout>
        </Router>
      </VideoStoreProvider>
    </div>
  );
}

export default App;
