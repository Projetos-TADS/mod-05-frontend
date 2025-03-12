import { useForm, SubmitHandler } from "react-hook-form";
import { UserContext } from "../../providers/UserContext";
import { useContext } from "react";

export interface ISignupFormData {
  name: string;
  email: string;
  password: string;
}

export const SignupForm = () => {
  const { userSignup } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupFormData>();

  const submit: SubmitHandler<ISignupFormData> = (formData) => {
    userSignup(formData, setLoading);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <input type="text" placeholder="Seu nome" {...register("name")} disabled={loading} />
      <input type="email" placeholder="Seu email" {...register("email")} disabled={loading} />
      <input
        type="password"
        placeholder="Seu password"
        {...register("password")}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
};
