import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import AuthProvider from "./context/AuthProvider.tsx";

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
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={defautTheme}>
        <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
