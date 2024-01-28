import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import AuthProvider from "./context/AuthProvider.tsx";
import { Toaster } from "react-hot-toast";

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
  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
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
  </React.StrictMode>,
)
