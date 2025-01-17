import { getPokemonDetail } from "@/lib/api";
import { Pokemon } from "@/lib/types";
import { useQueries } from "@tanstack/react-query";

export const usePokemon = (pokemons: Pokemon[]) => {
  return useQueries({
    queries: pokemons.map((pokemon) => {
      return {
        queryKey: ["pokemon", { pokemon }],
        queryFn: () => getPokemonDetail(pokemon.url),
      };
    }),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isPending: results.some((result) => result.isPending),
        isError: results.some((result) => result.isError),
      };
    },
  });
};
