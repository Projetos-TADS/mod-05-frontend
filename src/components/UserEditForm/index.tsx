import { useForm, SubmitHandler } from "react-hook-form";
import { UserContext } from "../../providers/UserContext";
import { useContext, useState } from "react";
import { Input } from "../Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { TUserEditFormValues, userEditFormSchema } from "./userEditFormSchema";

export const UserEditForm = () => {
  const { userEdit, user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserEditFormValues>({
    resolver: zodResolver(userEditFormSchema),
  });

  const submit: SubmitHandler<TUserEditFormValues> = (newUserData) => {
    userEdit(newUserData, setLoading);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        type="text"
        placeholder={user?.name?.toString()}
        {...register("name")}
        disabled={loading}
        error={errors.name}
      />
      <Input
        type="email"
        placeholder={user?.email?.toString()}
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
