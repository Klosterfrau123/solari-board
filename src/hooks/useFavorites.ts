'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'solari-favorites';
const MAX = 5;

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const save = (next: string[]) => {
    setFavorites(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const add = (station: string) => {
    if (favorites.includes(station)) return;
    save([station, ...favorites].slice(0, MAX));
  };

  const remove = (station: string) => {
    save(favorites.filter((f) => f !== station));
  };

  const toggle = (station: string) => {
    favorites.includes(station) ? remove(station) : add(station);
  };

  return { favorites, toggle, isFavorite: (s: string) => favorites.includes(s) };
}
