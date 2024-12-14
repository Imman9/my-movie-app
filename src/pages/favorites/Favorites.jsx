import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "../../Store/favoritesSlice";
import { Link } from "react-router-dom";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  function handleRemoveFromFavorites(id) {
    dispatch(removeFromFavorites(id));
  }

  return (
    <div className="favorites-page p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        My Favorite Movies
      </h1>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">No movies in favorites yet</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((movieItem) => (
            <div
              key={movieItem.id}
              className="movie-card border p-4 rounded-lg shadow-md"
            >
              <Link to={`/details/${movieItem.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieItem.poster_path}`}
                  alt={movieItem.title}
                  className="w-full h-72 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold truncate">
                  {movieItem.title}
                </h2>
              </Link>
              <button
                onClick={() => handleRemoveFromFavorites(movieItem.id)}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Remove From Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
