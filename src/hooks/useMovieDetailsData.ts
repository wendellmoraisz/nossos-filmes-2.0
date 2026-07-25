import { useQuery } from "@tanstack/react-query";
import {
  getMovieDetails,
  getMovieStreamingProviders,
} from "../services/moviesService";
import Movie from "../@types/Movie";

const useMovieDetailsData = (movieId: number) => {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: async (): Promise<Movie> => {
      const [details, providers] = await Promise.all([
        getMovieDetails(movieId),
        getMovieStreamingProviders(movieId),
      ]);

      return {
        ...details,
        watch_providers: providers.results?.BR?.flatrate ?? [],
      };
    },
    enabled: !!movieId,
  });
};

export default useMovieDetailsData;
