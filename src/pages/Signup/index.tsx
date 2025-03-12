import { Link } from "react-router";
import { SignupForm } from "../../components/SignupForm";

export const SignupPage = () => {
  return (
    <>
      <h1>Rota de cadastro</h1>
      <SignupForm />
      <Link to="/">Voltar</Link>
    </>
  );
};
