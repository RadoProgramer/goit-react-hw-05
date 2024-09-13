import React, { useEffect, useState } from "react";
import {
  useParams,
  Outlet,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Blocks } from "react-loader-spinner";
import { fetchMovieDetails } from "../../api";
import "./MovieDetails.css";

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setNotFound(true);
      }
    }, 5000);

    fetchMovieDetails(movieId)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
        clearTimeout(timer);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setNotFound(true);
      });

    return () => clearTimeout(timer);
  }, [movieId]);

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from.pathname, {
        state: {
          query: location.state.from.query,
          movies: location.state.from.movies,
        },
      });
    } else {
      navigate("/");
    }
  };

  if (notFound) {
    return (
      <div className="not-found">
        <h1>The movie not found</h1>
        <button onClick={handleGoBack}>Go back</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loader-container">
        <Blocks
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="movie-details">
      <button onClick={handleGoBack}>Go back</button>
      <div className="movie-header">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <div>
          <h1>
            {movie.title} ({movie.release_date.split("-")[0]})
          </h1>
          <p>User Score: {movie.vote_average * 10}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <div className="additional-info">
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link
              to="cast"
              state={{ from: location.state?.from }}
              preventScrollReset>
              Cast
            </Link>
          </li>
          <li>
            <Link
              to="reviews"
              state={{ from: location.state?.from }}
              preventScrollReset>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default MovieDetails;
