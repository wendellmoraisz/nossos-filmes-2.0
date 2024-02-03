import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DrumsGif from "../assets/cat-drum-roll.gif";
import styled from "styled-components";
import Movie from "../@types/Movie";
import { getUnwatchedMovies } from "../services/moviesService";
import toast from "react-hot-toast";
import MovieCard from "./MovieCard";
import { Typography } from "@mui/material";

const style = {
    position: "absolute",
    height: 480,
    width: { xs: "80%", sm: "50%", md: "33.33%", lg: "25%" },
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "center",
};

const StyledImage = styled.img`
    max-width: 100%;
    height: auto;
`;

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;

interface ChoseForMeModalProps {
    open: boolean;
    handleClose: () => void;
    watcherId: string;
    listCategory: string;
}

const ChoseForMeModal = ({ open, handleClose, watcherId, listCategory }: ChoseForMeModalProps) => {

    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const raffleUnwatchedMovie = async () => {
        try {
            const unwatchedMovies = await getUnwatchedMovies(watcherId, listCategory);
            setTimeout(() => {
                selectRandomMovie(unwatchedMovies);
            }, 3000);
        } catch (error) {
            toast.error("Erro ao buscar filmes", { id: "raffle-unwatched-movie-toast" });
        }
    }

    const selectRandomMovie = (movies: Movie[]) => {
        const randomIndex = Math.floor(Math.random() * movies.length);
        const randomMovie = movies[randomIndex];
        setSelectedMovie(randomMovie);
    }

    useEffect(() => {
        if (open) raffleUnwatchedMovie();
    }, [open]);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                {
                    selectedMovie ? (
                        <ResultContainer>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                E o escolhido foi...
                            </Typography>
                            <MovieCard movie={selectedMovie} />
                        </ ResultContainer>
                    ) : (
                        <StyledImage src={DrumsGif} />
                    )
                }
            </Box>
        </Modal>
    );
}

export default ChoseForMeModal;