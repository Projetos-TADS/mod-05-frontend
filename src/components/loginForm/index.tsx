import { useForm, SubmitHandler } from "react-hook-form";

interface ILoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();

  const submit: SubmitHandler<ILoginFormData> = (formData) => {
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <input type="email" placeholder="Seu email" {...register("email")} />
      <input type="password" placeholder="Seu password" {...register("password")} />
      <button>Entrar</button>
    </form>
  );
};
