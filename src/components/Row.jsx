/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";

import "./Row.css";

const basePosterUrl = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(fetchUrl);
      setMovies(res.data.results);
    };
    fetchMovies();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h3> {title} </h3>
      <div className="row__posters">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <img
              className={`row__poster ${isLargeRow && "row__poster-large"}`}
              src={`${basePosterUrl}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Row;
