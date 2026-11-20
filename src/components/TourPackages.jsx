import { useState } from 'react';
import {
  ArrowUpRight,
  Calendar,
  Clock,
  MapPin,
  Mountain,
  RotateCcw,
} from 'lucide-react';

function TourCard({ tour, packageTypeFilter, onSelectPackage, onBookPackage }) {
  const [imgError, setImgError] = useState(false);
  const highlightCouple = packageTypeFilter === 'Couple Package';

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-bronze/35 bg-obsidian text-white shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:border-bronze hover:shadow-[0_24px_48px_rgba(13,15,18,0.28)]">
      {/* Scenic Editorial Image Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-obsidian via-pine-slate to-obsidian">
        {!imgError && tour.imageUrl ? (
          <img
            src={tour.imageUrl}
            alt={tour.imageAlt || tour.title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 will-change-transform"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 p-4 text-white/80">
            <Mountain className="h-7 w-7 text-bronze" strokeWidth={1.35} aria-hidden="true" />
            <span className="font-display text-base text-white">{tour.region}</span>
          </div>
        )}

        {/* Measured Dark Scrim */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/35 to-obsidian/20" />

        {/* Architectural Duration & Elevation Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 sm:top-3.5 sm:left-3.5 sm:right-3.5">
          <span className="inline-flex items-center gap-1 rounded-sm border border-bronze/45 bg-obsidian/80 px-2 py-1 text-[10px] font-medium text-bronze backdrop-blur-md sm:px-2.5 sm:text-[11px]">
            <Clock className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span className="tabular-nums whitespace-nowrap">{tour.duration}</span>
          </span>

          <span className="hidden rounded-sm border border-white/15 bg-obsidian/70 px-2 py-1 font-mono text-[10px] text-white/85 backdrop-blur-md tabular-nums sm:inline-block">
            {tour.elevation}
          </span>
        </div>

        {/* Bottom Image Editorial Title Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
          <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-bronze truncate sm:text-[11px]">
            {tour.region}
          </p>
          <h3 className="mt-0.5 font-display text-lg font-semibold leading-snug text-white sm:text-xl lg:text-[1.35rem]">
            {tour.title}
          </h3>
        </div>
      </div>

      {/* Editorial Logistics & Pricing Lower Panel */}
      <div className="flex flex-1 flex-col justify-between bg-pine-slate/45 p-3 sm:p-4 lg:p-5">
        <div>
          <p className="text-[11px] leading-relaxed text-white/75 line-clamp-2 sm:text-xs">
            {tour.tagline}
          </p>

          {/* Departure & Pickup Metadata */}
          <dl className="mt-3 space-y-2 border-t border-white/10 pt-3 text-[11px] text-white/80 sm:mt-4 sm:pt-3.5 sm:text-xs">
            <div className="flex items-start gap-1.5 sm:gap-2">
              <Calendar className="mt-0.5 h-3.5 w-3.5 text-bronze shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <dt className="sr-only">Departure Schedule</dt>
                <dd className="font-medium text-white truncate sm:whitespace-normal">
                  {tour.departureSchedule}
                </dd>
                {tour.upcomingDates && tour.upcomingDates.length > 0 && (
                  <p className="mt-0.5 font-mono text-[10px] text-bronze/90 tabular-nums truncate">
                    {tour.upcomingDates.join(' · ')}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-1.5 sm:gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 text-bronze shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <dt className="sr-only">Pickup Cities</dt>
                <dd className="text-white/75 truncate sm:whitespace-normal">
                  {tour.pickupLabel}
                </dd>
              </div>
            </div>
          </dl>
        </div>

        {/* Pricing & Action Footer */}
        <div className="mt-4 border-t border-white/10 pt-3.5 sm:mt-5 sm:pt-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
            <div
              className={`rounded-lg border px-2.5 py-2 transition-colors ${
                !highlightCouple
                  ? 'border-bronze/55 bg-obsidian/70'
                  : 'border-white/10 bg-obsidian/40'
              }`}
            >
              <span className="block text-[10px] font-medium text-white/60">
                Per Person
              </span>
              <span className="mt-0.5 block font-mono text-xs font-semibold text-white tabular-nums sm:text-sm">
                {tour.priceFormatted}
              </span>
            </div>

            <div
              className={`rounded-lg border px-2.5 py-2 transition-colors ${
                highlightCouple && tour.couplePriceFormatted
                  ? 'border-bronze bg-bronze/20'
                  : 'border-white/10 bg-obsidian/40'
              }`}
            >
              <span className="block text-[10px] font-medium text-white/60">
                Couple Package
              </span>
              {tour.couplePriceFormatted ? (
                <span className="mt-0.5 block font-mono text-xs font-semibold text-bronze tabular-nums sm:text-sm">
                  {tour.couplePriceFormatted}
                </span>
              ) : (
                <span className="mt-0.5 block text-[11px] font-medium text-white/65">
                  Per Person Only
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectPackage(tour)}
            className="group/btn mt-3.5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-bronze/40 bg-copper px-3 py-2.5 text-[11px] font-semibold tracking-wide text-white transition-all duration-200 hover:bg-copper-hover hover:border-bronze focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper sm:mt-4 sm:px-4 sm:text-xs cursor-pointer"
          >
            <span className="truncate">View Itinerary & Book</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 shrink-0 text-white transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={() => onBookPackage(tour)}
            className="mt-2 block w-full text-center text-[11px] font-medium text-bronze/90 transition-colors hover:text-white cursor-pointer"
          >
            Direct WhatsApp Checkout →
          </button>
        </div>
      </div>
    </article>
  );
}

export default function TourPackages({
  tours,
  filters,
  onResetFilters,
  onSelectPackage,
  onBookPackage,
}) {
  const hasActiveFilter =
    filters.pickupCity !== 'All' ||
    filters.departureDay !== 'All' ||
    filters.packageType !== 'All';

  const activeFilterSummary = [
    filters.pickupCity !== 'All' ? `Pickup: ${filters.pickupCity}` : null,
    filters.departureDay !== 'All' ? filters.departureDay : null,
    filters.packageType !== 'All' ? filters.packageType : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <section id="packages" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="flex flex-col gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-bronze">
            Curated Departures <span aria-hidden="true">·</span> 2026 Season
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-obsidian sm:text-4xl lg:text-[2.75rem]">
            Signature Highland Expeditions
          </h2>
          {hasActiveFilter && (
            <p className="mt-2 text-xs text-muted">
              Active filters:{' '}
              <span className="font-semibold text-copper">{activeFilterSummary}</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-5">
          <p className="text-sm text-muted tabular-nums">
            Showing {tours.length} {tours.length === 1 ? 'package' : 'packages'}
          </p>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/15 px-3.5 py-1.5 text-xs font-semibold text-obsidian transition-colors hover:border-copper hover:text-copper cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {tours.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-black/10 bg-surface p-12 text-center">
          <h3 className="font-display text-2xl font-semibold text-obsidian">
            No scheduled departures match that combination
          </h3>
          <p className="mt-2 text-sm text-muted">
            Adjust your pickup city, departure day, or package type above—or reset to view all curated departures.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-copper px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-copper-hover cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {tours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              packageTypeFilter={filters.packageType}
              onSelectPackage={onSelectPackage}
              onBookPackage={onBookPackage}
            />
          ))}
        </div>
      )}
    </section>
  );
}
