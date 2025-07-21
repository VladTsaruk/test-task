import { useDispatch } from "react-redux";
import { importMovies } from "../../store/moviesSlice.js";

const ImportButton = () => {
  const dispatch = useDispatch();

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(importMovies(file));
    }
  };

  return (
    <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
      Import Movies
      <input
        type="file"
        accept=".txt"
        className="hidden"
        onChange={handleImport}
      />
    </label>
  );
};

export default ImportButton;
