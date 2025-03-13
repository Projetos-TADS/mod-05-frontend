import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { TCreateMovieFormValues } from "../components/CreateMovieForm/createMovieFormSchema";

interface IMovieProviderProps {
  children: React.ReactNode;
}

interface IMovieResponse {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: IMovie[];
}

interface IMovie {
  movieId: string;
  title: string;
  description: string;
  releaseYear: number;
  duration: number;
  rating: number;
  urlImage: string;
  actors: IActor[];
  directors: IDirector[];
}

interface IActor {
  actorId: string;
  name: string;
  birthDate: string;
  nationality: string;
  CastModel: ICastModel;
}

interface ICastModel {
  castId: string;
  actorId: string;
  movieId: string;
  addedDate: string;
  createdAt: string;
  updatedAt: string;
}

interface IDirector {
  directorId: string;
  name: string;
  birthDate: string;
  nationality: string;
  DirectorMovie: IDirectorMovie;
}

interface IDirectorMovie {
  directorMovieId: string;
  directorId: string;
  movieId: string;
  addedDate: string;
  createdAt: string;
  updatedAt: string;
}

interface IMovieContext {
  moviesList: IMovie[] | null;
  createNewMovie: (
    formData: TCreateMovieFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  deleteMovie: (movieId: string) => Promise<void>;
}

export const MoviesContext = createContext({} as IMovieContext);

export const MoviesProvider = ({ children }: IMovieProviderProps) => {
  const [moviesList, setMovieList] = useState<IMovie[]>([]);

  useEffect(() => {
    const moviesLoad = async () => {
      const userToken: string | null = localStorage.getItem("@USERTOKEN");

      try {
        const { data } = await api.get<IMovieResponse>("/movies", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setMovieList(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    moviesLoad();
  }, []);

  const createNewMovie = async (
    formData: TCreateMovieFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");
    const convertedFormData = {
      ...formData,
      duration: Number(formData.duration),
      rating: Number(formData.rating),
      releaseYear: Number(formData.releaseYear),
    };

    try {
      const { data } = await api.post<IMovie>("/movies", convertedFormData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setMovieList([...moviesList, data]);
      console.log("Cadastro de filme feito");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMovie = async (movieId: string) => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");

    try {
      await api.delete(`/movies/${movieId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const updatedMovieList = moviesList.filter(
        (currentMovie) => currentMovie.movieId !== movieId
      );
      setMovieList(updatedMovieList);
      console.log("Filmes deletado");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MoviesContext.Provider value={{ moviesList, createNewMovie, deleteMovie }}>
      {children}
    </MoviesContext.Provider>
  );
};
