import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../Input";
import { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { directorUpdateFormSchema, TDirectorUpdateFormValues } from "./directorUpdateFormSchema";
import { DirectorContext, IDirector } from "../../providers/DirectorContext";

interface DirectorUpdateFormProps {
  director: IDirector;
  onClose: () => void;
}

export const DirectorUpdateForm = ({ director }: DirectorUpdateFormProps) => {
  const { directorUpdate, setModalDirectorEdit } = useContext(DirectorContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TDirectorUpdateFormValues>({
    resolver: zodResolver(directorUpdateFormSchema),
  });

  const submit: SubmitHandler<TDirectorUpdateFormValues> = (newDirectorData) => {
    const filteredData = Object.fromEntries(
      Object.entries(newDirectorData).filter(([, value]) => value !== undefined && value !== "")
    );

    if (Object.keys(filteredData).length > 0) directorUpdate(filteredData, director.directorId);

    setModalDirectorEdit(false);
  };

  return (
    <>
      <button onClick={() => setModalDirectorEdit(false)}>Fechar</button>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          type="text"
          {...register("name")}
          placeholder={director?.name || "Nome do diretor"}
          error={errors.name}
        />
        <Input
          type="text"
          {...register("birthDate")}
          placeholder={director?.birthDate || "Data de nascimento do diretor"}
          error={errors.birthDate}
        />
        <Input
          type="text"
          {...register("nationality")}
          placeholder={director?.nationality || "Nacionalidade do diretor"}
          error={errors.nationality}
        />
        <button type="submit">Atualizar</button>
      </form>
    </>
  );
};
