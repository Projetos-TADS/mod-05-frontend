import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../Input";
import { useContext } from "react";
import { IMovie, MovieContext } from "../../providers/MovieContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { movieUpdateFormSchema, TMovieUpdateFormValues } from "./movieupdateFormSchema";

interface MovieUpdateFormProps {
  movie: IMovie;
  onClose: () => void;
}

export const MovieUpdateForm = ({ movie }: MovieUpdateFormProps) => {
  const { movieUpdate, setModalMovieEdit } = useContext(MovieContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TMovieUpdateFormValues>({
    resolver: zodResolver(movieUpdateFormSchema),
  });

  const submit: SubmitHandler<TMovieUpdateFormValues> = (newMovieData) => {
    const filteredData = Object.fromEntries(
      Object.entries(newMovieData).filter(([, value]) => value !== undefined && value !== "")
    );

    if (Object.keys(filteredData).length > 0) movieUpdate(filteredData, movie.movieId);

    setModalMovieEdit(false);
  };

  return (
    <>
      <button onClick={() => setModalMovieEdit(false)}>Fechar</button>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          type="text"
          {...register("title")}
          placeholder={movie?.title || "Título do filme"}
          error={errors.title}
        />
        <Input
          type="text"
          {...register("description")}
          placeholder={movie?.description || "Descrição do filme"}
          error={errors.description}
        />
        <Input
          type="number"
          {...register("releaseYear")}
          placeholder={movie?.releaseYear.toString() || "Ano de lançamento do filme"}
          error={errors.releaseYear}
        />
        <Input
          type="number"
          {...register("duration")}
          placeholder={movie?.duration.toString() || "Duração do filme"}
          error={errors.duration}
        />
        <Input
          type="number"
          min="0"
          max="5"
          step="0.1"
          {...register("rating")}
          placeholder={movie?.rating.toString() || "Avaliação do filme"}
          error={errors.rating}
        />
        <Input
          type="text"
          {...register("urlImage")}
          placeholder={movie?.urlImage || "URL da imagem do filme"}
          error={errors.urlImage}
        />
        <button type="submit">Atualizar</button>
      </form>
    </>
  );
};
