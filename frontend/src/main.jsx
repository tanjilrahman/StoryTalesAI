import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Generate from "./pages/Generate.jsx";
import NotFound from "./pages/NotFound.jsx";
import Library from "./pages/Library.jsx";
import Login from "./pages/Login.jsx";
import Story from "./pages/Story.jsx";
import Discover from "./pages/Discover.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

const router = createBrowserRouter([
  {
    path: "/story",
    element: (
      <ProtectedRoute>
        <Generate />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/library",
    element: (
      <ProtectedRoute>
        <Library />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/discover",
    element: <Discover />,
  },
  {
    path: "/story/:storyId",
    element: <Story />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/register",
    element: <RegisterAndLogout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
