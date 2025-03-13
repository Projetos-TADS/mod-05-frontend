import { useForm, SubmitHandler } from "react-hook-form";
import { UserContext } from "../../providers/UserContext";
import { useContext, useState } from "react";
import { Input } from "../Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema, TSignupFormValues } from "./signupFormSchema";

export const SignupForm = () => {
  const { userSignup } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignupFormValues>({
    resolver: zodResolver(signupFormSchema),
  });

  const submit: SubmitHandler<TSignupFormValues> = (formData) => {
    userSignup(formData, setLoading);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        type="text"
        placeholder="Seu nome"
        {...register("name")}
        disabled={loading}
        error={errors.name}
      />
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
      <Input
        type="password"
        placeholder="Confirme seu password"
        {...register("confirmPassword")}
        disabled={loading}
        error={errors.confirmPassword}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
};
