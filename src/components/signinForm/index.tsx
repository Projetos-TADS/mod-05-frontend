import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserContext } from "../../providers/UserContext";

export interface ILoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { userSignin } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();

  const submit: SubmitHandler<ILoginFormData> = (formData) => {
    userSignin(formData);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <input type="email" placeholder="Seu email" {...register("email")} />
      <input type="password" placeholder="Seu password" {...register("password")} />
      <button>Entrar</button>
    </form>
  );
};
