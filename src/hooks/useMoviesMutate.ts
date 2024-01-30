import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addMovieToWatchList, deleteMovie, updateMovie } from "../services/moviesService"
import Movie from "../@types/Movie"

const useMoviesMutate = (movie: Movie) => {
    const queryClient = useQueryClient();

    const addMovie = useMutation({
        mutationFn: addMovieToWatchList,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["movies", movie.watcher, movie.listCategory]
            });
        }
    });

    const updateMovieData = useMutation({
        mutationFn: updateMovie,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["movies", movie.watcher, movie.listCategory]
            });
        }
    });

    const deleteMovieData = useMutation({
        mutationFn: deleteMovie,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["movies", movie.watcher, movie.listCategory]
            });
        }
    });

    return { addMovie, updateMovieData, deleteMovieData };
}

export default useMoviesMutate;