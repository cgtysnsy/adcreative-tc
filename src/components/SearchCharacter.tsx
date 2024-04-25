"use client";
import React, { useContext, useState } from "react";
import { DataContext } from "@/app/context/DataContext";
import CharacterBadge from "./CharacterBadge";
import { ChevronDown, ChevronUp } from "lucide-react";

const SearchCharacter: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCharacters,
    setSelectedCharacters,
  } = useContext(DataContext);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRemoveCharacter = (id: number) => {
    setSelectedCharacters((prev) =>
      prev.filter((character) => character.id !== id),
    );
  };
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  return (
    <div className="relative my-4 w-full max-w-[440px]">
      <div className="flex cursor-pointer items-center rounded border border-gray-300 px-2 py-1">
        <div className="flex flex-wrap items-center overflow-hidden">
          {selectedCharacters.slice(0, 2).map((character) => (
            <CharacterBadge
              key={character.id}
              character={character}
              onRemove={handleRemoveCharacter}
            />
          ))}
          {selectedCharacters.length > 2 && (
            <span className="text-[8px]">
              +{selectedCharacters.length - 2} more
            </span>
          )}
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search Characters..."
          className="flex-1 px-2 py-1 text-[12px] outline-none"
          style={{ minWidth: "100px" }}
        />
        {dropdownOpen ? (
          <ChevronUp
            onClick={toggleDropdown}
            className="rounded-full bg-gray-100"
          />
        ) : (
          <ChevronDown
            onClick={toggleDropdown}
            className="rounded-full bg-gray-100"
          />
        )}
      </div>
      {dropdownOpen && (
        <div className="absolute left-0 right-0 z-10 mt-1 rounded border border-gray-300 bg-white shadow-lg">
          {selectedCharacters.map((character) => (
            <CharacterBadge
              key={character.id}
              character={character}
              onRemove={handleRemoveCharacter}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchCharacter;
