"use client";
import React, { useContext, useState } from "react";
import { DataContext } from "@/app/context/DataContext";
import { List, ArrowKeyStepper } from "react-virtualized";
import "react-virtualized/styles.css";
import HighlightCharacterName from "./HighlightCharacterName";
import Image from "next/image";
import { Character } from "@/app/types";

type RowRendererProps = React.HTMLAttributes<HTMLDivElement> & {
  key: string;
  index: number;
  focusedRowIndex: number;
  isVisible: boolean;
  style: React.CSSProperties;
};
function CharactersList() {
  const {
    filteredCharacters,
    searchQuery,
    isLoading,
    error,
    selectedCharacters,
    setSelectedCharacters,
  } = useContext(DataContext);
  const rowCount = filteredCharacters.length;
  const [focusedRowIndex, setFocusedRowIndex] = useState(0);

  const selectCharacterHandler = (character: Character) => {
    setSelectedCharacters((prev) => {
      if (prev.some((c) => c.id === character.id)) {
        return prev.filter((c) => c.id !== character.id);
      } else {
        return [...prev, character];
      }
    });
  };

  const handleKeyboard = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowUp":
        if (focusedRowIndex > 0) {
          setFocusedRowIndex(focusedRowIndex - 1);
        }
        break;
      case "ArrowDown":
        if (focusedRowIndex < rowCount - 1) {
          setFocusedRowIndex(focusedRowIndex + 1);
        }
        break;
      case "Enter":
        selectCharacterHandler(filteredCharacters[focusedRowIndex]);
        break;
    }
  };

  function rowRenderer({
    key,
    index,
    style,
    isVisible,
    focusedRowIndex,
  }: RowRendererProps) {
    const character = filteredCharacters[index];
    const isSelected = selectedCharacters.some((c) => c.id === character.id);
    const isFocused = index === focusedRowIndex;
    const rowStyle = isFocused
      ? { ...style, backgroundColor: "#f0f0f0" }
      : style;
    return (
      <div
        key={key}
        style={rowStyle}
        tabIndex={index}
        className=" flex h-auto  min-h-[60px] cursor-pointer items-center space-x-2 border-b border-primary px-2 py-1"
        onClick={() => selectCharacterHandler(character)}
      >
        <input
          type="checkbox"
          checked={isSelected}
          id={`checkbox-${character.id}`}
          className="cursor-pointer"
        />
        <Image
          src={character.image}
          alt={character.name}
          width={50}
          height={50}
          className="rounded-lg"
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor={`checkbox-${character.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <HighlightCharacterName
              text={character.name}
              highlight={searchQuery}
            />
          </label>
          <p className="text-sm text-muted-foreground">
            {character.episode.length > 1
              ? `${character.episode.length} episodes`
              : `${character.episode.length} episode`}
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      className={
        searchQuery
          ? "w-full max-w-[400px] overflow-hidden rounded-lg border border-primary px-1 py-2"
          : "hidden"
      }
      tabIndex={0}
      onKeyDown={handleKeyboard}
    >
      <ArrowKeyStepper columnCount={1} rowCount={rowCount} mode="cells">
        {({ onSectionRendered, scrollToRow }) => (
          <List
            width={400}
            height={300}
            rowCount={rowCount}
            rowHeight={60}
            rowRenderer={(props) => rowRenderer({ ...props, focusedRowIndex })}
            scrollToIndex={focusedRowIndex}
            overscanRowCount={3}
          />
        )}
      </ArrowKeyStepper>
    </div>
  );
}

export default CharactersList;
