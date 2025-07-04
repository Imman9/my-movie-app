import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../Store/favoritesSlice";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null); // Changed from trailerUrl to trailerKey
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false); // New state to control trailer visibility

  const isFavorite = favorites.some((fav) => fav.id === parseInt(id));

  useEffect(() => {
    fetchMovieDetails();
    fetchTrailer();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
      );
      const data = await res.json();
      setMovieDetails(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setLoading(false);
    }
  };

  const fetchTrailer = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
      );
      const data = await res.json();
      const trailer = data.results.find((video) => video.type === "Trailer");
      setTrailerKey(trailer?.key || null); // Store just the YouTube key
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const toggleTrailer = () => {
    setShowTrailer(!showTrailer);
  };

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(movieDetails));
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(movieDetails.id));
  };

  if (loading) {
    return (
      <div className="text-center text-gray-600">Loading movie details...</div>
    );
  }

  if (!movieDetails) {
    return (
      <div className="text-center text-red-500">Movie details not found.</div>
    );
  }

  return (
    <div className="details-page p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
      >
        Go Back
      </button>
      <div className="flex flex-col lg:flex-row lg:gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="w-full lg:w-1/3 rounded-lg shadow-md"
        />
        <div className="mt-4 lg:mt-0 lg:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{movieDetails.title}</h1>
          <p className="text-gray-700 mb-4">{movieDetails.overview}</p>
          <p className="text-gray-500 mb-4">
            <strong>Release Date:</strong> {movieDetails.release_date}
          </p>
          <p className="text-gray-500 mb-4">
            <strong>Rating:</strong> {movieDetails.vote_average}/10
          </p>

          {trailerKey ? (
            <div>
              <button
                onClick={toggleTrailer}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                {showTrailer ? 'Hide Trailer' : 'Show Trailer'}
              </button>
              
              {showTrailer && (
                <div className="mt-4 aspect-video w-full max-w-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg shadow-md"
                  ></iframe>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">No trailer available</p>
          )}

          {isFavorite ? (
            <button
              onClick={handleRemoveFromFavorites}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
            >
              Remove from Favorites
            </button>
          ) : (
            <button
              onClick={handleAddToFavorites}
              className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition"
            >
              Add to Favorites
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;