import { Character } from "@/app/types";

type LocalStorageData = {
  expiresAt: Date;
  characters: Character[];
};

const DATA_KEY = "characters";

const isExpired = (expiresAt: Date): boolean => {
  const expiryTime = new Date(expiresAt).getTime();
  const currentTime = new Date().getTime();
  return expiryTime < currentTime;
};

export const getCachedCharacters = (): Character[] | null => {
  try {
    const rawData = localStorage.getItem(DATA_KEY);
    if (!rawData) {
      return null;
    }
    const data: LocalStorageData = JSON.parse(rawData);
    if (isExpired(data.expiresAt)) {
      localStorage.removeItem(DATA_KEY); // Clear expired data
      return null;
    }
    return data.characters;
  } catch (err) {
    console.error("Failed to parse characters from local storage:", err);
  }

  return null;
};

export const saveCharacters = (characters: Character[]): void => {
  const HOUR = 3600 * 1000; // Time in milliseconds
  const expiresAt = new Date(new Date().getTime() + 3 * HOUR); // Setting expiration to 3 hours

  const data: LocalStorageData = {
    expiresAt,
    characters,
  };
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
};
