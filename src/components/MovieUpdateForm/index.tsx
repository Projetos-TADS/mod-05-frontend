import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../Input";
import { useContext } from "react";
import { IMovie, MoviesContext } from "../../providers/MoviesContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { movieUpdateFormSchema, TMovieUpdateFormValues } from "./movieupdateFormSchema";

interface MovieUpdateFormProps {
  movie: IMovie;
}

export const MovieUpdateForm = ({ movie }: MovieUpdateFormProps) => {
  // const [loading, setLoading] = useState(false);
  const { movieUpdate, setmodalMovieEdit } = useContext(MoviesContext);

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

    setmodalMovieEdit(false);
  };

  return (
    <>
      <button onClick={() => setmodalMovieEdit(false)}>Fechar</button>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          type="text"
          {...register("title")}
          placeholder={movie?.title || "Título do filme"}
          // disabled={loading}
          error={errors.title}
        />
        <Input
          type="text"
          {...register("description")}
          placeholder={movie?.description || "Descrição do filme"}
          // disabled={loading}
          error={errors.description}
        />
        <Input
          type="number"
          {...register("releaseYear")}
          placeholder={movie?.releaseYear.toString() || "Ano de lançamento do filme"}
          // disabled={loading}
          error={errors.releaseYear}
        />
        <Input
          type="number"
          {...register("duration")}
          placeholder={movie?.duration.toString() || "Duração do filme"}
          // disabled={loading}
          error={errors.duration}
        />
        <Input
          type="number"
          min="0"
          max="5"
          step="0.1"
          {...register("rating")}
          placeholder={movie?.rating.toString() || "Avaliação do filme"}
          // disabled={loading}
          error={errors.rating}
        />
        <Input
          type="text"
          {...register("urlImage")}
          placeholder={movie?.urlImage || "URL da imagem do filme"}
          // disabled={loading}
          error={errors.urlImage}
        />
        <button
          type="submit"
          // disabled={loading}
        >
          Atualizar
        </button>
      </form>
    </>
  );
};
