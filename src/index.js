import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/pages/login/Login.jsx"
import Home from "./components/pages/./home/Home";
import TableHome from "./components/pages/./home/TableHome";
import Material from "./components/pages/material/Material";
import Register from "./components/pages/register/Register";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/TableHome",
    element: <TableHome />,
  },
  {
    path: "/material",
    element: <Material />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
];

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

reportWebVitals();
