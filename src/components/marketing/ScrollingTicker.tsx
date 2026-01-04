import { useEffect, useRef } from 'react';
import { cn } from '~/lib/utils';

interface TickerItem {
  id: string;
  type: 'result' | 'upcoming';
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date?: string;
  time?: string;
  location?: string;
}

interface ScrollingTickerProps {
  items: TickerItem[];
  className?: string;
}

export function ScrollingTicker({ items, className }: ScrollingTickerProps) {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    const scroll = () => {
      if (ticker.scrollLeft >= ticker.scrollWidth / 2) {
        ticker.scrollLeft = 0;
      } else {
        ticker.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  // Duplicate items for seamless infinite scroll
  const duplicatedItems = [...items, ...items];

  return (
    <div className={cn('relative overflow-hidden border-y border-border/40 bg-charcoal py-2.5', className)}>
      <div ref={tickerRef} className="flex gap-8 overflow-hidden whitespace-nowrap">
        {duplicatedItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className="inline-flex items-center gap-3 px-4">
            {item.type === 'result' ? (
              <>
                <span className="rounded bg-destructive px-2 py-0.5 text-xs font-bold text-white">
                  FINAL
                </span>
                <span className="font-semibold text-white">{item.homeTeam}</span>
                <span className="text-2xl font-bold text-success">{item.homeScore}</span>
                <span className="text-white/60">-</span>
                <span className="text-2xl font-bold text-white">{item.awayScore}</span>
                <span className="font-semibold text-white">{item.awayTeam}</span>
              </>
            ) : (
              <>
                <span className="rounded bg-primary px-2 py-0.5 text-xs font-bold text-white">
                  {item.time}
                </span>
                <span className="font-semibold text-white">{item.homeTeam}</span>
                <span className="text-white/60">vs</span>
                <span className="font-semibold text-white">{item.awayTeam}</span>
                <span className="text-sm text-white/60">{item.location}</span>
              </>
            )}
            <span className="text-white/20">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
