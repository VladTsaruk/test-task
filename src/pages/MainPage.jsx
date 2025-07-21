import { useDispatch } from "react-redux";
import { logoutUser } from "../store/userSlice.js";
import { useNavigate } from "react-router-dom";

import ImportButton from "../components/Button/ImportButton.jsx";
import AddMovieForm from "../components/Form/AddMovieForm.jsx";
import MoviesGrid from "../components/MovieGrid.jsx";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 relative px-4 py-6">
      <div className="absolute top-4 right-4">
        <button
          onClick={handlerLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <AddMovieForm />
      <ImportButton />
      <MoviesGrid />
    </div>
  );
};

export default Main;
