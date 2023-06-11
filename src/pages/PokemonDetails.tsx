import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "../components/Loader";
import { PokemonStats } from "../components/PokemonStats";
import { PokemonMoves } from "../components/PokemonMoves";

interface IPokenDetailProps {
  abilities: IAbilities[];
  base_experience: number;
  forms: IForms[];
  game_indeces: IGameIndeces[];
  height: number;
  held_items: unknown[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: IMoves[];
  name: string;
  order: number;
  past_types: unknown[];
  species: ISpecies;
  sprites: ISprites;
  stats: IStats[];
  types: ITypes[];
  weight: number;
}

interface IAbilities {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface IForms {
  name: string;
  url: string;
}

interface IGameIndeces {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

export interface IMoves {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
}

interface ISpecies {
  name: string;
  url: string;
}

interface ISprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    ["official-artwork"]: {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
  versions: {
    ["generation-i"]: {
      ["red-blue"]: {
        back_default: string | null;
        back_gray: string | null;
        back_transparent: string | null;
        front_default: string | null;
        front_gray: string | null;
        front_transparent: string | null;
      };
      yellow: {
        back_default: string | null;
        back_gray: string | null;
        back_transparent: string | null;
        front_default: string | null;
        front_gray: string | null;
        front_transparent: string | null;
      };
    };
    ["generation-ii"]: {
      crystal: {
        back_default: string | null;
        back_shiny: string | null;
        back_shiny_transparent: string | null;
        back_transparent: string | null;
        front_default: string | null;
        front_shiny: string | null;
        front_shiny_transparent: string | null;
        front_transparent: string | null;
      };
      gold: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
        front_transparent: string | null;
      };
      silver: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
        front_transparent: string | null;
      };
    };
    ["generation-iii"]: {
      emerald: {
        front_default: string | null;
        front_shiny: string | null;
      };
      ["firered-leafgreen"]: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
      ["ruby-sapphire"]: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
    };
    ["generation-iv"]: {
      ["diamond-pearl"]: {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      ["heartgold-soulsilver"]: {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      platinum: {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
    ["generation-v"]: {
      animated: {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      back_default: string | null;
      back_female: string | null;
      back_shiny: string | null;
      back_shiny_female: string | null;
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    ["generation-vi"]: {
      ["omegaruby-alphasapphire"]: {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      ["x-y"]: {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
    ["generation-vii"]: {
      icons: {
        front_default: string | null;
        front_female: string | null;
      };
      ["ultra-sun-ultra-moon"]: {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
    ["generation-viii"]: {
      icons: {
        front_default: string | null;
        front_female: string | null;
      };
    };
  };
}

export interface IStats {
  base_stat: number;
  effot: 0;
  stat: {
    name: string;
    url: 0;
  };
}

interface ITypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export const PokemonDetails: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemonDetail, setPokemonDetail] = useState<IPokenDetailProps>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((res) => {
      setPokemonDetail(res.data);
      setIsLoading(false);
    });
  }, [id]);

  const handleNextPokemon = () => {
    const pokemonId = id ? parseInt(id) + 1 : 1281;

    navigate(`/pokemon/${pokemonId}`);
  };

  const handlePreviousPokemon = () => {
    const pokemonId = id ? parseInt(id) - 1 : 1;

    if (pokemonId > 0) {
      navigate(`/pokemon/${pokemonId}`);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="rounded bg-[#fff] text-[#000] md:min-w-[1000px] text-lg">
      <div className="relative flex justify-center p-4 bg-[skyblue] rounded-t">
        <div className="absolute left-2 top-2">
          <div
            className="cursor-pointer rounded px-6 md:py-3 bg-[#fff]"
            onClick={handlePreviousPokemon}
          >
            Previous
          </div>
        </div>

        <img
          className="md:w-[300px] md:h-[300px]"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          alt="pokemon"
        />

        <div className="absolute right-2 top-2">
          <div
            className="cursor-pointer rounded px-6 md:py-3 bg-[#fff]"
            onClick={handleNextPokemon}
          >
            Next
          </div>
        </div>
      </div>

      <div className="px-6 py-4 text-left">
        <div>
          <div className="flex justify-center items-center gap-2">
            <h1 className="text-4xl text-center uppercase">
              {pokemonDetail?.name}
            </h1>
            <span className="flex justify-center items-center bg-[skyblue] w-[45px] h-[45px] rounded-full">
              {id}
            </span>
          </div>

          <div className="flex justify-center gap-10 py-4">
            <div className="px-2 text-center">
              <div>
                <div className="font-bold">Weight: </div>
                <span>{pokemonDetail?.weight}</span>
              </div>

              <div>
                <div className="font-bold">Height: </div>
                <span>{pokemonDetail?.height}</span>
              </div>

              <div>
                <div className="font-bold">Base Experience: </div>
                <span>{pokemonDetail?.base_experience}</span>
              </div>
            </div>

            <div>
              <div className="mb-2">
                <div className="font-bold">Type(s): </div>
                <ul className="list-disc pl-10">
                  {pokemonDetail?.types.map((type) => (
                    <li className="capitalize">{type.type.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-bold">Abilities: </div>
                <ul className="list-disc pl-10">
                  {pokemonDetail?.abilities.map((ability) => (
                    <li className="capitalize">{ability.ability.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <PokemonStats pokemonStats={pokemonDetail?.stats} />

        <PokemonMoves pokemonMoves={pokemonDetail?.moves} />
      </div>
    </div>
  );
};
