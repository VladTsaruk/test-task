const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 text-center cursor-pointer hover:shadow-lg transition"
      onClick={() => onClick(movie)}
    >
      <h3 className="text-lg font-semibold">{movie.title}</h3>
    </div>
  );
};

export default MovieCard;
