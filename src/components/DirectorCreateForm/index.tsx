import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../Input";
import { directorCreateFormSchema, TDirectorCreateFormValues } from "./directorCreateFormSchema";
import { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DirectorContext } from "../../providers/DirectorContext";

export const CreateNewDirectorForm = () => {
  const [loading, setLoading] = useState(false);

  const { directorCreate } = useContext(DirectorContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TDirectorCreateFormValues>({
    resolver: zodResolver(directorCreateFormSchema),
  });

  const submit: SubmitHandler<TDirectorCreateFormValues> = (formData) => {
    directorCreate(formData, setLoading);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        type="text"
        {...register("name")}
        placeholder="Nome do diretor"
        disabled={loading}
        error={errors.name}
      />
      <Input
        type="text"
        {...register("birthDate")}
        placeholder="Data de nascimento do diretor"
        disabled={loading}
        error={errors.birthDate}
      />
      <Input
        type="text"
        {...register("nationality")}
        placeholder="Nacionalidade do diretor"
        disabled={loading}
        error={errors.nationality}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
};
