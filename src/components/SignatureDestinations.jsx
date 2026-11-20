import { useState } from 'react';
import { ArrowUpRight, Mountain } from 'lucide-react';
import { REGIONS } from '../data/toursData';
import { useTours } from '../context/ToursContext';

function DestinationCard({ region, onSelect }) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onSelect(region.tourId)}
      className="group relative flex h-[430px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-black/10 bg-obsidian text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-bronze/80 hover:shadow-[0_24px_48px_rgba(13,15,18,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper cursor-pointer"
    >
      {/* Full-Bleed Scenic Photograph */}
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-obsidian via-pine-slate to-obsidian">
        {!imgError && region.imageUrl ? (
          <img
            src={region.imageUrl}
            alt={region.imageAlt}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 will-change-transform"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Mountain className="h-10 w-10 text-bronze/70" strokeWidth={1.25} aria-hidden="true" />
          </div>
        )}

        {/* Measured Dark Contrast Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 via-obsidian/40 to-obsidian/25 transition-opacity duration-500 group-hover:via-obsidian/50" />
      </div>

      {/* Top Architectural Metadata Row */}
      <div className="relative z-10 flex items-center justify-between gap-2 p-5">
        <span className="rounded-sm border border-bronze/45 bg-obsidian/75 px-2.5 py-1 font-mono text-[11px] font-medium text-bronze backdrop-blur-md tabular-nums">
          {region.elevation}
        </span>
        <span className="font-mono text-[11px] font-medium text-white/85 tabular-nums">
          {region.duration}
        </span>
      </div>

      {/* Bottom Editorial Copy & Hover Reveal CTA */}
      <div className="relative z-10 p-5 sm:p-6">
        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-bronze">
          {region.kicker}
        </p>

        <h3 className="mt-1.5 font-display text-2xl font-semibold leading-tight text-white sm:text-[1.7rem]">
          {region.name}
        </h3>

        <p className="mt-2.5 text-xs leading-relaxed text-white/80 line-clamp-2">
          {region.highlight}
        </p>

        {/* Subtle Hover Reveal Action Line */}
        <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-white/60">
              From
            </span>
            <span className="font-mono text-xs font-semibold text-white tabular-nums">
              {region.startingPrice}
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white transition-colors duration-200 group-hover:text-copper">
            <span>View Itinerary & Book</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 text-bronze transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-copper"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </button>
  );
}

export default function SignatureDestinations({ onSelectDestination }) {
  const { tours } = useTours();

  const liveRegions = REGIONS.map((region) => {
    const matched = tours.find((t) => t.id === region.tourId);
    if (!matched) return null;
    return {
      ...region,
      duration: matched.duration,
      startingPrice: matched.priceFormatted,
    };
  }).filter(Boolean);

  return (
    <section
      id="destinations"
      className="border-t border-black/8 bg-surface py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-bronze">
              Northern Valleys & Heritage Corridors
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-obsidian sm:text-4xl lg:text-[2.75rem]">
              Signature Destinations
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-muted">
            Select any mountain corridor below to inspect curated sightseeing stops, hotel
            standards, and upcoming weekly departures.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {liveRegions.map((region) => (
            <DestinationCard
              key={region.tourId}
              region={region}
              onSelect={onSelectDestination}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
