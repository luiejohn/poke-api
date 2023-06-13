import { FC } from "react";
import { IMoves } from "../pages/PokemonDetails";

interface IPokemonMoves {
  pokemonMoves?: IMoves[];
}

export const PokemonMoves: FC<IPokemonMoves> = ({ pokemonMoves }) => (
    <div>
      <h1 className="text-4xl text-center">Moves</h1>

      <div className="p-8">
        <ul className="flex flex-col flex-wrap md:h-[800px] list-disc">
          {pokemonMoves?.map((move) => (
            <li key={move.move.name} className="capitalize">
              {move.move.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
