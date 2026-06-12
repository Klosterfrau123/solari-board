export interface Coordinate {
  type: string;
  x: number;
  y: number;
}

export interface Station {
  id: string | null;
  name: string;
  score: number | null;
  coordinate: Coordinate;
  distance: number | null;
}

export interface Prognosis {
  platform: string | null;
  arrival: string | null;
  departure: string | null;
  capacity1st: number | null;
  capacity2nd: number | null;
}

export interface Stop {
  station: Station;
  arrival: string | null;
  arrivalTimestamp: number | null;
  departure: string | null;
  departureTimestamp: number | null;
  delay: number | null;
  platform: string | null;
  prognosis: Prognosis;
  realtimeAvailability: string | null;
  location: Station;
}

export interface Departure {
  stop: Stop;
  name: string;
  category: string;
  subcategory: string | null;
  categoryCode: number;
  number: string;
  operator: string;
  to: string;
  passList: Stop[];
  capacity1st: number | null;
  capacity2nd: number | null;
}

export interface StationboardResponse {
  station: Station;
  stationboard: Departure[];
}

export interface LocationsResponse {
  stations: Station[];
}
