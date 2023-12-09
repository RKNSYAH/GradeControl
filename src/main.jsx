import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Login from "./Login.jsx";
import "./index.css";
import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import CustomAppBar from "./AppBar.jsx";
import Nilai from "./nilai.jsx";
import Kelas from "./kelas.jsx";
import Register from "./register.jsx";
import Siswa from "./siswa.jsx";
import Mapel from "./mapel.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/nilai/:idKelas",
    element: <Nilai />,
  },
  {
    path: "/kelas",
    element: <Kelas />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/kelas/:idKelas",
    element: <Siswa />,
  },
  {
    path: "/mapel/:idKelas",
    element: <Mapel />,
  },
]);
const themeDark = createTheme({
  palette: {
    background: {
      default: "#242424",
      paper: "#303030",
    },
    text: {
      primary: "#ffffff",
    },
    
  },
});


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
