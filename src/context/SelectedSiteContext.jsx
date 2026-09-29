import { createContext, useContext, useMemo, useState } from "react";

const SelectedSiteContext = createContext(null);

export function SelectedSiteProvider({ children }) {
  const [selectedSiteId, setSelectedSiteId] = useState(null);

  const value = useMemo(() => ({ selectedSiteId, setSelectedSiteId }), [selectedSiteId]);

  return (
    <SelectedSiteContext.Provider value={value}>{children}</SelectedSiteContext.Provider>
  );
}

export function useSelectedSite() {
  const ctx = useContext(SelectedSiteContext);
  if (!ctx) {
    throw new Error("useSelectedSite must be used within a SelectedSiteProvider");
  }
  return ctx;
}
