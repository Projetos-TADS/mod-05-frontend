import { useForm, SubmitHandler } from "react-hook-form";

interface ISignupFormData {
  name: string;
  email: string;
  password: string;
}

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupFormData>();

  const submit: SubmitHandler<ISignupFormData> = (formData) => {
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <input type="text" placeholder="Seu nome" {...register("name")} />
      <input type="email" placeholder="Seu email" {...register("email")} />
      <input type="password" placeholder="Seu password" {...register("password")} />
      <button type="submit">Cadastrar</button>
    </form>
  );
};
