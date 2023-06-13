import { FC } from "react";

interface IProps {
  id: number | null;
  pokemon: {
    name: string;
    url: string;
  };
}

export const PokemonCardDetails: FC<IProps> = ({ id, pokemon }) => (
    <div className="flex justify-center flex-col items-center bg-[#fff] p-4">
      <div>
        <img
          className="w-[100px] h-[100px]"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          alt="pokemon"
        />
      </div>

      <div className="flex items-center text-[#000] gap-2 mt-2">
        <div className="flex justify-center items-center bg-[skyblue] w-[45px] h-[45px] rounded-full">
          {id}
        </div>

        <div className="capitalize">{pokemon.name}</div>
      </div>
    </div>
  );
