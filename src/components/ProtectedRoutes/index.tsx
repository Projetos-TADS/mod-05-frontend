import { useContext } from "react";
import { UserContext } from "../../providers/UserContext";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoutes = () => {
  const { user } = useContext(UserContext);

  return user ? <Outlet /> : <Navigate to="/" />;
};
