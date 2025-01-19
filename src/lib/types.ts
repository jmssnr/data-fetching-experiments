export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonDetail = {
  name: string;
  base_experience: number;
  sprites: { front_shiny: string };
  stats: {
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }[];
};

export type Issue = {
  url: string;
  id: number;
  number: number;
  title: string;
  user: { login: string; avatar_url: string; url: string };
  state: "open" | "closed";
};
