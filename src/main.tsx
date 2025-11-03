import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFoundPage } from "./Pages/NotFoundPage.tsx";
import MoviePage from "./Pages/MoviePage.tsx";
import "./i18n";
import { MovieDiscover } from "./Pages/MovieDiscover.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/movie/:id", element: <MoviePage /> },
  { path: "/discover", element: <MovieDiscover /> },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
