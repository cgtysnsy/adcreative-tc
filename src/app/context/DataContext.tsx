"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Character } from "@/app/types";

export interface DataContextProps {
  characters: Character[];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  selectedCharacters: Character[];
  setSelectedCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredCharacters: Character[];
  setFilteredCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
}

export const DataContext = createContext<DataContextProps>(
  {} as DataContextProps,
);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

  useEffect(() => {
    setFilteredCharacters(
      characters.filter((character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [characters, searchQuery]);

  return (
    <DataContext.Provider
      value={{
        characters,
        setCharacters,
        selectedCharacters,
        setSelectedCharacters,
        isLoading,
        setIsLoading,
        error,
        setError,
        searchQuery,
        setSearchQuery,
        filteredCharacters,
        setFilteredCharacters,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
