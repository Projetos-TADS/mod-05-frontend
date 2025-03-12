import { Link } from "react-router";
import { LoginForm } from "../../components/SigninForm";

export const LoginPage = () => {
  return (
    <>
      <h1>Rota de login</h1>
      <LoginForm />
      <Link to="/signup">Cadastre-se</Link>
    </>
  );
};
