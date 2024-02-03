import { ButtonsContainer, MoviesCardsContainer, Container } from "../../common/MoviesListStyled";
import HomeButton from "../../components/HomeButton";
import MovieCard from "../../components/MovieCard";
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import useMoviesData from "../../hooks/useMoviesData";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import OptionsDialog from "../../components/OptionsDialog";
import { useState } from "react";
import Movie from "../../@types/Movie";
import evaluations from "../../data/constants/evaluations";
import { getEvaluationDescription, getEvaluationValue } from "../../utils/evaluationUtils";
import useMoviesMutate from "../../hooks/useMoviesMutate";
import toast from "react-hot-toast";
import ChoseForMeButton from "../../components/ChoseForMeButton";

const MoviesToMe = () => {

    const [openEvaluationDialog, setOpenEvaluationDialog] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const { user } = useAuth();
    const { data, isLoading } = useMoviesData(user?.id as string, "recommendation");
    const { updateMovieData } = useMoviesMutate(selectedMovie as Movie);

    const handleOPenEvaluationDialog = (movie: Movie) => {
        setSelectedMovie(movie);
        setOpenEvaluationDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenEvaluationDialog(false);
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

    if (isLoading) return <Loading />;

    return (
        <Container>
            <ButtonsContainer>
                <HomeButton />
                <ChoseForMeButton
                    label="Escolha por mim"
                    watcherId={user?.id as string}
                    listCategory="recommendation"
                />
            </ButtonsContainer>
            <MoviesCardsContainer>
                {data?.map(movie => {
                    const cardButtons = [
                        {
                            content: <ThumbsUpDownIcon color="primary" sx={{ fontSize: "50px" }} />,
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
                    title={`Avalie ${selectedMovie.title}`}
                    options={evaluations.map(evaluation => evaluation.description)}
                    value={selectedMovie.evaluation ? getEvaluationDescription(selectedMovie.evaluation) : ""}
                    confirmAction={handleConfirmEvaluation}
                    cancelAction={handleCloseDialog}
                />
            )}
        </Container>
    )
}

export default MoviesToMe;