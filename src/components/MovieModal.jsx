import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMovieById } from "../store/moviesSlice.js";
import EditButton from "./Button/EditButton.jsx";
import DeleteButton from "./Button/DeleteButton.jsx";

const MovieModal = ({ movie, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const currentMovie = useSelector((state) => state.movies.currentMovie);
  const loading = useSelector((state) => state.movies.loading);

  useEffect(() => {
    if (movie) {
      setVisible(true);
      if (!currentMovie || currentMovie.id !== movie.id) {
        dispatch(getMovieById(movie.id));
      }
    } else {
      setVisible(false);
    }
  }, [movie, dispatch, currentMovie]);

  useEffect(() => {
    let timeoutId;
    if (loading) {
      timeoutId = setTimeout(() => {
        console.warn("Loading timeout reached, showing basic movie data");
      }, 5000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loading]);

  if (!movie) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 backdrop-blur-sm backdrop-brightness-75 transition-all duration-300 ${
          visible ? "bg-opacity-30" : "bg-opacity-0"
        }`}
      ></div>

      <div
        className={`relative bg-white p-6 rounded-lg w-full max-w-md shadow-lg transform transition-all duration-300 ${
          visible ? "scale-100" : "scale-95"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
        <div className="space-y-2 mb-4">
          <p>
            <span className="font-semibold">Year:</span> {movie.year}
          </p>
          <p>
            <span className="font-semibold">Format:</span> {movie.format}
          </p>
          <p>
            <span className="font-semibold">Actors:</span>{" "}
            {currentMovie && Array.isArray(currentMovie.actors)
              ? currentMovie.actors.map(actor => typeof actor === 'object' ? actor.name : actor).join(", ")
              : Array.isArray(movie.actors)
                ? movie.actors.map(actor => typeof actor === 'object' ? actor.name : actor).join(", ")
                : "—"}
          </p>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <EditButton 
            movie={currentMovie && currentMovie.id === movie.id ? currentMovie : movie} 
            onClose={onClose} 
            onEditStateChange={setIsEditing} 
          />
          {!isEditing && <DeleteButton movie={movie} onClose={onClose} />}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
