import { FC } from "react";
import { IStats } from "../pages/PokemonDetails";

interface IPokemonStats {
  pokemonStats?: IStats[];
}

export const PokemonStats: FC<IPokemonStats> = ({ pokemonStats }) => (
  <div className="my-16">
    <h1 className="text-4xl text-center">Stats</h1>

    <div className="flex flex-wrap flex-col text-center md:max-h-[100px] gap-2 my-6">
      {pokemonStats &&
        pokemonStats.map((stat) => (
          <div key={stat.stat.name}>
            <div className="font-bold capitalize">{stat.stat.name}: </div>
            <span>{stat.base_stat}</span>
          </div>
        ))}
    </div>
  </div>
);
