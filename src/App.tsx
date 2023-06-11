import "./App.css";
import { PokemonList } from "./pages/PokemonList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PokemonDetails } from "./pages/PokemonDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<PokemonList />} />
        <Route path="pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
