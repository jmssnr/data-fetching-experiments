export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonDetail = {
  name: string;
  base_experience: number;
  sprites: { front_shiny: string };
};
