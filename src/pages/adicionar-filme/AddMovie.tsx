import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { searchMoviesByTitle } from "../../services/moviesService";
import {
  ButtonsContainer,
  Container,
  MoviesCardsContainer,
} from "../../common/MoviesListStyled";
import { Controller, useForm } from "react-hook-form";
import {
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Movie from "../../@types/Movie";
import MovieCard from "../../components/MovieCard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useMoviesMutate from "../../hooks/useMoviesMutate";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import toast from "react-hot-toast";
import { StyledForm } from "./AddMovieStyled";

const AddMovie = () => {
  const [movies, setMovies] = useState<Movie[]>();
  const [isSearching, setIsSearching] = useState(false);
  const [lastSearchedValue, setLastSearchedValue] = useState("");
  const { watcherId, listCategory } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { addMovie } = useMoviesMutate(selectedMovie as Movie);
  const navigate = useNavigate();

  const handleAddMovie = async (movie: Movie) => {
    movie.watcher = watcherId as string;
    movie.listCategory = listCategory as string;
    movie.watched = false;
    const toastOptions = {
      id: "add-movie-toast",
    };

    try {
      toast.loading("Adicionando filme...", toastOptions);
      addMovie.mutateAsync(movie);
      toast.success("Filme adicionado com sucesso!", toastOptions);
      navigate(-1);
    } catch (error) {
      toast.error("Erro ao adicionar filme", toastOptions);
    }
  };

  const handleOPenDialog = (movie: Movie) => {
    setSelectedMovie(movie);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const { control, handleSubmit, watch } = useForm({
    mode: "onBlur",
    defaultValues: {
      search: "",
    }
  });

  const searchValue = watch("search");

  const handleSearch = (search: string) => {
    if (!search || search.trim() === "") {
      setMovies([]);
      setLastSearchedValue("");
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    searchMoviesByTitle(search)
      .then((data) => {
        setMovies(data);
        setLastSearchedValue(search);
      })
      .finally(() => {
        setIsSearching(false);
      });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue !== undefined) {
        handleSearch(searchValue);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  useEffect(() => {
    handleCloseDialog();
  }, [addMovie.isSuccess]);

  return (
    <Container>
      <ButtonsContainer>
        <StyledForm
          onSubmit={handleSubmit((data) => {
            handleSearch(data.search);
          })}
        >
          <FormControl fullWidth>
            <Controller
              name={"search"}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  sx={{ margin: "auto" }}
                  label={"Pesquisar"}
                  value={value}
                  onChange={onChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position={"end"}>
                        <IconButton type={"submit"}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </FormControl>
        </StyledForm>
      </ButtonsContainer>
      <MoviesCardsContainer>
        {!isSearching && movies?.length === 0 && searchValue === lastSearchedValue && searchValue.trim() !== "" && (
          <Typography variant="h5" color="text.secondary" sx={{ textAlign: "center", width: "100%", mt: 4, gridColumn: "1 / -1" }}>
            Não achei nada :/
          </Typography>
        )}
        {movies?.map((movie) => {
          const cardButtons = [
            {
              content: (
                <AddCircleIcon color="primary" sx={{ fontSize: "50px" }} />
              ),
              onClickAction: () => handleOPenDialog(movie),
              tooltipTitle: "Adicionar à lista",
            },
          ];

          return (
            <MovieCard key={movie.id} movie={movie} buttons={cardButtons} />
          );
        })}
      </MoviesCardsContainer>
      {openDialog && selectedMovie && (
        <ConfirmationDialog
          open={openDialog}
          title={`Adicionar ${selectedMovie.title}?`}
          content={"Deseja adicionar o filme na lista?"}
          confirmAction={() => handleAddMovie(selectedMovie)}
          cancelAction={handleCloseDialog}
        />
      )}
    </Container>
  );
};

export default AddMovie;
