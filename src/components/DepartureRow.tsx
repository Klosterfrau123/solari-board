import { FlipText } from './FlipText';
import type { Departure } from '@/types/transport';

interface DepartureRowProps {
  departure: Departure;
  index: number;
  now: Date;
}

function formatTime(iso: string | null): string {
  if (!iso) return '--:--';
  const d = new Date(iso);
  return d.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' });
}

function formatDelay(delay: number | null): string {
  // The opendata.ch API reports delay in minutes.
  if (!delay || delay < 1) return '';
  return `+${delay}'`;
}

function formatCountdown(iso: string | null, now: Date): string {
  if (!iso) return '';
  const diff = Math.round((new Date(iso).getTime() - now.getTime()) / 60000);
  if (diff < 0) return '';
  if (diff === 0) return 'jetzt';
  return `${diff}′`;
}

export function DepartureRow({ departure, index, now }: DepartureRowProps) {
  const time = formatTime(departure.stop.departure);
  const delay = formatDelay(departure.stop.delay);
  const countdown = formatCountdown(departure.stop.departure, now);
  const platform = departure.stop.prognosis.platform ?? departure.stop.platform ?? '-';
  const delayed = (departure.stop.delay ?? 0) >= 1;

  return (
    <div
      className={`departure-row ${index % 2 === 0 ? 'departure-row-even' : 'departure-row-odd'}`}
      role="row"
      style={{ '--row-index': index } as React.CSSProperties}
    >
      {/* Train name */}
      <div className="departure-cell departure-name">
        <FlipText text={departure.name} length={7} />
      </div>

      {/* Destination */}
      <div className="departure-cell departure-destination">
        <FlipText text={departure.to} length={18} />
      </div>

      {/* Scheduled time + delay */}
      <div className="departure-cell departure-time">
        <FlipText text={time} length={5} />
        {delay && (
          <span className="departure-delay">{delay}</span>
        )}
      </div>

      {/* Countdown (own column) */}
      <div className="departure-cell departure-eta">
        {countdown && (
          <span className="departure-countdown">{countdown}</span>
        )}
      </div>

      {/* Platform — width follows the value (e.g. "7" vs "41 / 42"), capped at 7 */}
      <div className={`departure-cell departure-platform ${delayed ? 'departure-platform-changed' : ''}`}>
        <FlipText text={platform} length={Math.min(Math.max(platform.length, 1), 7)} align="right" />
      </div>
    </div>
  );
}
