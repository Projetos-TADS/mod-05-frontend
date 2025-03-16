import { useContext } from "react";
import { UserContext } from "../../providers/UserContext";
import { Navigate, Outlet } from "react-router";
import { MovieProvider } from "../../providers/MovieContext";
import { ActorProvider } from "../../providers/ActorContext";
import { DirectorProvider } from "../../providers/DirectorContext";

export const ProtectedRoutes = () => {
  const { user } = useContext(UserContext);

  return user ? (
    <DirectorProvider>
      <ActorProvider>
        <MovieProvider>
          <Outlet />
        </MovieProvider>
      </ActorProvider>
    </DirectorProvider>
  ) : (
    <Navigate to="/" />
  );
};
