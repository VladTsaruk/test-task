import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateMovie } from "../../store/moviesSlice.js";

const EditMovieForm = ({ movie, onClose }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);

  const [formData, setFormData] = useState({
    title: "",
    year: "",
    format: "",
    actors: [],
  });

  const [actorsInput, setActorsInput] = useState("");

  useEffect(() => {
    if (movie) {
      const actorsList = Array.isArray(movie.actors) 
        ? movie.actors.map(actor => typeof actor === 'object' ? actor.name : actor)
        : [];
      
      setFormData({
        title: movie.title || "",
        year: movie.year || "",
        format: movie.format || "",
        actors: actorsList,
      });

      setActorsInput(actorsList.join(", "));
    }
  }, [movie]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedActors = actorsInput
      .split(",")
      .map(actor => actor.trim())
      .filter(actor => actor.length > 0);

    const updatedMovie = {
      id: movie.id,
      ...formData,
      actors: formattedActors
    };

    dispatch(updateMovie(updatedMovie))
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-center">Редагування фільму</h3>

      <div className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          disabled={loading}
        />

        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          disabled={loading}
        />

        <select
          name="format"
          value={formData.format}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          disabled={loading}
        >
          <option value="">Choose a format</option>
          <option value="DVD">DVD</option>
          <option value="VHS">VHS</option>
          <option value="Blu-ray">Blu-ray</option>
        </select>

        <input
          type="text"
          value={actorsInput}
          onChange={(e) => setActorsInput(e.target.value)}
          placeholder="Stars (e.g. Leonardo DiCaprio, Natalie Portman)"
          className="w-full px-3 py-2 border rounded"
          disabled={loading}
        />
      </div>
      <div className="mt-6 flex space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Loading..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>

      {error && (
        <p className="mt-4 text-red-600 text-center">{error}</p>
      )}
    </form>
  );
};

export default EditMovieForm;