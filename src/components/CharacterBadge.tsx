import { Character } from "@/app/types";
import React from "react";

const CharacterBadge: React.FC<{
  character: Character;
  onRemove: (id: number) => void;
}> = ({ character, onRemove }) => {
  return (
    <span className="m-1 flex items-center justify-between rounded-md bg-gray-100 px-2 py-1 text-[10px]">
      {character.name}
      <button
        onClick={() => onRemove(character.id)}
        className="ml-2 flex h-5 w-5 items-center justify-center rounded-md border bg-gray-700 text-center text-white hover:text-red-700"
      >
        ×
      </button>
    </span>
  );
};

export default CharacterBadge;
