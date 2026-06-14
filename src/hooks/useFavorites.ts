'use client';

import { useEffect, useState } from 'react';
import { normStation } from '@/lib/station';

const STORAGE_KEY = 'solari-favorites';
const MAX = 5;

// Compare on a normalised key so the same stop is never favourited twice — while
// genuinely different stations ("Winterthur" vs "Winterthur Hegi") stay apart.
const has = (list: string[], station: string) =>
  list.some((f) => normStation(f) === normStation(station));

const dedupe = (list: string[]) => {
  const seen = new Set<string>();
  return list.filter((f) => {
    const key = normStation(f);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed = dedupe(JSON.parse(stored));
      setFavorites(parsed);
      // Persist the cleaned list so pre-existing duplicates disappear.
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    } catch {
      // ignore
    }
  }, []);

  const save = (next: string[]) => {
    setFavorites(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const add = (station: string) => {
    if (has(favorites, station)) return;
    save([station, ...favorites].slice(0, MAX));
  };

  const remove = (station: string) => {
    save(favorites.filter((f) => normStation(f) !== normStation(station)));
  };

  const toggle = (station: string) => {
    if (has(favorites, station)) remove(station);
    else add(station);
  };

  return { favorites, toggle, isFavorite: (s: string) => has(favorites, s) };
}
