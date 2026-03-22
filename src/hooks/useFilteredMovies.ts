import { useState, useMemo } from "react";
import Movie from "../@types/Movie";

const useFilteredMovies = (movies: Movie[] | undefined, storageKey: string) => {
  const [showUnwatchedOnly, setShowUnwatchedOnly] = useState<boolean>(() => {
    return localStorage.getItem(storageKey) === "true";
  });

  const filteredMovies = useMemo(() => {
    if (!movies) return [];
    if (!showUnwatchedOnly) return movies;
    return movies.filter((movie) => !movie.watched);
  }, [movies, showUnwatchedOnly]);

  const toggleFilter = () => {
    setShowUnwatchedOnly((prev) => {
      const next = !prev;
      localStorage.setItem(storageKey, String(next));
      return next;
    });
  };

  return {
    filteredMovies,
    showUnwatchedOnly,
    toggleFilter,
  };
};

export default useFilteredMovies;
