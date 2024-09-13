import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate, NavLink, useLocation } from "react-router-dom";
import { Blocks } from "react-loader-spinner";
import "./App.css";

const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Movies = lazy(() => import("./pages/Movies/Movies.jsx"));
const MovieDetails = lazy(() => import("./pages/MovieDetails/MovieDetails.jsx"));
const Cast = lazy(() => import("./components/Cast/Cast.jsx"));
const Reviews = lazy(() => import("./components/Reviews/Reviews.jsx"));
const NotFound = lazy(() => import("./components/NotFound/NotFound.jsx"));

function App() {
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes("cast") && !location.pathname.includes("reviews")) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div>
      <nav>
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/movies" className={({ isActive }) => (isActive ? "active" : "")}>
          Movies
        </NavLink>
      </nav>
      <Suspense
        fallback={
          <div className="loader-container">
            <Blocks height="80" width="80" color="#4fa94d" ariaLabel="blocks-loading" visible={true} />
          </div>
        }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
