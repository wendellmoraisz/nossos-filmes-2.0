import Movie from "../@types/Movie";
import styled from "styled-components";
import { getEvaluationDescription } from "../utils/evaluationUtils";
import { MOVIE_POSTER_BASE_URL } from "../data/constants/theMoviesDb";
import { Tooltip } from "@mui/material";

const MovieCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 200px;
    position: relative;
`;

const MovieCardImage = styled.img`
    width: 200px;
    height: 300px;
    cursor: pointer;
    box-shadow: 2px 10px 14px 0px #121111;
    transition: all ease 0.3s;

    &:hover {
        transform: translateY(-5px);
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-between;
    margin-top: 10px;
    position: absolute;
    top: 37%;
    right: -32px;
`;

const MovieCardButton = styled.button`
    background-color: transparent;
    color: white;
    border: none;
    cursor: pointer;
`;

const MovieCardTitle = styled.p`
    font-size: 16px;
    font-weight: bold;
`;

interface ButtonProps {
    content: string | JSX.Element
    onClickAction: () => void
    tooltipTitle: string
}

interface MovieCardProps {
    movie: Movie
    buttons?: ButtonProps[]
}

const MovieCard = ({ movie, buttons }: MovieCardProps) => {
    return (
        <MovieCardContainer key={movie.id}>
            <MovieCardImage
                src={`${MOVIE_POSTER_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
            />
            <ButtonsContainer>
                {buttons?.map((button, index) => (
                    <Tooltip title={button.tooltipTitle}>
                        <MovieCardButton key={index} onClick={() => button.onClickAction()}>
                            {button.content}
                        </MovieCardButton>
                    </Tooltip>
                ))}
            </ButtonsContainer>
            <MovieCardTitle>{movie.title}</MovieCardTitle>
            {
                movie.evaluation && (
                    <>
                        Avaliação: {getEvaluationDescription(movie.evaluation)}
                    </>
                )
            }
        </MovieCardContainer>
    )
}

export default MovieCard;