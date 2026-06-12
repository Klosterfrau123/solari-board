'use client';

import { DepartureRow } from './DepartureRow';
import { useTransportData } from '@/hooks/useTransportData';

interface SolariBoardProps {
  stationName: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function SolariBoard({ stationName, isFavorite, onToggleFavorite }: SolariBoardProps) {
  const { departures, station, loading, error } = useTransportData(stationName);

  const now = new Date().toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="board">
      {/* Board header */}
      <div className="board-header">
        <div className="board-header-left">
          <span className="board-station">{station?.name ?? stationName}</span>
          <button
            onClick={onToggleFavorite}
            className="board-fav-btn"
            title={isFavorite ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>
        <span className="board-clock">{now}</span>
      </div>

      {/* Column headers */}
      <div className="board-columns">
        <span>Zug</span>
        <span>Richtung</span>
        <span>Abfahrt</span>
        <span>Gleis</span>
      </div>

      {/* Rows */}
      <div className="board-rows" role="table" aria-label="Abfahrten">
        {loading && departures.length === 0 && (
          <div className="board-message">Lade Abfahrten…</div>
        )}
        {error && (
          <div className="board-message board-error">{error}</div>
        )}
        {!loading && !error && departures.length === 0 && (
          <div className="board-message">Keine Abfahrten gefunden</div>
        )}
        {departures.map((dep, i) => (
          <DepartureRow key={`${dep.name}-${dep.stop.departure}-${i}`} departure={dep} index={i} />
        ))}
      </div>

      <div className="board-footer">
        Daten: transport.opendata.ch · Aktualisierung alle 30s
      </div>
    </div>
  );
}
