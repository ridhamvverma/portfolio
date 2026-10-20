"use client";

import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";

type CreativeContextValue = {
  creative: boolean;
  setCreative: Dispatch<SetStateAction<boolean>>;
};

const CreativeContext = createContext<CreativeContextValue | null>(null);
const STORAGE_KEY = "creative-mode";

export function CreativeProvider({ children }: { children: React.ReactNode }) {
  const [creative, setCreative] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setCreative(localStorage.getItem(STORAGE_KEY) === "true");
    } catch {
      // Keep the switch usable when browser storage is unavailable.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, String(creative));
    } catch {
      // The in-memory preference still works without browser storage.
    }
  }, [creative, loaded]);

  return (
    <CreativeContext.Provider value={{ creative, setCreative }}>
      {children}
    </CreativeContext.Provider>
  );
}

export function useCreative() {
  const context = useContext(CreativeContext);
  if (!context) throw new Error("useCreative must be used inside CreativeProvider");
  return context;
}
