"use client";

import { Pokemon } from "@/lib/types";
import { useState } from "react";
import { Input } from "./ui/input";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

const ResultList = ({ pokemons }: { pokemons: Pokemon[] }) => {
  if (pokemons.length === 0) {
    return <p>No results found</p>;
  }
  return (
    <div className="grid grid-cols-4 gap-4">
      {pokemons.map((pokemon) => (
        <Card>
          <CardHeader>
            <CardTitle>{pokemon.name}</CardTitle>
          </CardHeader>
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
    .slice(0, 20);

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
        <ResultList pokemons={filtered} />
      )}
    </div>
  );
};

export default SearchPanel;
