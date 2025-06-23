import React, { createContext, useContext, useState } from "react";

export type PreferencesContextType = {
  league: string | null;
  setLeague: (league: string) => void;
  language: string;
  setLanguage: (language: string) => void;
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [league, setLeague] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>("en");

  return (
    <PreferencesContext.Provider value={{ league, setLeague, language, setLanguage }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error("usePreferences must be used within a PreferencesProvider");
  return context;
}
