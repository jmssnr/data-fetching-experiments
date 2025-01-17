import { Pokemon, PokemonDetail } from "./types";

export const getAllPokemon = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=2000");
  const data = await response.json();
  return data.results as Pokemon[];
};

export const getPokemonDetail = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error("Could not fetch pokemon detail");
  }
  const data = (await response.json()) as PokemonDetail;
  return data;
};
