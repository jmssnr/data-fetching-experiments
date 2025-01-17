import { Pokemon } from "./types";

export const getAllPokemon = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=2000");
  const data = await response.json();
  return data.results as Pokemon[];
};
