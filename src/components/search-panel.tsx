"use client";

import { Pokemon } from "@/lib/types";
import { useState } from "react";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { usePokemon } from "@/hooks/use-pokemon";
import { useDebounce } from "@uidotdev/usehooks";

const ResultList = ({ pokemons }: { pokemons: Pokemon[] }) => {
  const { data, isPending, isError } = usePokemon(pokemons);

  if (pokemons.length === 0) {
    return <p>No results found</p>;
  }

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong!</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {data.map((pokemon) => (
        <Card>
          <CardHeader>
            <CardTitle>{pokemon?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={pokemon?.sprites.front_shiny} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const SearchPanel = ({ pokemons }: { pokemons: Pokemon[] }) => {
  const [value, setValue] = useState("");
  const searchTerm = useDebounce(value, 300);

  const filtered = pokemons
    .filter((pokemon) =>
      pokemon.name
        .toLowerCase()
        .trim()
        .includes(searchTerm.toLowerCase().trim())
    )
    .slice(0, 10);

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search..."
      />
      <Separator />
      {value === "" ? (
        <p>Enter a search term</p>
      ) : (
        <ResultList pokemons={filtered} />
      )}
    </div>
  );
};

export default SearchPanel;
