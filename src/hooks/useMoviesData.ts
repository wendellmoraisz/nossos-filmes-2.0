import { useQuery } from "@tanstack/react-query";
import { getMoviesByWatcherIdAndListCategory } from "../services/moviesService";

const useMoviesData = (watcherId: string, listCategory: string) => {
    const query = useQuery({
        queryFn: () => getMoviesByWatcherIdAndListCategory(watcherId, listCategory),
        queryKey: ["movies", watcherId, listCategory],
    });

    return query;
}

export default useMoviesData;