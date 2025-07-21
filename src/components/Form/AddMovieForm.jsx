import { useDispatch, useSelector } from "react-redux";
import { addMovie, setMovies } from "../../store/moviesSlice.js";
import { useState } from "react";
import ImportButton from "../Button/ImportButton.jsx";

const AddMovieForm = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [format, setFormat] = useState("");
  const [actorsList, setActorsList] = useState("");

  const handlerSubmit = (e) => {
    e.preventDefault();

    const actors = actorsList
      .split(",")
      .map((actor) => actor.trim())
      .filter((actor) => actor.length > 0);

    dispatch(addMovie({ title, year, format, actors })).then(() => dispatch(setMovies()));

    setTitle("");
    setYear("");
    setFormat("");
    setActorsList("");
  };

  return (
    <>
    <form
      onSubmit={handlerSubmit}
      className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto mb-8"
    >
      <h3 className="text-xl font-semibold mb-4 text-center">Add New Movie</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-3 px-3 py-2 border rounded"
        disabled={loading}
      />

      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="w-full mb-3 px-3 py-2 border rounded"
        disabled={loading}
      />

      <select
        name="format"
        value={format}
        onChange={(e) => setFormat(e.target.value)}
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
        placeholder="Stars (e.g. Leonardo DiCaprio, Natalie Portman)"
        value={actorsList}
        onChange={(e) => setActorsList(e.target.value)}
        className="w-full mb-4 mt-4 px-3 py-2 border rounded"
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Adding..." : "Add Movie"}
      </button>

      {error && <p className="mt-2 text-red-600 text-center">{error}</p>}
      <div className={"flex justify-center mt-3"}>
        <ImportButton />
      </div>
    </form>
    </>
  );
};

export default AddMovieForm;
