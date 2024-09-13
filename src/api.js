import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjE3ZGMzNjdkMTcyMWY2MTM1Y2U0M2UxZTQxNThjZSIsIm5iZiI6MTcyNTk2NjYwMi43NjA1NzUsInN1YiI6IjY2Y2RlY2QzYWE2ZjAxOGM5YTdlZWQ1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lCeqyYGH17XdUCyZEVU6sk3sSaecEsY15TregtDKqtU";

const headers = {
  accept: "application/json",
  Authorization: API_TOKEN,
};

export const fetchTrendingMovies = () => {
  return axios.get(`${BASE_URL}/trending/all/day`, {
    headers,
    params: {
      language: "en-US",
    },
  });
};

export const searchMovies = (query) => {
  return axios.get(`${BASE_URL}/search/movie`, {
    headers,
    params: {
      include_adult: "false",
      language: "en-US",
      page: "1",
      query,
    },
  });
};

export const fetchMovieDetails = (movieId) => {
  return axios.get(`${BASE_URL}/movie/${movieId}`, {
    headers,
    params: {
      language: "en-US",
    },
  });
};

export const fetchMovieCast = (movieId) => {
  return axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
    headers,
    params: {
      language: "en-US",
    },
  });
};

export const fetchMovieReviews = (movieId) => {
  return axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
    headers,
    params: {
      language: "en-US",
      page: "1",
    },
  });
};
