import { ButtonsContainer, Container, MoviesCardsContainer } from "../../common/MoviesListStyled";
import HomeButton from "../../components/HomeButton";
import MovieCard from "../../components/MovieCard";
import ThumbsUpDownOutlinedOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import useMoviesData from "../../hooks/useMoviesData";
import Loading from "../../components/Loading";
import CancelOutilined from '@mui/icons-material/CancelOutlined';
import AddMovieButton from "../../components/AddMovieButton";
import { useState } from "react";
import toast from "react-hot-toast";
import Movie from "../../@types/Movie";
import OptionsDialog from "../../components/OptionsDialog";
import evaluations from "../../data/constants/evaluations";
import useMoviesMutate from "../../hooks/useMoviesMutate";
import { getEvaluationValue, getEvaluationDescription } from "../../utils/evaluationUtils";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import ChoseForMeButton from "../../components/ChoseForMeButton";

const OurMovies = () => {

    const { data, isLoading } = useMoviesData("we", "pair-list");
    const [openEvaluationDialog, setOpenEvaluationDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const { updateMovieData, deleteMovieData } = useMoviesMutate(selectedMovie as Movie);

    const handleOPenEvaluationDialog = (movie: Movie) => {
        setSelectedMovie(movie);
        setOpenEvaluationDialog(true);
    }

    const handleOPenDeleteDialog = (movie: Movie) => {
        setSelectedMovie(movie);
        setOpenDeleteDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenEvaluationDialog(false);
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    }

    const handleConfirmEvaluation = (selectedValue?: number | string) => {
        const toastOptions = { id: "evaluate-movie-toast" };
        const selectedEvaluationValue = getEvaluationValue(selectedValue as string);
        const updatedMovie = {
            ...selectedMovie,
            evaluation: selectedEvaluationValue,
            watched: true
        } as Movie;

        try {
            toast.loading("Avaliando filme...", toastOptions);
            updateMovieData.mutate(updatedMovie);
            toast.success("Filme avaliado com sucesso!", toastOptions);
        } catch (error) {
            toast.error("Erro ao avaliar filme", toastOptions);
        }

        handleCloseDialog();
    }

    const handleDeleteMovie = async (movie: Movie) => {
        const toastOptions = { id: "delete-movie-toast" }

        try {
            toast.loading("Removendo filme...", toastOptions);
            deleteMovieData.mutateAsync(movie);
            toast.success("Filme excluído com sucesso!", toastOptions);
        } catch (error) {
            toast.error("Erro ao excluir filme", toastOptions);
        }

        handleCloseDeleteDialog();
    }

    if (isLoading) return <Loading />;

    return (
        <Container>
            <ButtonsContainer>
                <HomeButton />
                <AddMovieButton redirectParams={{ watcherId: "we", listCategory: "pair-list" }} />
                <ChoseForMeButton
                    label="Escolha por nós"
                    watcherId="we"
                    listCategory="pair-list"
                />
            </ButtonsContainer>
            <MoviesCardsContainer>
                {data?.map(movie => {
                    const cardButtons = [
                        {
                            content: <CancelOutilined color="error" sx={{ fontSize: "40px" }} />,
                            onClickAction: () => handleOPenDeleteDialog(movie),
                            tooltipTitle: "Excluir"
                        },
                        {
                            content: <ThumbsUpDownOutlinedOutlinedIcon color="primary" sx={{ fontSize: "40px" }} />,
                            onClickAction: () => handleOPenEvaluationDialog(movie),
                            tooltipTitle: "Avaliar"
                        }
                    ]

                    return (
                        <MovieCard key={movie.id} movie={movie} buttons={cardButtons} />
                    )
                })}
            </MoviesCardsContainer>
            {openEvaluationDialog && selectedMovie && (
                <OptionsDialog
                    open={openEvaluationDialog}
                    title={`Avaliem ${selectedMovie.title}`}
                    options={evaluations.map(evaluation => evaluation.description)}
                    value={selectedMovie.evaluation ? getEvaluationDescription(selectedMovie.evaluation) : ""}
                    confirmAction={handleConfirmEvaluation}
                    cancelAction={handleCloseDialog}
                />
            )}
            {
                openDeleteDialog && selectedMovie && (
                    <ConfirmationDialog
                        open={openDeleteDialog}
                        title={`Excluir ${selectedMovie.title}?`}
                        content={"Deseja realmente excluir o filme da lista?"}
                        confirmAction={() => handleDeleteMovie(selectedMovie)}
                        cancelAction={handleCloseDeleteDialog}
                    />
                )
            }
        </Container>
    )
}

export default OurMovies;