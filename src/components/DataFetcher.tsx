"use client";
import React, { useContext, useEffect } from "react";
import { DataContext } from "@/app/context/DataContext";
import { getCachedCharacters, saveCharacters } from "@/app/utils/local-storage";
import { Character } from "../app/types";
const DataFetcher: React.FC = () => {
  const { setIsLoading, setCharacters, setError, searchQuery } =
    useContext(DataContext);

  useEffect(() => {
    if (!searchQuery) return;
    const fetchCharacters = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${searchQuery}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const rawData = data.results;
        setCharacters(rawData as Character[]);
        // saveCharacters(rawData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [searchQuery]);

  return null;
};

export default DataFetcher;
