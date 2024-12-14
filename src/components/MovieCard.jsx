import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../Store/favoritesSlice";
import { Link } from "react-router-dom";

const MovieCard = ({ movieItem }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const isFavorite = favorites.some((fav) => fav.id === movieItem.id);
  const getImageUrl = (posterPath) => {
    return posterPath
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : "/default-image.jpg";
  };

  function handleAddToFavorites() {
    dispatch(addToFavorites(movieItem));
  }
  function handleRemoveFromFavorites(id) {
    dispatch(removeFromFavorites(id));
  }
  return (
    <div className="movie-card bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <div>
        <Link to={`/details/${movieItem.id}`}>
          {" "}
          <img
            src={getImageUrl(movieItem.poster_path)}
            alt={movieItem.title}
            className="w-full h-80 object-cover"
          />
        </Link>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {movieItem.title}
        </h2>
        {isFavorite ? (
          <button
            onClick={() => handleRemoveFromFavorites(movieItem.id)}
            className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition"
          >
            Remove From favorites
          </button>
        ) : (
          <button
            onClick={handleAddToFavorites}
            className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition"
          >
            Add to favorites
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
