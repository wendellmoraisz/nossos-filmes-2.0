import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import AuthProvider from "./context/AuthProvider.tsx";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home/Home.tsx";

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/home",
    element: <Home />
  }
]);

function App() {

  return (
    <ThemeProvider theme={defautTheme}>
      <AuthProvider>
        <RouterProvider router={router} />
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
