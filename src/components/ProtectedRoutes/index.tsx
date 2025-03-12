import { useContext } from "react";
import { UserContext } from "../../providers/UserContext";
import { Navigate, Outlet } from "react-router";
import { MoviesProvider } from "../../providers/MoviesContext";

export const ProtectedRoutes = () => {
  const { user } = useContext(UserContext);

  return user ? (
    <MoviesProvider>
      <Outlet />
    </MoviesProvider>
  ) : (
    <Navigate to="/" />
  );
};
