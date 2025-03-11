import { Routes, Route } from "react-router";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { Movies } from "../pages/Movies";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/movies" element={<Movies />} />
    </Routes>
  );
};
