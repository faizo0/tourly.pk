import { useState } from 'react';
import { Camera, MapPin, ShieldCheck, Star } from 'lucide-react';
import { GALLERY_FILTERS, TRAVELER_MEMORIES } from '../data/toursData';

function MemoryCard({ memory }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-bronze/35 bg-obsidian text-white shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:border-bronze hover:shadow-[0_24px_48px_rgba(13,15,18,0.28)]">
      {/* Editorial Photo Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-obsidian via-pine-slate to-obsidian">
        {!imgError && memory.imageUrl ? (
          <img
            src={memory.imageUrl}
            alt={memory.imageAlt}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 will-change-transform"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 p-4 text-white/80">
            <Camera className="h-6 w-6 text-bronze" strokeWidth={1.35} aria-hidden="true" />
            <span className="font-display text-base text-white">{memory.destinationLabel}</span>
          </div>
        )}

        {/* Measured Dark Scrim */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/35 to-obsidian/20" />

        {/* Top Badges Row */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 sm:top-3.5 sm:left-3.5 sm:right-3.5">
          <span className="inline-flex items-center gap-1 rounded-sm border border-bronze/45 bg-obsidian/80 px-2 py-1 text-[10px] font-medium tracking-wide text-bronze backdrop-blur-md sm:px-2.5 sm:text-[11px]">
            <ShieldCheck className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap">{memory.tripType}</span>
          </span>

          <span className="hidden rounded-sm border border-white/15 bg-obsidian/70 px-2 py-1 font-mono text-[10px] text-white/85 backdrop-blur-md tabular-nums sm:inline-block">
            {memory.rating.toFixed(1)} ★
          </span>
        </div>

        {/* Bottom Image Location Title Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
          <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-bronze truncate sm:text-[11px]">
            {memory.category}
          </p>
          <h3 className="mt-0.5 flex items-center gap-1.5 font-display text-base font-semibold leading-snug text-white sm:text-lg lg:text-[1.2rem]">
            <MapPin className="h-3.5 w-3.5 text-bronze shrink-0" aria-hidden="true" />
            <span className="truncate">{memory.destinationLabel}</span>
          </h3>
        </div>
      </div>

      {/* Deep Pine Slate Editorial Review Panel */}
      <div className="flex flex-1 flex-col justify-between bg-pine-slate/45 p-3 sm:p-4 lg:p-5">
        <div>
          {/* Structured Rating & Verified Strip */}
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5 sm:pb-3">
            <div
              className="flex items-center gap-0.5 sm:gap-1"
              aria-label={`${memory.rating} out of 5 stars`}
            >
              {Array.from({ length: memory.rating }).map((_, idx) => (
                <Star
                  key={idx}
                  className="h-3 w-3 fill-bronze text-bronze sm:h-3.5 sm:w-3.5"
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="font-mono text-[10px] font-medium text-bronze tabular-nums sm:text-[11px]">
              Verified Story
            </span>
          </div>

          {/* Authentic Traveler Quote */}
          <blockquote className="mt-3 text-[11px] leading-relaxed text-white/80 line-clamp-4 sm:mt-3.5 sm:text-xs sm:leading-relaxed lg:text-[13px]">
            “{memory.quote}”
          </blockquote>
        </div>

        {/* Structured Traveler Attribution Box */}
        <div className="mt-4 flex items-center justify-between gap-2 rounded-lg border border-bronze/25 bg-obsidian/65 px-2.5 py-2 sm:mt-5 sm:px-3 sm:py-2.5">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-white truncate sm:text-xs">
              {memory.travelerName}
            </p>
            <p className="mt-0.5 text-[10px] text-white/65 truncate sm:text-[11px]">
              {memory.city} <span aria-hidden="true">·</span> {memory.tripType}
            </p>
          </div>
          <span className="hidden rounded-sm bg-copper/20 border border-copper/40 px-1.5 py-0.5 font-mono text-[10px] font-medium text-copper shrink-0 xl:inline-block">
            {memory.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function TravelerGallery() {
  const [activeFilter, setActiveFilter] = useState('All Memories');

  const filteredMemories =
    activeFilter === 'All Memories'
      ? TRAVELER_MEMORIES
      : TRAVELER_MEMORIES.filter((item) => item.category === activeFilter);

  return (
    <section
      id="memories"
      className="border-t border-black/8 bg-canvas py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-6 border-b border-black/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-bronze">
              OUR COMMUNITY
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-obsidian sm:text-4xl lg:text-[2.75rem]">
              Moments Captured in the Mountains
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              Verified stories from trusted Family, Girls, and Boys group expeditions across
              Murree, Swat, Kalam, and Kashmir—crafted with safe transport, warm hospitality, and
              unhurried alpine pacing.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter traveler memories by destination"
            className="flex flex-wrap items-center gap-1.5 rounded-full border border-black/10 bg-surface p-1.5 self-start lg:self-end"
          >
            {GALLERY_FILTERS.map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab)}
                  className={`rounded-full px-3.5 py-2 text-xs font-semibold transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-obsidian text-white shadow-xs'
                      : 'text-muted hover:text-obsidian hover:bg-alabaster'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Editorial Grid: 2 cols mobile, 3 cols tablet, 4 cols desktop */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {filteredMemories.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} />
          ))}
        </div>
      </div>
    </section>
  );
}
