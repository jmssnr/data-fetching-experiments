"use client";

import { Pokemon } from "@/lib/types";
import { useState } from "react";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { usePokemon } from "@/hooks/use-pokemon";
import { useDebounce } from "@uidotdev/usehooks";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

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
            <Avatar className="h-20 w-20 border p-0">
              <AvatarImage src={pokemon?.sprites.front_shiny} />
              <AvatarFallback>{pokemon?.name}</AvatarFallback>
            </Avatar>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const SearchPanel = ({ pokemons }: { pokemons: Pokemon[] }) => {
  const [search, setSearch] = useState("");

  const filtered = pokemons
    .filter((pokemon) =>
      pokemon.name.toLowerCase().trim().includes(search.toLowerCase().trim())
    )
    .slice(0, 10);

  const debouncedFilter = useDebounce(filtered, 2000);

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search..."
      />
      <Separator />
      {search === "" ? (
        <p>Enter a search term</p>
      ) : (
        <ResultList pokemons={debouncedFilter} />
      )}
    </div>
  );
};

export default SearchPanel;
