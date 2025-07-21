import {useDispatch} from "react-redux";
import { deleteMovie } from "../../store/moviesSlice.js";

const DeleteButton = ({ movie, onClose }) => {
  const  dispatch = useDispatch();

  const handlerDelete = () => {
    dispatch(deleteMovie(movie.id));
    if (onClose) {
      onClose();
    }
  }

  return (
    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition" onClick={handlerDelete}>Delete</button>
  );
}

export default DeleteButton;