'use client';

import { useState } from 'react';
import { SolariBoard } from '@/components/SolariBoard';
import { StationSearch } from '@/components/StationSearch';
import { useFavorites } from '@/hooks/useFavorites';

const DEFAULT_STATION = 'Zürich HB';

export default function Home() {
  const [station, setStation] = useState(DEFAULT_STATION);
  const { favorites, toggle, isFavorite } = useFavorites();

  return (
    <main style={{ padding: '32px 24px', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ marginBottom: 8 }}>
        <h1 style={{
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: 16,
        }}>
          Swiss Departure Board
        </h1>
        <StationSearch value={station} onSelect={setStation} favorites={favorites} />
      </div>

      <div style={{ marginTop: 28 }}>
        <SolariBoard
          stationName={station}
          isFavorite={isFavorite(station)}
          onToggleFavorite={() => toggle(station)}
        />
      </div>
    </main>
  );
}
