'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Departure, Station, StationboardResponse, LocationsResponse } from '@/types/transport';

const API_BASE = 'https://transport.opendata.ch/v1';
const POLL_INTERVAL = 30_000;

export function useTransportData(stationName: string) {
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [station, setStation] = useState<Station | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchDepartures = useCallback(async () => {
    if (!stationName) return;
    setError(null);

    try {
      const url = `${API_BASE}/stationboard?station=${encodeURIComponent(stationName)}&limit=12`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('API error');
      const data: StationboardResponse = await res.json();
      setStation(data.station);
      setDepartures(data.stationboard);
    } catch {
      setError('Verbindung fehlgeschlagen');
    } finally {
      setLoading(false);
    }
  }, [stationName]);

  useEffect(() => {
    if (!stationName) return;
    setLoading(true);
    fetchDepartures();

    timerRef.current = setInterval(fetchDepartures, POLL_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stationName, fetchDepartures]);

  return { departures, station, loading, error };
}

export async function searchStations(query: string): Promise<Station[]> {
  if (query.length < 2) return [];
  const res = await fetch(`${API_BASE}/locations?query=${encodeURIComponent(query)}&type=station`);
  if (!res.ok) return [];
  const data: LocationsResponse = await res.json();
  return data.stations.filter((s) => s.name);
}
