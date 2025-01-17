import SearchPanel from "@/components/search-panel";
import { getAllPokemon } from "@/lib/api";

export default async function Home() {
  const data = await getAllPokemon();
  return (
    <main className="max-w-[80ch] flex flex-col m-auto p-5 gap-9">
      <h1 className="font-bold text-3xl">Search Pokemon</h1>
      <SearchPanel pokemons={data} />
    </main>
  );
}
