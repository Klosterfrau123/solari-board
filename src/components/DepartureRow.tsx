import { FlipText } from './FlipText';
import type { Departure } from '@/types/transport';

interface DepartureRowProps {
  departure: Departure;
  index: number;
}

function formatTime(iso: string | null): string {
  if (!iso) return '--:--';
  const d = new Date(iso);
  return d.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' });
}

function formatDelay(delay: number | null): string {
  if (!delay || delay < 60) return '';
  return `+${Math.round(delay / 60)}'`;
}

export function DepartureRow({ departure, index }: DepartureRowProps) {
  const time = formatTime(departure.stop.departure);
  const delay = formatDelay(departure.stop.delay);
  const platform = departure.stop.prognosis.platform ?? departure.stop.platform ?? '-';
  const delayed = (departure.stop.delay ?? 0) > 60;

  return (
    <div
      className={`departure-row ${index % 2 === 0 ? 'departure-row-even' : 'departure-row-odd'}`}
      role="row"
    >
      {/* Train name */}
      <div className="departure-cell departure-name">
        <FlipText text={departure.name} length={8} />
      </div>

      {/* Destination */}
      <div className="departure-cell departure-destination">
        <FlipText text={departure.to} length={22} />
      </div>

      {/* Time + delay */}
      <div className="departure-cell departure-time">
        <FlipText text={time} length={5} />
        {delay && (
          <span className="departure-delay">{delay}</span>
        )}
      </div>

      {/* Platform */}
      <div className={`departure-cell departure-platform ${delayed ? 'departure-platform-changed' : ''}`}>
        <FlipText text={platform} length={3} />
      </div>
    </div>
  );
}
