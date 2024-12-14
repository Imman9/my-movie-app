import React, { useEffect, useState, useRef } from "react";
import MovieCard from "../../components/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef(null);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  async function fetchMovies(page) {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
      );
      const data = await res.json();
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setHasMore(data.page < data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }

  const lastMovieElementRef = useRef();

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (lastMovieElementRef.current) {
      observer.current.observe(lastMovieElementRef.current);
    }
  }, [loading, hasMore]);

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6  p-6 mt-16 md:mt-0">
        {movies.map((movieItem, index) => {
          if (index === movies.length - 1) {
            return (
              <div ref={lastMovieElementRef} key={movieItem.id}>
                <MovieCard movieItem={movieItem} />
              </div>
            );
          }
          return <MovieCard key={movieItem.id} movieItem={movieItem} />;
        })}
      </div>
      {loading && <div className="text-center mt-4">Loading...Please wait</div>}
      {!hasMore && (
        <div className="text-center mt-4 text-gray-500">
          No more movies to load.
        </div>
      )}
    </div>
  );
};

export default Home;
