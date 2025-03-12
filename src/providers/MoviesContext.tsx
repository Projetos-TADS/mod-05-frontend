import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

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
  //   user: IUser | null;
  //   userSignin: (
  //     formData: ILoginFormData,
  //     setLoading: React.Dispatch<React.SetStateAction<boolean>>
  //   ) => Promise<void>;
  //   userSignup: (
  //     formData: ISignupFormData,
  //     setLoading: React.Dispatch<React.SetStateAction<boolean>>
  //   ) => Promise<void>;
  //   userLogout: () => void;
  // isEditUserProfileModalOpen: boolean;
  // setIsEditUserProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // editUserProfile: (newUserProfileData: IRegisterUserFormData) => Promise<void>;
  // setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

// interface IUserSigninResponse {
//   user: IUser;
//   token: string;
// }

export const MoviesContext = createContext({} as IMovieContext);

export const MoviesProvider = ({ children }: IMovieProviderProps) => {
  const [movieList, setMovieList] = useState<IMovie[]>([]);

  console.log(movieList);

  useEffect(() => {
    const moviesLoad = async () => {
      try {
        const { data } = await api.get<IMovieResponse>("/movies");
        setMovieList(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    moviesLoad();
  }, []);

  return <MoviesContext.Provider value={{}}>{children}</MoviesContext.Provider>;
};
