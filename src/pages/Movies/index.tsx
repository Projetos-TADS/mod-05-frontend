import { useContext } from "react";
import { UserContext } from "../../providers/UserContext";
import { MoviesContext } from "../../providers/MoviesContext";
import { CreateNewMovieForm } from "../../components/CreateMovieForm";
import { UserEditForm } from "../../components/UserEditForm";

export const MoviesPage = () => {
  const { userLogout, user } = useContext(UserContext);
  const { moviesList, deleteMovie } = useContext(MoviesContext);

  return (
    <main>
      <header>
        <span>{user?.name}</span>
        <button onClick={() => userLogout()}>Logout</button>
        <h2>Editar Usuário</h2>
        <UserEditForm />
      </header>
      <section>
        <h1>LISTA DE FILMES</h1>
        <ul>
          {moviesList?.map((currentMovie) => (
            <li key={currentMovie.movieId}>
              <h3>{currentMovie.title}</h3>
              <button onClick={() => deleteMovie(currentMovie.movieId)}>Deletar</button>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h1>CRIAR NOVO FILME</h1>
        <CreateNewMovieForm />
      </section>
      <section>
        <h1>EDITAR NOVO FILME</h1>
      </section>
    </main>
  );
};
