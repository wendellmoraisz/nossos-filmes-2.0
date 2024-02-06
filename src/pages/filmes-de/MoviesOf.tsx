import { ButtonsContainer, Container, MoviesCardsContainer } from "../../common/MoviesListStyled";
import HomeButton from "../../components/HomeButton";
import MovieCard from "../../components/MovieCard";
import useMoviesData from "../../hooks/useMoviesData";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";

const MoviesOf = () => {

    const { user } = useAuth();
    const { data, isLoading } = useMoviesData(user?.pair.id as string, "personal-list");

    if (isLoading) return <Loading />;

    return (
        <Container>
            <ButtonsContainer>
                <HomeButton />
            </ButtonsContainer>
            <MoviesCardsContainer>
                {data?.map(movie => {
                    return (
                        <MovieCard key={movie.id} movie={movie} />
                    )
                })}
            </MoviesCardsContainer>
        </Container>
    )
}

export default MoviesOf;