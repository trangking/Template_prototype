import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Component/Page/Login/Login";
import Home from "./Component/Page/Home/Home";
import TableHome from "./Component/Page/Home/TableHome";
import Material from "./Component/Page/Material/Material";

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
];

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

reportWebVitals();
