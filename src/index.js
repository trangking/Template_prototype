import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Component/page/Login/Login";
import Home from "./Component/page/Home/Home";
import TableHome from "./Component/page/Home/TableHome";
import Material from "./Component/page/Material/Material";
import Register from "./Component/page/AddProject/Register";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/TableHome",
    element: <TableHome />,
  },
  {
    path: "/Material",
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
