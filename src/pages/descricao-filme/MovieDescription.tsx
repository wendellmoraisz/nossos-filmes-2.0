import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieStreamingProviders } from "../../services/moviesService";
import Movie from "../../@types/Movie";
import { MOVIE_POSTER_BASE_URL } from "../../data/constants/theMoviesDb";
import { Accordion, AccordionDetails, AccordionSummary, Divider } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaidIcon from "@mui/icons-material/Paid";
import SavingsIcon from "@mui/icons-material/Savings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getYearFromReleaseDate } from "../../utils/getYearFromReleaseDate";
import { convertMinutesToHours } from "../../utils/convertMinutesToHours";
import { abbreviateNumber } from "../../utils/abbreviateNumber";
import Loading from "../../components/Loading";
import { Container, MovieBanner, MovieInfosContainer, MovieHeaderContainer, MoviePoster, MovieHeadInfo, MovieTitle, MovieTagline, MovieAdittionalInfoContainer, MovieAdittionalInfoItem, CategoryTitle, MovieGenresContainer, WatchProvidersContainer, WatchProviderLogo } from "./MovieDescriptionStyled";
import utorrentLogo from "../../assets/utorrent-logo.png";

const MovieDescription = () => {

    const { movieId } = useParams<{ movieId: string }>();
    const [movieDetails, setMovieDetails] = useState<Movie | null>(null);

    useEffect(() => {
        const getMovie = async () => {
            const response = await getMovieDetails(Number(movieId));
            const streamingProvidersData = await getMovieStreamingProviders(Number(movieId));
            response.watch_providers = streamingProvidersData.results?.BR?.flatrate ?? [];
            setMovieDetails(response);
        };
        getMovie();
    }, [movieId]);

    if (!movieDetails) return <Loading />;

    return (
        <Container>
            <MovieBanner src={`${MOVIE_POSTER_BASE_URL}${movieDetails?.backdrop_path}`} alt={movieDetails?.title} />
            <MovieInfosContainer>
                <MovieHeaderContainer>
                    <MoviePoster src={`${MOVIE_POSTER_BASE_URL}${movieDetails?.poster_path}`} alt={movieDetails?.title} />
                    <MovieHeadInfo>
                        <MovieTitle>{movieDetails?.title}</MovieTitle>
                        <MovieTagline>{movieDetails?.tagline}</MovieTagline>
                    </MovieHeadInfo>
                </MovieHeaderContainer>
                <MovieAdittionalInfoContainer>
                    <MovieAdittionalInfoItem>
                        <CalendarTodayIcon />
                        {getYearFromReleaseDate(movieDetails?.release_date as string)}
                    </MovieAdittionalInfoItem>
                    <Divider orientation="vertical" variant="fullWidth" flexItem />
                    <MovieAdittionalInfoItem>
                        <AccessTimeIcon />
                        {convertMinutesToHours(movieDetails?.runtime as number)}
                    </MovieAdittionalInfoItem>
                    {
                        (movieDetails?.budget ?? 0) > 0 &&
                        <MovieAdittionalInfoItem>
                            <Divider orientation="vertical" variant="fullWidth" flexItem />
                            <PaidIcon />
                            {abbreviateNumber(movieDetails?.budget as number)}
                        </MovieAdittionalInfoItem>
                    }
                    {
                        (movieDetails?.revenue ?? 0) > 0 &&
                        <MovieAdittionalInfoItem>
                            <Divider orientation="vertical" variant="fullWidth" flexItem />
                            <SavingsIcon />
                            {abbreviateNumber(movieDetails?.revenue as number)}
                        </MovieAdittionalInfoItem>
                    }
                </MovieAdittionalInfoContainer>
                {
                    movieDetails?.genres &&
                    <>
                        <CategoryTitle>Gêneros</CategoryTitle>
                        <MovieGenresContainer>
                            {movieDetails?.genres.map((genre, index) => (
                                <>
                                    {genre.name}
                                    {
                                        index !== ((movieDetails?.genres?.length ?? 0) - 1) &&
                                        <Divider orientation="vertical" variant="fullWidth" flexItem />
                                    }
                                </>
                            ))}
                        </MovieGenresContainer>
                    </>
                }
                <CategoryTitle>Onde assistir</CategoryTitle>
                {
                    (movieDetails?.watch_providers?.length ?? 0) > 0 ?
                        <MovieGenresContainer>
                            {movieDetails?.watch_providers?.map(provider => (
                                <WatchProvidersContainer>
                                    <a target="_blank" href={`https://themoviedb.org/movie/${movieId}/watch`}>
                                        <WatchProviderLogo src={`${MOVIE_POSTER_BASE_URL}${provider.logo_path}`} alt={provider.provider_name} />
                                    </a>
                                </WatchProvidersContainer>
                            ))}
                        </MovieGenresContainer>
                        :
                        <WatchProvidersContainer>
                            <a target="_blank" href={`https://www.google.com/search?q=${movieDetails.title}+download+torrent`}>
                                <WatchProviderLogo src={utorrentLogo} alt="Utorrent logo"></WatchProviderLogo>
                            </a>
                        </WatchProvidersContainer>
                }
                <Accordion sx={{ marginTop: "30px", backgroundColor: "#242A32", border: "none" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        Sinopse
                    </AccordionSummary>
                    <AccordionDetails sx={{ textAlign: "justify" }}>
                        {movieDetails?.overview}
                    </AccordionDetails>
                </Accordion>
            </MovieInfosContainer>
        </Container>
    );
};

export default MovieDescription;