import type { Station } from '@/types/transport';

// Shared station-name normalisation used by both favourites and search, so the
// same physical stop spelled differently ("Winterthur Hegi" vs "Winterthur,
// Hegi") collapses to one key — while distinct stops stay separate.
export const normStation = (s: string) =>
  s.toLowerCase().replace(/[.,]/g, ' ').replace(/\s+/g, ' ').trim();

export function dedupeStationsByName(list: Station[]): Station[] {
  const seen = new Set<string>();
  return list.filter((s) => {
    const key = normStation(s.name);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
