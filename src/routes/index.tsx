import { Routes, Route } from "react-router";
import { LoginPage } from "../pages/Login";
import { SignupPage } from "../pages/Signup";
import { MoviesPage } from "../pages/Movies";
import { InfoPage } from "../pages/Info";
import { ProtectedRoutes } from "../components/ProtectedRoutes";
import { NotFound } from "../pages/NotFound";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/movies" element={<ProtectedRoutes />}>
        <Route index element={<MoviesPage />} />
      </Route>
      <Route path="/info/:movieId" element={<ProtectedRoutes />}>
        <Route index element={<InfoPage />} />
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};
