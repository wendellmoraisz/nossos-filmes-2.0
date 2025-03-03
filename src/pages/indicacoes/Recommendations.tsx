import { ButtonsContainer, Container, MoviesCardsContainer } from "../../common/MoviesListStyled";
import HomeButton from "../../components/HomeButton";
import MovieCard from "../../components/MovieCard";
import useMoviesData from "../../hooks/useMoviesData";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import CancelOutilined from '@mui/icons-material/CancelOutlined';
import AddMovieButton from "../../components/AddMovieButton";
import useMoviesMutate from "../../hooks/useMoviesMutate";
import { useState } from "react";
import toast from "react-hot-toast";
import Movie from "../../@types/Movie";
import ConfirmationDialog from "../../components/ConfirmationDialog";

const Recommendations = () => {

    const { user } = useAuth();
    const { data, isLoading } = useMoviesData(user?.pair.id as string, "recommendation");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const { deleteMovieData } = useMoviesMutate(selectedMovie as Movie);

    const handleDeleteMovie = async (movie: Movie) => {
        const toastOptions = { id: "delete-movie-toast" }

        try {
            toast.loading("Removendo filme...", toastOptions);
            deleteMovieData.mutateAsync(movie);
            toast.success("Filme excluído com sucesso!", toastOptions);
        } catch (error) {
            toast.error("Erro ao excluir filme", toastOptions);
        }

        handleCloseDialog();
    }

    const handleOPenDialog = (movie: Movie) => {
        setSelectedMovie(movie);
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    if (isLoading) return <Loading />;

    return (
        <Container>
            <ButtonsContainer>
                <HomeButton />
                <AddMovieButton redirectParams={{ watcherId: user?.pair.id as string, listCategory: "recommendation" }} />
            </ButtonsContainer>
            <MoviesCardsContainer>
                {data?.map(movie => {

                    const cardButtons = [
                        {
                            content: <CancelOutilined color="error" sx={{ fontSize: "40px" }} />,
                            onClickAction: () => handleOPenDialog(movie),
                            tooltipTitle: "Excluir"
                        }
                    ]

                    return (
                        <MovieCard key={movie.id} movie={movie} buttons={cardButtons} />
                    )
                })}
            </MoviesCardsContainer>
            {openDialog && selectedMovie && (
                <ConfirmationDialog
                    open={openDialog}
                    title={`Excluir ${selectedMovie.title}?`}
                    content={"Deseja realmente excluir o filme da lista?"}
                    confirmAction={() => handleDeleteMovie(selectedMovie)}
                    cancelAction={handleCloseDialog}
                />
            )}
        </Container>
    )
}

export default Recommendations;