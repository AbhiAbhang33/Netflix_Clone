/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import requests from "../requests";

import "./Movie.css";

const Movie = ({ match }) => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const getTrailer = async (movie) => {
      let videoUrlBase = "https://www.youtube.com/embed/";
      setVideoLoading(true);
      setVideoUrl("");

      const res = await axios.get(
        `/movie/${movie.id}/videos?api_key=d7a863e84fa978c1d06301cb7534b7b6&language=en-US`
      );

      if (res.data.results?.length === 0) {
        res.data.results.forEach((result, index) => {
          if (
            result.site === "YouTube" &&
            result.type === ("Trailer" || "Teaser") &&
            result.official === true
          ) {
            setVideoUrl(videoUrlBase + res.data.results[index].key);
          }
        });
      } else {
        setVideoUrl(videoUrlBase + res.data.results[0]?.key || "");
      }
    };
    getTrailer(movie);
    setVideoLoading(false);
  }, [movie]);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      const fetchUrl = `/movie/${match.params.id}?api_key=d7a863e84fa978c1d06301cb7534b7b6&language=en-US`;
      try {
        const res = await axios.get(fetchUrl);
        setMovie(res.data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchMovie();
  }, [match.params.id]);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return (
      <div className="loader">
        Oops! Something went wrong... <Link to="/">Back to Home</Link>{" "}
      </div>
    );
  }

  if (!loading && !error) {
    return (
      <main
        className="movie"
        style={{
          backgroundImage: `url("${requests.fetchPosterImg}${movie?.backdrop_path}")`,
        }}
      >
        <div className="movie__trailer">
          {!videoLoading &&
            ((videoUrl === "" && (
              <div className="trailer-msg">
                Sorry!! Video Not Available ☹☹☹...
              </div>
            )) ||
              (videoUrl !== "" && (
                <iframe
                  title="movie-trailer"
                  className="trailer"
                  width="100%"
                  height="500"
                  frameborder="0"
                  allowFullScreen
                  src={videoUrl}
                ></iframe>
              )))}
        </div>
        <div className="text-content">
          <div className="movie__genres">
            {movie.genres &&
              movie.genres.map((genre) => (
                <span key={genre.id} className="movie__genre">
                  {genre.name}
                </span>
              ))}
          </div>

          <h1 className="movie__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          {movie?.tagline !== "" && (
            <h2 className="movie__tagline">{movie.tagline}</h2>
          )}
          <h3 className="movie__release-date">
            Release Date:
            {movie.status === "Released" ? movie.release_date : "Not Released"}
          </h3>
          <p className="movie__desc">{movie.overview}</p>
          {movie.homepage !== "" && (
            <p className="movie__website">
              Website:{" "}
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                {movie.homepage}
              </a>
            </p>
          )}
        </div>
      </main>
    );
  }
};

export default Movie;
