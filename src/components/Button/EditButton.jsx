import { useState } from 'react';
import EditMovieForm from '../Form/EditMovieForm';

const EditButton = ({ movie, onClose, onEditStateChange }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    if (onEditStateChange) {
      onEditStateChange(true);
    }
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    if (onEditStateChange) {
      onEditStateChange(false);
    }
    if (onClose) {
      onClose();
    }
  };

  if (isEditing) {
    return <EditMovieForm movie={movie} onClose={handleCloseEdit} />;
  }

  return (
    <button 
      onClick={handleEditClick} 
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
    >
      Edit
    </button>
  );
};

export default EditButton;