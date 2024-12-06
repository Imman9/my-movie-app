import React from "react";

const MovieCard = ({ movieItem }) => {
  const getImageUrl = (posterPath) => {
    return posterPath
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : "/default-image.jpg";
  };
  return (
    <div className="movie-card bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <img
        src={getImageUrl(movieItem.poster_path)}
        alt={movieItem.title}
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {movieItem.title}
        </h2>
      </div>
    </div>
  );
};

export default MovieCard;
