import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { PokemonCardDetails } from "../components/PokemonCardDetails";
import { Link } from "react-router-dom";
import { Pagination } from "../components/Pagination";

interface IPokemonProps {
  name: string;
  url: string;
}

export interface IPaginationProps {
  next: string;
  count: number;
  previous: string;
}

export const PokemonList = () => {
  const [pokemons, setPokemons] = useState<IPokemonProps[]>([]);
  const [pagination, setPagination] = useState<IPaginationProps>();
  const [paginationLimit, setPaginationLimit] = useState(20);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${paginationLimit}`)
      .then((result) => {
        setPokemons(result.data.results);
        delete result.data.results;
        setPagination(result.data);
      });
  }, [paginationLimit]);

  const handleNextPage = () => {
    if (pagination)
      axios.get(pagination.next).then((result) => {
        setPokemons(result.data.results);
        delete result.data.results;
        setPagination(result.data);
      });
  };

  const handlePrevPage = () => {
    if (pagination)
      axios.get(pagination.previous).then((result) => {
        setPokemons(result.data.results);
        delete result.data.results;
        setPagination(result.data);
      });
  };

  const handleOnPaginationLimitChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPaginationLimit(parseInt(e.target.value));

  return (
    <div>
      <h1 className="text-5xl mb-6">Pokemon API</h1>

      <Pagination
        pagination={pagination}
        paginationLimit={paginationLimit}
        handleOnPaginationLimitChange={handleOnPaginationLimitChange}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {pokemons.map((pokemon) => {
          const getPokemondId = pokemon.url.match(/\/pokemon\/(\d+)\//);
          const pokemonId = getPokemondId ? parseInt(getPokemondId[1]) : null;

          return (
            <Link to={`pokemon/${pokemonId?.toString()}`}>
              <PokemonCardDetails
                key={pokemonId}
                pokemon={pokemon}
                id={pokemonId}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
