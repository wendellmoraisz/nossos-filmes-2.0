import Movie from "../@types/Movie";
import styled from "styled-components";
import { getEvaluationDescription } from "../utils/evaluationUtils";
import { MOVIE_POSTER_BASE_URL } from "../data/constants/theMoviesDb";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { Suspense } from "react";
import Loading from "./Loading";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  justify-content: space-between;
  position: absolute;
  transition: all 0.3s ease;
  pointer-events: none;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  gap: 15px;
  opacity: 0;
  z-index: 0.1;
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
`;

const MovieCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  position: relative;

  @media (max-width: 768px) {
    max-width: none;
    width: 100%;
  }

  &:hover ${ButtonsContainer} {
    opacity: 1;
    pointer-events: auto;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 300px;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const MovieCardImage = styled.img`
  width: 200px;
  height: 100%;
  cursor: pointer;
  transition: all ease 0.3s;

  @media (max-width: 768px) {
    width: 100%;
    aspect-ratio: 2 / 3;
  }
`;

const MovieCardButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MovieRating = styled.p`
  font-size: 16px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 10px;
    margin: 4px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

interface ButtonProps {
  content: string | JSX.Element;
  onClickAction: () => void;
  tooltipTitle: string;
}

interface MovieCardProps {
  movie: Movie;
  buttons?: ButtonProps[];
}

const MovieCard = ({ movie, buttons }: MovieCardProps) => {
  return (
    <MovieCardContainer key={movie.id}>
      <ImageContainer>
        <Suspense fallback={<Loading />}>
          <MovieCardImage
            src={`${MOVIE_POSTER_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
          />
        </Suspense>
        <ButtonsContainer>
          {buttons?.map((button, index) => (
            <Tooltip key={index} title={button.tooltipTitle}>
              <MovieCardButton
                onClick={(e) => {
                  e.stopPropagation();
                  button.onClickAction();
                }}
              >
                {button.content}
              </MovieCardButton>
            </Tooltip>
          ))}

          <Tooltip title="Ver detalhes">
            <Link to={`/descricao-filme/${movie.id}`}>
              <MovieCardButton type="button">
                <InfoOutlinedIcon
                  color="primary"
                  sx={{ fontSize: { xs: "18px", md: "40px" } }}
                />
              </MovieCardButton>
            </Link>
          </Tooltip>
        </ButtonsContainer>
      </ImageContainer>
      {movie.evaluation && (
        <MovieRating>{getEvaluationDescription(movie.evaluation)}</MovieRating>
      )}
    </MovieCardContainer>
  );
};

export default MovieCard;
