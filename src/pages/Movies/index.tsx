import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { Link } from "react-router";
import { UserContext } from "../../providers/UserContext";

export const MoviesPage = () => {
  const { userLogout, user } = useContext(UserContext);
  const [movies, setMovies] = useState<{ movieId: string; title: string }[]>([]);

  useEffect(() => {
    async function getMovies() {
      const response = await api.get("/movies");

      setMovies(response.data.data);
      console.log(response.data.data);
    }

    getMovies();
  }, []);

  return (
    <main>
      <header>
        <span>{user?.name}</span>
        <button onClick={() => userLogout()}>Logout</button>
      </header>
      <section>
        <ul>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <li key={movie.movieId}>
                <Link to={`/info/${movie.movieId}`}>{movie.title}</Link>
              </li>
            ))
          ) : (
            <li>{movies.length === 0 ? "Loading movies..." : "No movies available"}</li>
          )}
        </ul>
      </section>
    </main>
  );
};
