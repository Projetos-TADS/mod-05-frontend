import { useForm, SubmitHandler } from "react-hook-form";
import { UserContext } from "../../providers/UserContext";
import { useContext, useState } from "react";
import { Input } from "../Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { TUserUpdateFormValues, userUpdateSchema } from "./userUpdateFormSchema";

export const UserEditForm = () => {
  const { userUpdate, user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserUpdateFormValues>({
    resolver: zodResolver(userUpdateSchema),
  });

  const submit: SubmitHandler<TUserUpdateFormValues> = (newUserData) => {
    const filteredData = Object.fromEntries(
      Object.entries(newUserData).filter(
        ([key, value]) => value !== undefined && value !== "" && key !== "confirmPassword"
      )
    );

    if (Object.keys(filteredData).length > 0) userUpdate(filteredData, setLoading);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        type="text"
        placeholder={user?.name || "Seu nome"}
        {...register("name")}
        disabled={loading}
        error={errors.name}
      />
      <Input
        type="email"
        placeholder={user?.email || "Seu e-mail"}
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
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
};
