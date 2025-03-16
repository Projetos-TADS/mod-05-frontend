import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../Input";
import { actorCreateFormSchema, TActorCreateFormValues } from "./actorCreateFormSchema";
import { useContext, useState } from "react";
import { ActorContext } from "../../providers/ActorContext";
import { zodResolver } from "@hookform/resolvers/zod";

export const CreateNewActorForm = () => {
  const [loading, setLoading] = useState(false);

  const { actorCreate } = useContext(ActorContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TActorCreateFormValues>({
    resolver: zodResolver(actorCreateFormSchema),
  });

  const submit: SubmitHandler<TActorCreateFormValues> = (formData) => {
    actorCreate(formData, setLoading);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        type="text"
        {...register("name")}
        placeholder="Nome do ator"
        disabled={loading}
        error={errors.name}
      />
      <Input
        type="text"
        {...register("birthDate")}
        placeholder="Data de nascimento do ator"
        disabled={loading}
        error={errors.birthDate}
      />
      <Input
        type="text"
        {...register("nationality")}
        placeholder="Nacionalidade do ator"
        disabled={loading}
        error={errors.nationality}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
};
