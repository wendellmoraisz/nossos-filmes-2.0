import { useParams } from "react-router-dom";
import { MOVIE_POSTER_BASE_URL } from "../../data/constants/theMoviesDb";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaidIcon from "@mui/icons-material/Paid";
import SavingsIcon from "@mui/icons-material/Savings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getYearFromReleaseDate } from "../../utils/getYearFromReleaseDate";
import { convertMinutesToHours } from "../../utils/convertMinutesToHours";
import { abbreviateNumber } from "../../utils/abbreviateNumber";
import Loading from "../../components/Loading";
import {
  Container,
  MovieBanner,
  MovieInfosContainer,
  MovieHeaderContainer,
  MoviePoster,
  MovieHeadInfo,
  MovieTitle,
  MovieTagline,
  MovieAdittionalInfoContainer,
  MovieAdittionalInfoItem,
  CategoryTitle,
  MovieGenresContainer,
  WatchProvidersContainer,
  WatchProviderLogo,
  MovieBannerContainer,
} from "./MovieDescriptionStyled";
import utorrentLogo from "../../assets/utorrent-logo.png";
import useMovieDetailsData from "../../hooks/useMovieDetailsData";

const MovieDescription = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { data: movieDetails, isLoading } = useMovieDetailsData(
    Number(movieId),
  );

  if (isLoading || !movieDetails) return <Loading />;

  const directors = movieDetails.credits?.crew.filter(
    (member) => member.job === "Director",
  );

  return (
    <Container>
      <MovieBannerContainer>
        <MovieBanner
          $imageUrl={`${MOVIE_POSTER_BASE_URL}${movieDetails?.backdrop_path}`}
        />
      </MovieBannerContainer>
      <MovieInfosContainer>
        <MovieHeaderContainer>
          <MoviePoster
            src={`${MOVIE_POSTER_BASE_URL}${movieDetails?.poster_path}`}
            alt={movieDetails?.title}
          />
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
          {(movieDetails?.budget ?? 0) > 0 && (
            <MovieAdittionalInfoItem>
              <Divider orientation="vertical" variant="fullWidth" flexItem />
              <PaidIcon />
              {abbreviateNumber(movieDetails?.budget as number)}
            </MovieAdittionalInfoItem>
          )}
          {(movieDetails?.revenue ?? 0) > 0 && (
            <MovieAdittionalInfoItem>
              <Divider orientation="vertical" variant="fullWidth" flexItem />
              <SavingsIcon />
              {abbreviateNumber(movieDetails?.revenue as number)}
            </MovieAdittionalInfoItem>
          )}
        </MovieAdittionalInfoContainer>
        {movieDetails?.genres && (
          <>
            <CategoryTitle>Gêneros</CategoryTitle>
            <MovieGenresContainer>
              {movieDetails?.genres.map((genre, index) => (
                <div
                  key={genre.id}
                  style={{ display: "flex", gap: "20px", alignItems: "center" }}
                >
                  {genre.name}
                  {index !== (movieDetails?.genres?.length ?? 0) - 1 && (
                    <Divider
                      orientation="vertical"
                      variant="fullWidth"
                      flexItem
                    />
                  )}
                </div>
              ))}
            </MovieGenresContainer>
          </>
        )}
        {movieDetails.release_date < new Date().toISOString() && (
          <>
            <CategoryTitle>Onde assistir</CategoryTitle>
            {(movieDetails?.watch_providers?.length ?? 0) > 0 ? (
              <MovieGenresContainer>
                {movieDetails?.watch_providers?.map((provider) => (
                  <WatchProvidersContainer key={provider.provider_id}>
                    <a
                      target="_blank"
                      href={`https://themoviedb.org/movie/${movieId}/watch`}
                    >
                      <WatchProviderLogo
                        src={`${MOVIE_POSTER_BASE_URL}${provider.logo_path}`}
                        alt={provider.provider_name}
                      />
                    </a>
                  </WatchProvidersContainer>
                ))}
              </MovieGenresContainer>
            ) : (
              <WatchProvidersContainer>
                <a
                  target="_blank"
                  href={`https://www.google.com/search?q=${movieDetails.title}+download+torrent`}
                >
                  <WatchProviderLogo
                    src={utorrentLogo}
                    alt="Utorrent logo"
                  ></WatchProviderLogo>
                </a>
              </WatchProvidersContainer>
            )}
          </>
        )}

        {directors && directors.length > 0 && (
          <>
            <CategoryTitle>Direção</CategoryTitle>
            <MovieGenresContainer>
              {directors.map((director, index) => (
                <div
                  key={director.id}
                  style={{ display: "flex", gap: "20px", alignItems: "center" }}
                >
                  {director.name}
                  {index !== (directors?.length ?? 0) - 1 && (
                    <Divider
                      orientation="vertical"
                      variant="fullWidth"
                      flexItem
                    />
                  )}
                </div>
              ))}
            </MovieGenresContainer>
          </>
        )}
        <Accordion
          sx={{ marginTop: "30px", backgroundColor: "#242A32", border: "none" }}
        >
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
