import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../services/api";
import { TMovieCreateFormValues } from "../components/MovieCreateForm/movieCreateFormSchema";
import { TMovieUpdateFormValues } from "../components/MovieUpdateForm/movieupdateFormSchema";

interface IMovieProviderProps {
	children: React.ReactNode;
}

interface IMovieResponse {
	prevPage: string | null;
	nextPage: string | null;
	count: number;
	data: IMovie[];
}

export interface IMovie {
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

interface ICastWithMovie {
	castId: string;
	actorId: string;
	movieId: string;
	addedDate: string;
	movie: IMovie;
}

interface IDirectorWithMovie {
	directorMovieId: string;
	directorId: string;
	movieId: string;
	addedDate: string;
	movie: IMovie;
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
	currentPage: number;
	totalItems: number;
	itemsPerPage: number;
	moviePagination: IMovieResponse | null;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
	handlePageChange: (page: number) => void;
	movieCreate: (formData: TMovieCreateFormValues) => Promise<void>;
	movieDelete: (movieId: string) => Promise<void>;
	movieUpdate: (newMovieData: TMovieUpdateFormValues, movieId: string) => Promise<void>;
	addActorToMovie: (movieId: string, actorId: string) => Promise<void>;
	addDirectorToMovie: (movieId: string, directorId: string) => Promise<void>;
	removeActorFromMovie: (castId: string) => Promise<void>;
	removeDirectorFromMovie: (directorMovieId: string) => Promise<void>;
}

export const MovieContext = createContext({} as IMovieContext);

export const MovieProvider = ({ children }: IMovieProviderProps) => {
	const [moviesList, setMovieList] = useState<IMovie[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(8);
	const [moviePagination, setMoviePagination] = useState<IMovieResponse | null>(null);
	const [totalItems, setTotalItems] = useState(0);
	const navigate = useNavigate();

	const moviesLoad = async (page: number = currentPage, perPage: number = itemsPerPage) => {
		const userToken: string | null = localStorage.getItem("@USERTOKEN");

		try {
			const { data } = await api.get<IMovieResponse>(`/movies?page=${page}&perPage=${perPage}`, {
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});
			setMovieList(data.data);
			setMoviePagination(data);
			setTotalItems(data.count);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		moviesLoad();
	}, [currentPage, itemsPerPage]);

	const handlePageChange = (page: number) => {
		navigate(`/movies/page/${page}`);
	};

	const movieCreate = async (formData: TMovieCreateFormValues): Promise<void> => {
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
			await moviesLoad(currentPage, itemsPerPage);
			console.log("Cadastro de filme feito");
		} catch (error) {
			console.log(error);
		}
	};

	const movieUpdate = async (newMovieData: TMovieUpdateFormValues, movieId: string) => {
		const userToken: string | null = localStorage.getItem("@USERTOKEN");

		try {
			const { data } = await api.patch<IMovie>(`/movies/${movieId}`, newMovieData, {
				headers: { Authorization: `Bearer ${userToken}` },
			});

			const updatedMovie = moviesList.filter(currentMovie => currentMovie.movieId !== movieId);

			setMovieList([...updatedMovie, data]);

			console.log("Movie Atualizado");
		} catch (error) {
			console.log(error);
		}
	};

	const movieDelete = async (movieId: string) => {
		const userToken: string | null = localStorage.getItem("@USERTOKEN");

		try {
			await api.delete<void>(`/movies/${movieId}`, {
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});

			const updatedMovieList = moviesList.filter(currentMovie => currentMovie.movieId !== movieId);
			setMovieList(updatedMovieList);
			console.log("Filmes deletado");
			await moviesLoad(currentPage, itemsPerPage);
		} catch (error) {
			console.log(error);
		}
	};

	const addActorToMovie = async (movieId: string, actorId: string) => {
		const userToken: string | null = localStorage.getItem("@USERTOKEN");
		const payload = {
			movieId,
			actorId,
		};

		try {
			await api.post<ICastWithMovie>("/cast", payload, {
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});

			moviesLoad();

			console.log("Ator adicionado ao filme");
		} catch (error) {
			console.log(error);
		}
	};

	const addDirectorToMovie = async (movieId: string, directorId: string) => {
		const userToken: string | null = localStorage.getItem("@USERTOKEN");
		const payload = {
			movieId,
			directorId,
		};

		try {
			await api.post<IDirectorWithMovie>("/directorMovie", payload, {
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});

			moviesLoad();

			console.log("Diretor adicionado ao filme");
		} catch (error) {
			console.log(error);
		}
	};

	const removeActorFromMovie = async (castId: string) => {
		const userToken: string | null = localStorage.getItem("@USERTOKEN");

		try {
			await api.delete<void>(`/cast/${castId}`, {
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});

			moviesLoad();
			console.log("Ator removido");
		} catch (error) {
			console.log(error);
		}
	};

	const removeDirectorFromMovie = async (directorMovieId: string) => {
		const userToken: string | null = localStorage.getItem("@USERTOKEN");

		try {
			await api.delete<void>(`/directorMovie/${directorMovieId}`, {
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});

			moviesLoad();
			console.log("Diretor removido");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<MovieContext.Provider
			value={{
				moviesList,
				currentPage,
				totalItems,
				itemsPerPage,
				moviePagination,
				setCurrentPage,
				setItemsPerPage,
				handlePageChange,
				movieCreate,
				movieDelete,
				movieUpdate,
				addActorToMovie,
				addDirectorToMovie,
				removeActorFromMovie,
				removeDirectorFromMovie,
			}}>
			{children}
		</MovieContext.Provider>
	);
};
