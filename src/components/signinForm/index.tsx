import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserContext } from "../../providers/UserContext";

export interface ILoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { userSignin } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();

  const submit: SubmitHandler<ILoginFormData> = (formData) => {
    userSignin(formData, setLoading);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <input type="email" placeholder="Seu email" {...register("email")} disabled={loading} />
      <input
        type="password"
        placeholder="Seu password"
        {...register("password")}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
};
