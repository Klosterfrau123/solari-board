import { FlipChar } from './FlipChar';

interface FlipTextProps {
  text: string;
  length: number;
  className?: string;
}

export function FlipText({ text, length, className }: FlipTextProps) {
  const padded = text.toUpperCase().padEnd(length, ' ').slice(0, length);

  return (
    <span className={`flip-text ${className ?? ''}`}>
      {padded.split('').map((char, i) => (
        <FlipChar key={i} char={char} />
      ))}
    </span>
  );
}
