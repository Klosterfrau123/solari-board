# Swiss Departure Board

**Live demo → [klosterfrau123.github.io/solari-board](https://klosterfrau123.github.io/solari-board/)**

A real-time Swiss public transport departure board with split-flap animation, built with Next.js and TypeScript. Data from [transport.opendata.ch](https://transport.opendata.ch).

## Features

- Split-flap (Solari) flip animation for every character
- Live clock that ticks every second
- Per-row countdown ("in X min / jetzt")
- Station search with autocomplete (250ms debounce)
- Favorites — saved to localStorage, max. 5
- Auto-refresh every 30 seconds
- Dark amber-on-black theme

## Tech

| | |
|---|---|
| Framework | Next.js 16 (App Router, static export) |
| Language | TypeScript |
| Animation | CSS 3D transforms (`rotateX`) |
| Data | [transport.opendata.ch v1 API](https://transport.opendata.ch/docs.html) |
| Hosting | GitHub Pages via GitHub Actions |

## Local Development

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Build & Export

```bash
npm run build        # local build
GITHUB_PAGES=true npm run build  # static export for GitHub Pages (output: out/)
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # root page — station state + favorites
│   └── globals.css       # all styles (no CSS framework)
├── components/
│   ├── SolariBoard.tsx   # board container, header, clock
│   ├── DepartureRow.tsx  # single departure row + countdown
│   ├── FlipText.tsx      # renders a fixed-width string as FlipChars
│   ├── FlipChar.tsx      # single character with CSS flip animation
│   └── StationSearch.tsx # combobox with debounced API search
└── hooks/
    ├── useTransportData.ts  # fetches stationboard, polls every 30s
    └── useFavorites.ts      # localStorage-backed favorite stations
```
