import { Routes, Route } from "react-router";
import { LoginPage } from "../pages/Login";
import { SignupPage } from "../pages/Signup";
import { MoviesPage } from "../pages/Movies";
import { InfoPage } from "../pages/Info";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/info/:movieId" element={<InfoPage />} />
    </Routes>
  );
};
