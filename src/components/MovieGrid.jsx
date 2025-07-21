import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies, setLoading } from "../store/moviesSlice";
import MovieModal from "./MovieModal";
import MovieCard from "./MovieCard";
import api from "../utils/api";
import useDebouncedValue from "../hooks/useDebouncedValue";

const MoviesGrid = () => {
  const dispatch = useDispatch();
  const { list: movies, loading } = useSelector((state) => state.movies);

  const [visibleCount, setVisibleCount] = useState(20);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [searchTitle, setSearchTitle] = useState("");
  const [searchActor, setSearchActor] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const debouncedTitle = useDebouncedValue(searchTitle, 500);
  const debouncedActor = useDebouncedValue(searchActor, 500);
  const debouncedSort = useDebouncedValue(sortOrder, 300);

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(setLoading(true));

      try {
        const params = new URLSearchParams();
        if (debouncedTitle.trim()) params.append("title", debouncedTitle.trim());
        if (debouncedActor.trim()) params.append("actor", debouncedActor.trim());
        params.append("sort", "title");
        params.append("order", debouncedSort.toUpperCase());
        params.append("limit", "100");

        const response = await api.get(`/movies?${params.toString()}`);
        dispatch(setMovies(response.data.data));
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchMovies();
  }, [debouncedTitle, debouncedActor, debouncedSort, dispatch]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 25);
  };

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={`skeleton-${i}`}
          className="bg-gray-200 rounded-lg p-4 animate-pulse shadow-md h-32"
        >
          <div className="h-5 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <input
          type="text"
          placeholder="Search by actor"
          value={searchActor}
          onChange={(e) => setSearchActor(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
        </select>
      </div>

      {loading ? (
        renderSkeletons()
      ) : movies.length === 0 ? (
        <p className="text-center text-gray-500">No movies found</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.slice(0, visibleCount).map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={setSelectedMovie}
              />
            ))}
          </div>

          {visibleCount < movies.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700 transition"
              >
                Load more movies
              </button>
            </div>
          )}
        </>
      )}

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
};

export default MoviesGrid;
