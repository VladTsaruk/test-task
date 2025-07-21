import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../store/moviesSlice";
import MovieModal from "./MovieModal";

const MoviesGrid = () => {
  const dispatch = useDispatch();
  const { list: movies, loading, error } = useSelector((state) => state.movies);
  const [visibleCount, setVisibleCount] = useState(25);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 25);
  };

  const renderSkeletons = () => {
    return Array.from({ length: 25 }).map((_, i) => (
      <div
        key={i}
        className="bg-gray-200 rounded-lg p-4 animate-pulse shadow-md h-32"
      >
        <div className="h-5 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {renderSkeletons()}
        </div>
      </div>
    );
  }

  if (error)
    return <p className="text-center text-red-600 mt-6">Помилка: {error}</p>;

  return (
    <div className="p-6">
      {movies.length === 0 ? (
        <p className="text-center text-gray-500">Немає фільмів</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.slice(0, visibleCount).map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-lg shadow-md p-4 text-center cursor-pointer hover:shadow-lg transition"
                onClick={() => setSelectedMovie(movie)}
              >
                <p>{movie.id}</p>
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <p className="text-gray-600">{movie.year}</p>
                <p className="text-gray-500">{movie.format}</p>
              </div>
            ))}
          </div>

          {visibleCount < movies.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700 transition"
              >
                Завантажити ще
              </button>
            </div>
          )}

          <MovieModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        </>
      )}
    </div>
  );
};

export default MoviesGrid;
