import { useContext } from "react";
import { UserContext } from "../../providers/UserContext";
import { MoviesContext } from "../../providers/MoviesContext";
import { CreateNewMovieForm } from "../../components/MovieCreateForm";
import { UserEditForm } from "../../components/UserUpdateForm";
import { MovieUpdateForm } from "../../components/MovieUpdateForm";

export const MoviesPage = () => {
  const { userLogout, userDelete, user } = useContext(UserContext);
  const { moviesList, movieDelete, modalMovieEdit, setmodalMovieEdit } = useContext(MoviesContext);

  return (
    <main>
      <header>
        <span>{user?.name}</span>
        <button onClick={() => userLogout()}>Logout</button>
        <button onClick={() => user?.userId && userDelete(user.userId)}>Deletar</button>
        <h2>Editar Usuário</h2>
        <UserEditForm />
      </header>
      <section>
        <h1>LISTA DE FILMES</h1>
        <ul>
          {moviesList?.map((currentMovie) => (
            <li key={currentMovie.movieId}>
              <h3>{currentMovie.title}</h3>
              <button onClick={() => setmodalMovieEdit(true)}>Editar</button>
              <button onClick={() => movieDelete(currentMovie.movieId)}>Deletar</button>
              {modalMovieEdit ? <MovieUpdateForm movie={currentMovie} /> : null}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h1>CRIAR NOVO FILME</h1>
        <CreateNewMovieForm />
      </section>
    </main>
  );
};
