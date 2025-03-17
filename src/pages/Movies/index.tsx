import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/UserContext";
import { MovieContext } from "../../providers/MovieContext";
import { CreateNewMovieForm } from "../../components/MovieCreateForm";
import { UserEditForm } from "../../components/UserUpdateForm";
import { MovieUpdateForm } from "../../components/MovieUpdateForm";
import { CreateNewActorForm } from "../../components/ActorCreateForm";
import { ActorContext } from "../../providers/ActorContext";
import { ActorUpdateForm } from "../../components/ActorUpdateForm";
import { DirectorContext } from "../../providers/DirectorContext";
import { DirectorUpdateForm } from "../../components/DirectorUpdateForm";
import { CreateNewDirectorForm } from "../../components/DirectorCreateForm";

export const MoviesPage = () => {
  const {
    userLogout,
    userDelete,
    user,
    favoritesLoad,
    favoritesList,
    addMovieToFavorite,
    removeMovieFromFavorite,
  } = useContext(UserContext);
  const {
    moviesList,
    movieDelete,
    addActorToMovie,
    addDirectorToMovie,
    removeActorFromMovie,
    removeDirectorFromMovie,
    modalMovieEdit,
    setModalMovieEdit,
  } = useContext(MovieContext);
  const { actorsList, actorDelete, modalActorEdit, setModalActorEdit } = useContext(ActorContext);
  const { directorsList, directorDelete, modalDirectorEdit, setModalDirectorEdit } =
    useContext(DirectorContext);

  const [editingMovieId, setEditingMovieId] = useState("");
  const [editingActorId, setEditingActorId] = useState("");
  const [editingDirectorId, setEditingDirectorId] = useState("");

  const editingMovie = moviesList?.find((movie) => movie.movieId === editingMovieId);
  const editingActor = actorsList?.find((actor) => actor.actorId === editingActorId);
  const editingDirector = directorsList?.find(
    (director) => director.directorId === editingDirectorId
  );

  useEffect(() => {
    favoritesLoad();
  }, []);

  const handleRemoveFavorite = async (movieId: string) => {
    const favorite = favoritesList?.find((fav) => fav.movieId === movieId);
    if (favorite) {
      await removeMovieFromFavorite(favorite.favoriteMovieId);
      await favoritesLoad();
    }
  };

  const handleAddFavorite = async (movieId: string) => {
    await addMovieToFavorite(movieId);
    await favoritesLoad();
  };

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
        <h1>LISTA DE FILMES:</h1>
        <ul>
          {moviesList?.map((currentMovie) => (
            <li key={currentMovie.movieId}>
              <h3>
                {currentMovie.title}
                {favoritesList?.some((fav) => fav.movieId === currentMovie.movieId) ? (
                  <button
                    onClick={() => handleRemoveFavorite(currentMovie.movieId)}
                    title="Remover dos favoritos"
                  >
                    ⭐
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddFavorite(currentMovie.movieId)}
                    title="Adicionar aos favoritos"
                  >
                    ✩
                  </button>
                )}
              </h3>
              <h4>Lista de atores:</h4>
              <ul>
                {currentMovie.actors.map((currentActor) => (
                  <li key={currentActor.actorId}>
                    <h3>{currentActor.name}</h3>
                    <button onClick={() => removeActorFromMovie(currentActor.CastModel.castId)}>
                      Deletar Ator
                    </button>
                  </li>
                ))}
              </ul>
              <h4>Lista de Diretores:</h4>
              <ul>
                {currentMovie.directors.map((currentDirector) => (
                  <li key={currentDirector.directorId}>
                    <h3>{currentDirector.name}</h3>
                    <button
                      onClick={() =>
                        removeDirectorFromMovie(currentDirector.DirectorMovie.directorMovieId)
                      }
                    >
                      Deletar Diretor
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  setEditingMovieId(currentMovie.movieId);
                  setModalMovieEdit(true);
                }}
              >
                Editar
              </button>
              <button onClick={() => movieDelete(currentMovie.movieId)}>Deletar</button>
              <select
                onChange={(e) => {
                  const selectedActorId = e.target.value;
                  if (selectedActorId) {
                    addActorToMovie(currentMovie.movieId, selectedActorId);
                  }
                }}
              >
                <option value="">Adicionar Ator</option>
                {actorsList?.map((actor) => (
                  <option key={actor.actorId} value={actor.actorId}>
                    {actor.name}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => {
                  const selectedDirectorId = e.target.value;
                  if (selectedDirectorId) {
                    addDirectorToMovie(currentMovie.movieId, selectedDirectorId);
                  }
                }}
              >
                <option value="">Adicionar Diretor</option>
                {directorsList?.map((director) => (
                  <option key={director.directorId} value={director.directorId}>
                    {director.name}
                  </option>
                ))}
              </select>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h1>CRIAR NOVO FILME:</h1>
        <CreateNewMovieForm />
      </section>
      <section>
        <h1>EDITAR FILME:</h1>
        {modalMovieEdit && editingMovie && (
          <MovieUpdateForm
            movie={editingMovie}
            onClose={() => {
              setModalMovieEdit(false);
              setEditingMovieId("");
            }}
          />
        )}
      </section>
      <section>
        <h1>LISTA DE ATORES:</h1>
        <ul>
          {actorsList?.map((currentActor) => (
            <li key={currentActor.actorId}>
              <h3>{currentActor.name}</h3>
              <button
                onClick={() => {
                  setEditingActorId(currentActor.actorId);
                  setModalActorEdit(true);
                }}
              >
                Editar
              </button>
              <button onClick={() => actorDelete(currentActor.actorId)}>Deletar</button>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h1>EDITAR ATOR:</h1>
        {modalActorEdit && editingActor && (
          <ActorUpdateForm
            actor={editingActor}
            onClose={() => {
              setModalActorEdit(false);
              setEditingActorId("");
            }}
          />
        )}
      </section>
      <section>
        <h1>CRIAR NOVO ATOR:</h1>
        <CreateNewActorForm />
      </section>
      <section>
        <h1>LISTA DE DIRETORES:</h1>
        <ul>
          {directorsList?.map((currentDirector) => (
            <li key={currentDirector.directorId}>
              <h3>{currentDirector.name}</h3>
              <button
                onClick={() => {
                  setEditingDirectorId(currentDirector.directorId);
                  setModalDirectorEdit(true);
                }}
              >
                Editar
              </button>
              <button onClick={() => directorDelete(currentDirector.directorId)}>Deletar</button>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h1>EDITAR DIRETOR:</h1>
        {modalDirectorEdit && editingDirector && (
          <DirectorUpdateForm
            director={editingDirector}
            onClose={() => {
              setModalDirectorEdit(false);
              setEditingDirectorId("");
            }}
          />
        )}
      </section>
      <section>
        <h1>CRIAR NOVO DIRETOR:</h1>
        <CreateNewDirectorForm />
      </section>
    </main>
  );
};
