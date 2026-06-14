interface BoardSkeletonProps {
  rows?: number;
}

// Destination column widths vary per row so the placeholder reads as real data.
const DEST_WIDTHS = ['72%', '54%', '83%', '46%', '67%', '58%', '76%', '50%'];

export function BoardSkeleton({ rows = 8 }: BoardSkeletonProps) {
  return (
    <div aria-hidden="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div className="skeleton-row" key={i}>
          <span className="skeleton-block" style={{ width: 70 }} />
          <span className="skeleton-block" style={{ width: DEST_WIDTHS[i % DEST_WIDTHS.length] }} />
          <span className="skeleton-block" style={{ width: 46 }} />
          <span className="skeleton-block skeleton-block-end" style={{ width: 34 }} />
          <span className="skeleton-block skeleton-block-end" style={{ width: 24 }} />
        </div>
      ))}
    </div>
  );
}
