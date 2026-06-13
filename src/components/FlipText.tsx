import { FlipChar } from './FlipChar';

interface FlipTextProps {
  text: string;
  length: number;
  align?: 'left' | 'right';
  className?: string;
}

export function FlipText({ text, length, align = 'left', className }: FlipTextProps) {
  const sliced = text.toUpperCase().slice(0, length);
  const padded = align === 'right'
    ? sliced.padStart(length, ' ')
    : sliced.padEnd(length, ' ');

  return (
    <span className={`flip-text ${className ?? ''}`}>
      {padded.split('').map((char, i) => (
        <FlipChar key={i} char={char} />
      ))}
    </span>
  );
}
