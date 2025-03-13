import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserContext } from "../../providers/UserContext";
import { Input } from "../Input";
import { loginFormSchema, TLoginFormValues } from "./loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginForm = () => {
  const { userSignin } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const submit: SubmitHandler<TLoginFormValues> = (formData) => {
    userSignin(formData, setLoading);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        type="email"
        placeholder="Seu email"
        {...register("email")}
        disabled={loading}
        error={errors.email}
      />

      <Input
        type="password"
        placeholder="Seu password"
        {...register("password")}
        disabled={loading}
        error={errors.password}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
};
