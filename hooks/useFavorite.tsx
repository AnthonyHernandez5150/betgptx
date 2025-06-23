import React, { createContext, useContext, useState } from "react";

export type FavoriteContextType = {
  favoriteTeam: string | null;
  setFavoriteTeam: (team: string) => void;
  favoritePlayer: string | null;
  setFavoritePlayer: (player: string) => void;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favoriteTeam, setFavoriteTeam] = useState<string | null>(null);
  const [favoritePlayer, setFavoritePlayer] = useState<string | null>(null);

  return (
    <FavoriteContext.Provider
      value={{
        favoriteTeam,
        setFavoriteTeam,
        favoritePlayer,
        setFavoritePlayer,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (!context)
    throw new Error("useFavorite must be used within a FavoriteProvider");
  return context;
}
