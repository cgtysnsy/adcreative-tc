import CharactersList from "@/components/CharactersList";
import DataFetcher from "@/components/DataFetcher";
import SearchCharacter from "@/components/SearchCharacter";

export default function Home() {
  return (
    <main className="my-2 flex w-full flex-col items-center justify-center">
      <DataFetcher />
      <SearchCharacter />
      <CharactersList />
    </main>
  );
}
