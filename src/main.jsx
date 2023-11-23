import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Login.jsx";
import "./index.css";
import Users from "./users.jsx";
import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import CustomAppBar from "./AppBar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/users",
    element: <Users />,
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
