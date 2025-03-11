import { Routes, Route } from "react-router";

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>Rota principal /</h1>} />
        <Route path="/signup" element={<h1>Rota de cadastro</h1>} />
        <Route path="/movies" element={<h1>Rota de filmes /</h1>} />
      </Routes>
    </div>
  );
};
