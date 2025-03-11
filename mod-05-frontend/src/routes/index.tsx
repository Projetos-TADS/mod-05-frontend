import { Routes, Route } from "react-router";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Rota principal /</h1>} />
      <Route path="/signup" element={<h1>Rota de cadastro</h1>} />
      <Route path="/movies" element={<h1>Rota de filmes /</h1>} />
    </Routes>
  );
};
