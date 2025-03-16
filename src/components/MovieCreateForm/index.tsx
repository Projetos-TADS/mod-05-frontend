import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../Input";
import { movieCreateFormSchema, TMovieCreateFormValues } from "./movieCreateFormSchema";
import { useContext, useState } from "react";
import { MovieContext } from "../../providers/MovieContext";
import { zodResolver } from "@hookform/resolvers/zod";

export const CreateNewMovieForm = () => {
  const [loading, setLoading] = useState(false);
  const { movieCreate } = useContext(MovieContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TMovieCreateFormValues>({
    resolver: zodResolver(movieCreateFormSchema),
  });

  const submit: SubmitHandler<TMovieCreateFormValues> = (formData) => {
    movieCreate(formData, setLoading);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        type="text"
        {...register("title")}
        placeholder="Título do filme"
        disabled={loading}
        error={errors.title}
      />
      <Input
        type="text"
        {...register("description")}
        placeholder="Descrição do filme"
        disabled={loading}
        error={errors.description}
      />
      <Input
        type="number"
        {...register("releaseYear")}
        placeholder="Ano de lançamento do filme"
        disabled={loading}
        error={errors.releaseYear}
      />
      <Input
        type="number"
        {...register("duration")}
        placeholder="Duração do filme"
        disabled={loading}
        error={errors.duration}
      />
      <Input
        type="number"
        min="0"
        max="5"
        step="0.1"
        {...register("rating")}
        placeholder="Avaliação do filme"
        disabled={loading}
        error={errors.rating}
      />
      <Input
        type="text"
        {...register("urlImage")}
        placeholder="URL da imagem do filme"
        disabled={loading}
        error={errors.urlImage}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
};
