import { useContext } from "react";
import { UserContext } from "../../providers/UserContext";
import { MoviesContext } from "../../providers/MoviesContext";

export const MoviesPage = () => {
  const { userLogout, user } = useContext(UserContext);
  const { moviesList } = useContext(MoviesContext);

  return (
    <main>
      <header>
        <span>{user?.name}</span>
        <button onClick={() => userLogout()}>Logout</button>
      </header>
      <section>
        <ul>
          {moviesList?.map((currentMovie) => (
            <li key={currentMovie.movieId}>
              <h3>{currentMovie.title}</h3>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
