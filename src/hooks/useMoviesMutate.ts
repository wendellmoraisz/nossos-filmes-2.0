import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addMovieToWatchList } from "../services/moviesService"
import Movie from "../@types/Movie"

const useMoviesMutate = (movie: Movie) => {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: addMovieToWatchList,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["movies", movie.watcher, movie.listCategory]
            });
        }
    });

    return mutate;
}

export default useMoviesMutate;