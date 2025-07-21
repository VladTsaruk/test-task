import { useDispatch } from "react-redux";
import { importMovies } from "../../store/moviesSlice.js";

const ImportButton = () => {
  const dispatch = useDispatch();

  const handleImport = (e) => {
    const movies = e.target.files[0];
    console.log(movies);
    if (movies) {
      dispatch(importMovies(movies));
    }
  };

  return (
    <label className="cursor-pointer flex items-center bg-white text-black px-4 py-2 border border-blue-600 rounded-lg hover:bg-gray-200 transition">
      Import Movies
      <img src="/upload.png" className="w-6 h-6 ml-2" alt="upload" />
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
