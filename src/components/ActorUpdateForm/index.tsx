import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../Input";
import { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { actorUpdateFormSchema, TActorUpdateFormValues } from "./actorUpdateFormSchema";
import { ActorContext, IActor } from "../../providers/ActorContext";

interface ActorUpdateFormProps {
  actor: IActor;
  onClose: () => void;
}

export const ActorUpdateForm = ({ actor }: ActorUpdateFormProps) => {
  const { actorUpdate, setModalActorEdit } = useContext(ActorContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TActorUpdateFormValues>({
    resolver: zodResolver(actorUpdateFormSchema),
  });

  const submit: SubmitHandler<TActorUpdateFormValues> = (newActorData) => {
    const filteredData = Object.fromEntries(
      Object.entries(newActorData).filter(([, value]) => value !== undefined && value !== "")
    );

    if (Object.keys(filteredData).length > 0) actorUpdate(filteredData, actor.actorId);

    setModalActorEdit(false);
  };

  return (
    <>
      <button onClick={() => setModalActorEdit(false)}>Fechar</button>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          type="text"
          {...register("name")}
          placeholder={actor?.name || "Nome do ator"}
          error={errors.name}
        />
        <Input
          type="text"
          {...register("birthDate")}
          placeholder={actor?.birthDate || "Data de nascimento do ator"}
          error={errors.birthDate}
        />
        <Input
          type="text"
          {...register("nationality")}
          placeholder={actor?.nationality || "Nacionalidade do ator"}
          error={errors.nationality}
        />
        <button type="submit">Atualizar</button>
      </form>
    </>
  );
};
