'use client';

import { useEffect, useRef, useState } from 'react';
import { searchStations } from '@/hooks/useTransportData';
import { dedupeStationsByName } from '@/lib/station';
import type { Station } from '@/types/transport';

const DEFAULT_STATIONS: Station[] = [
  'Zürich HB', 'Bern', 'Basel SBB', 'Genève', 'Lausanne',
  'Luzern', 'Winterthur', 'St. Gallen', 'Zug', 'Lugano',
].map((name) => ({ id: null, name, score: null, coordinate: { type: '', x: 0, y: 0 }, distance: null }));

interface StationSearchProps {
  value: string;
  onSelect: (station: string) => void;
  favorites: string[];
}

export function StationSearch({ value, onSelect, favorites }: StationSearchProps) {
  const [query, setQuery] = useState(value);
  const [prevValue, setPrevValue] = useState(value);
  const [results, setResults] = useState<Station[]>([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync the input back to the controlled `value` prop when it changes,
  // without an effect (avoids a cascading render).
  if (value !== prevValue) {
    setPrevValue(value);
    setQuery(value);
  }

  useEffect(() => {
    if (query.length < 2) return;

    // `active` guards against an out-of-order response from a stale query
    // overwriting the results of a newer one.
    let active = true;
    const id = setTimeout(async () => {
      const stations = await searchStations(query);
      if (active) setResults(dedupeStationsByName(stations).slice(0, 8));
    }, 250);

    return () => { active = false; clearTimeout(id); };
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (name: string) => {
    setQuery(name);
    setOpen(false);
    onSelect(name);
  };

  const handleFocus = () => {
    setOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setOpen(true);
  };

  const displayResults = query.length >= 2 && results.length > 0 ? results : DEFAULT_STATIONS;

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Station suchen…"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && query.length >= 2) handleSelect(query);
            if (e.key === 'Escape') setOpen(false);
          }}
          aria-label="Station suchen"
          autoComplete="off"
        />
        {query && (
          <button
            className="search-clear"
            onClick={() => { setQuery(''); setOpen(true); }}
            aria-label="Eingabe löschen"
          >
            ×
          </button>
        )}
      </div>

      {open && (
        <ul className="search-dropdown" role="listbox">
          {query.length < 2 && (
            <li className="search-dropdown-label">Beliebte Stationen</li>
          )}
          {displayResults.map((s) => (
            <li
              key={s.id ?? s.name}
              className={`search-option ${s.name === value ? 'search-option-active' : ''}`}
              role="option"
              aria-selected={s.name === value}
              onClick={() => handleSelect(s.name)}
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}

      {favorites.length > 0 && (
        <div className="search-favorites">
          {favorites.map((fav) => (
            <button
              key={fav}
              className={`fav-chip ${fav === value ? 'fav-chip-active' : ''}`}
              onClick={() => handleSelect(fav)}
            >
              ★ {fav}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
