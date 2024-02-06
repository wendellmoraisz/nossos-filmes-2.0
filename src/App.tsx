import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import AuthProvider from "./context/AuthProvider.tsx";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home/Home.tsx";
import MoviesToMe from "./pages/filmes-para-mim/MoviesToMe.tsx";
import AddMovie from "./pages/adicionar-filme/AddMovie.tsx";
import MyList from "./pages/minha-lista/MyList.tsx";
import OurMovies from "./pages/nossos-filmes/OurMovies.tsx";
import Recommendations from "./pages/indicacoes/Recommendations.tsx";
import MovieDescription from "./pages/descricao-filme/MovieDescription.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import MoviesOf from "./pages/filmes-de/MoviesOf.tsx";

const defautTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#242A32"
    },
    primary: {
      main: "#32E0C4"
    },
    secondary: {
      main: "#242A32"
    }
  },
  typography: {
    fontFamily: "Poppins"
  }
});

function App() {

  const localUser = JSON.parse(window.localStorage.getItem(import.meta.env.VITE_AUTH_STORAGE as string) as string);

  return (
    <ThemeProvider theme={defautTheme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute localUser={localUser} />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/filmes-para-mim" element={<MoviesToMe />} />
              <Route path="/minha-lista" element={<MyList />} />
              <Route path="/nossos-filmes" element={<OurMovies />} />
              <Route path="/indicacoes" element={<Recommendations />} />
              <Route path="/filmes-de" element={<MoviesOf />} />
              <Route path="/adicionar-filme/:watcherId/:listCategory" element={<AddMovie />} />
              <Route path="/descricao-filme/:movieId" element={<MovieDescription />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <Toaster
        toastOptions={{
          duration: 2000,
          style: {
            background: "#242A32",
            color: "#FFF",
            boxShadow: "1px 5px 14px 1px rgba(0, 0, 0, 0.2)"
          }
        }}
      />
    </ThemeProvider>
  )
}

export default App;
