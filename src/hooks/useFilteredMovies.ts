import { useState, useMemo } from "react";
import Movie from "../@types/Movie";

const useFilteredMovies = (movies: Movie[] | undefined) => {
  const [showUnwatchedOnly, setShowUnwatchedOnly] = useState(false);

  const filteredMovies = useMemo(() => {
    if (!movies) return [];
    if (!showUnwatchedOnly) return movies;
    return movies.filter((movie) => !movie.watched);
  }, [movies, showUnwatchedOnly]);

  const toggleFilter = () => setShowUnwatchedOnly((prev) => !prev);

  return {
    filteredMovies,
    showUnwatchedOnly,
    toggleFilter,
  };
};

export default useFilteredMovies;
