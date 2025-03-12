import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../../services/api";

export const InfoPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<{ movieId: string; title: string }[]>([]);

  useEffect(() => {
    async function getMovies() {
      const response = await api.get(`/movies/${movieId}`);

      setMovie(response.data);
      console.log(response.data);
    }

    getMovies();
  }, []);

  return <h1>Rota Info</h1>;
};
