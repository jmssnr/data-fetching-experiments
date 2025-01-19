"use client";

import { usePokemon } from "@/hooks/use-pokemon";
import { Pokemon, PokemonDetail } from "@/lib/types";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "./ui/data-table";
import { Footprints, HeartIcon, Shield, SwordsIcon } from "lucide-react";

const columnHelper = createColumnHelper<PokemonDetail>();

const columns = [
  columnHelper.accessor("sprites.front_shiny", {
    header: "Sprite",
    cell: (info) => {
      const src = info.getValue();
      return (
        <img
          src={src}
          width={50}
          height={50}
          className="border rounded-full shadow-md"
        />
      );
    },
  }),
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor(
    (row) => row.stats.find((stat) => stat.stat.name == "hp"),
    {
      header: "Health",
      cell: (info) => {
        const value = info.getValue();
        return (
          <div className="flex gap-2">
            <p>{value?.base_stat}</p>
            <HeartIcon className="fill-red-500 w-5 h-5 stroke-red-700" />
          </div>
        );
      },
    }
  ),
  columnHelper.accessor(
    (row) => row.stats.find((stat) => stat.stat.name == "attack"),
    {
      header: "Attack",
      cell: (info) => {
        const value = info.getValue();
        return (
          <div className="flex gap-2">
            <p>{value?.base_stat}</p>
            <SwordsIcon className="fill-neutral-500 w-5 h-5 stroke-neutral-700" />
          </div>
        );
      },
    }
  ),
  columnHelper.accessor(
    (row) => row.stats.find((stat) => stat.stat.name == "defense"),
    {
      header: "Defense",
      cell: (info) => {
        const value = info.getValue();
        return (
          <div className="flex gap-2">
            <p>{value?.base_stat}</p>
            <Shield className="fill-blue-500 w-5 h-5 stroke-blue-700" />
          </div>
        );
      },
    }
  ),
  columnHelper.accessor(
    (row) => row.stats.find((stat) => stat.stat.name == "speed"),
    {
      header: "Speed",
      cell: (info) => {
        const value = info.getValue();
        return (
          <div className="flex gap-2">
            <p>{value?.base_stat}</p>
            <Footprints className="fill-green-500 w-5 h-5 stroke-green-700" />
          </div>
        );
      },
    }
  ),
];

const PokemonTable = ({ pokemons }: { pokemons: Pokemon[] }) => {
  const { data, isPending, isError } = usePokemon(pokemons.slice(0, 10));

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong!</p>;
  }
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PokemonTable;
