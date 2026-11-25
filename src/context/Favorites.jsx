import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'horizon:favorites';
const FavoritesContext = createContext(null);

function readStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [slugs, setSlugs] = useState(readStored);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } catch {
      /* storage unavailable — favourites stay in memory */
    }
  }, [slugs]);

  const toggle = useCallback((slug) => {
    setSlugs((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]
    );
  }, []);

  const value = useMemo(
    () => ({
      slugs,
      count: slugs.length,
      toggle,
      isFavorite: (slug) => slugs.includes(slug),
    }),
    [slugs, toggle]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used inside FavoritesProvider');
  return context;
}
