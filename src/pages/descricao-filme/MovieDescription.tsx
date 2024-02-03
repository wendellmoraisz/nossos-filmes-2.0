import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../../services/moviesService";
import Movie from "../../@types/Movie";
import { MOVIE_POSTER_BASE_URL } from "../../data/constants/theMoviesDb";

const MovieDescription = () => {
    
    const { movieId } = useParams<{ movieId: string }>();
    const [movieDetails, setMovieDetails] = useState<Movie | null>(null);

    useEffect(() => {
        const getMovie = async () => {
            const response = await getMovieDetails(Number(movieId));
            setMovieDetails(response);
        };
        getMovie();
    }, [movieId]);

    return (
        <div>
            <img src={`${MOVIE_POSTER_BASE_URL}${movieDetails?.backdrop_path}`} alt={movieDetails?.title} />
        </div>
    );
};

export default MovieDescription;