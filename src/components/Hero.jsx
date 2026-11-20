import { useCallback, useEffect, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  RotateCcw,
  Search,
  ShieldCheck,
  Users,
} from 'lucide-react';
import {
  DEPARTURE_DAYS,
  PACKAGE_TYPES,
  PICKUP_CITIES,
  SITE_CONFIG,
  TRUST_MARKERS,
} from '../data/toursData';
import { useTours } from '../context/ToursContext';

const HERO_SLIDES = [
  {
    id: 'swat-kalam',
    title: 'Swat & Kalam Valley',
    caption: 'Lush green pine forests, crystal rivers, and traditional Swati mountain hospitality.',
    src: '/src/assets/images/hero_slide_swat_kalam_1795205714141.jpg',
    alt: 'Swat and Kalam Valley emerald pine forests beside a glacial river and traditional Swati pavilion',
  },
  {
    id: 'murree-patriata',
    title: 'Murree & Patriata Hills',
    caption: 'Misty pine-covered hills, scenic chairlifts, and cozy winter nights.',
    src: '/src/assets/images/hero_slide_murree_patriata_1795205714769.jpg',
    alt: 'Misty twilight ridges of Murree and Patriata cable cars glowing over pine forests',
  },
  {
    id: 'fairy-meadows',
    title: 'Fairy Meadows & Nanga Parbat',
    caption: 'Iconic alpine meadows, wooden huts, and snow-covered peaks.',
    src: '/src/assets/images/hero_slide_fairy_meadows_1795205714896.jpg',
    alt: 'Wooden mountain huts in Fairy Meadows facing the sunlit Rakhiot Face of Nanga Parbat',
  },
  {
    id: 'hunza-culture',
    title: 'Hunza Valley Culture',
    caption: 'Ancient Baltit/Altit fort architecture, terraced orchards, and vibrant Hunza cultural heritage.',
    src: '/src/assets/images/hero_karakoram_hills_1795204905424.jpg',
    alt: 'Historic Hunza stone fort perched above terraced apricot orchards and glacial river',
  },
  {
    id: 'skardu-desert',
    title: 'Skardu & Cold Desert',
    caption: 'Majestic Karakoram mountains, turquoise lakes, and Balti mountain culture.',
    src: '/src/assets/images/hero_slide_skardu_desert_1795205715074.jpg',
    alt: 'Golden Katpana Cold Desert dunes meeting turquoise lake and Balti settlement in Skardu',
  },
  {
    id: 'kashmir-neelum',
    title: 'Kashmir & Neelum Valley',
    caption: 'Wooden riverside cottages, snow-draped valleys, and serene mountain life.',
    src: '/src/assets/images/hero_slide_kashmir_neelum_1795205714179.jpg',
    alt: 'Wooden riverside cottages glowing softly in snowy Neelum Valley, Azad Kashmir',
  },
];

const SLIDE_INTERVAL_MS = 5000;

export default function Hero({
  filters,
  onFilterChange,
  onSearchSubmit,
  onResetFilters,
  matchingCount,
}) {
  const { tours } = useTours();
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [failedSlides, setFailedSlides] = useState({});

  const availableCities = Array.from(
    new Set([...PICKUP_CITIES, ...tours.flatMap((t) => t.pickupCities || [])])
  );
  const availableDepartureDays = Array.from(
    new Set([...DEPARTURE_DAYS, ...tours.flatMap((t) => t.departureDays || [])])
  );

  const goToSlide = useCallback((nextIdx) => {
    setActiveIndex((current) => {
      const resolved = (nextIdx + HERO_SLIDES.length) % HERO_SLIDES.length;
      if (resolved === current) return current;
      setPrevIndex(current);
      return resolved;
    });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      goToSlide(activeIndex + 1);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const handleScroll = () => {
      const y = Math.min(window.scrollY, 700);
      setScrollOffset(y * 0.16);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hasActiveFilter =
    filters.pickupCity !== 'All' ||
    filters.departureDay !== 'All' ||
    filters.packageType !== 'All';

  const activeSlide = HERO_SLIDES[activeIndex];

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit();
  };

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-obsidian pt-28 pb-10 text-white"
    >
      {/* Cinematic Cross-Fade + Ken Burns Slideshow Layer */}
      <div
        aria-hidden="true"
        style={{ transform: `translate3d(0, ${scrollOffset}px, 0) scale(1.04)` }}
        className="pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-br from-obsidian via-pine-slate to-obsidian will-change-transform"
      >
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === activeIndex;
          const isLeaving = idx === prevIndex;
          const shouldAnimate = isActive || isLeaving;
          const hasFailed = Boolean(failedSlides[slide.id]);

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
                isActive ? 'z-[2] opacity-100' : isLeaving ? 'z-[1] opacity-0' : 'z-0 opacity-0'
              }`}
            >
              {!hasFailed && (
                <img
                  src={slide.src}
                  alt={slide.alt}
                  referrerPolicy="no-referrer"
                  onError={() =>
                    setFailedSlides((prev) => ({ ...prev, [slide.id]: true }))
                  }
                  className={`h-full w-full object-cover object-center will-change-transform ${
                    shouldAnimate ? 'kenburns-active' : ''
                  }`}
                />
              )}
            </div>
          );
        })}

        {/* Obsidian Charcoal & Deep Pine Slate Contrast Scrim */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-b from-obsidian/75 via-obsidian/45 to-obsidian/95" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-r from-obsidian/80 via-pine-slate/35 to-transparent" />
      </div>

      {/* Main Focal Content + Slide Indicator */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-8 pt-10 lg:pb-10 lg:pt-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-sm font-medium tracking-wide text-bronze">
              <span className="inline-block h-[1px] w-8 bg-bronze/80" aria-hidden="true" />
              <span>{SITE_CONFIG.tagline}</span>
            </div>

            <h1 className="mt-5 font-display text-[clamp(2.65rem,5.2vw,4.75rem)] font-semibold leading-[1.04] tracking-tight text-white">
              {SITE_CONFIG.headline}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Private chauffeur-driven 4x4 convoys, restored heritage fort residences, and curated
              highland escapes across Hunza, Skardu, Fairy Meadows, and Swat.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={onSearchSubmit}
                className="group inline-flex items-center gap-3 rounded-full bg-copper px-7 py-3.5 text-sm font-semibold tracking-wide text-white shadow-lg transition-all duration-200 hover:bg-copper-hover hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Explore Packages</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Unboxed Typographic Trust Markers */}
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/15 pt-5 text-xs font-medium text-white/85 sm:text-sm">
              {TRUST_MARKERS.map((marker, idx) => (
                <div key={marker} className="flex items-center gap-2 whitespace-nowrap shrink-0">
                  <ShieldCheck
                    className="h-4 w-4 text-bronze"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span>{marker}</span>
                  {idx < TRUST_MARKERS.length - 1 && (
                    <span className="ml-3 text-white/30" aria-hidden="true">
                      ·
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Minimal Corner Slide Indicator & Manual Controls */}
          <div className="lg:max-w-xs lg:text-right">
            <div className="inline-flex flex-col gap-2.5 rounded-2xl border border-bronze/30 bg-obsidian/70 px-4 py-3.5 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-xs font-medium text-bronze tabular-nums">
                  {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  <span className="font-sans font-semibold text-white">
                    {activeSlide.title}
                  </span>
                </p>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => goToSlide(activeIndex - 1)}
                    aria-label="Previous destination slide"
                    className="rounded-full border border-white/15 p-1 text-white/80 transition-colors hover:border-bronze hover:text-bronze cursor-pointer"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToSlide(activeIndex + 1)}
                    aria-label="Next destination slide"
                    className="rounded-full border border-white/15 p-1 text-white/80 transition-colors hover:border-bronze hover:text-bronze cursor-pointer"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <p className="hidden text-left text-[11px] leading-relaxed text-white/75 sm:block">
                {activeSlide.caption}
              </p>

              {/* Clickable Slide Indicator Bars */}
              <div
                role="tablist"
                aria-label="Select destination backdrop"
                className="flex items-center gap-1.5 pt-0.5"
              >
                {HERO_SLIDES.map((slide, idx) => {
                  const isCurrent = idx === activeIndex;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={isCurrent}
                      aria-label={`Show ${slide.title}`}
                      onClick={() => goToSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        isCurrent
                          ? 'w-6 bg-copper'
                          : 'w-2 bg-white/30 hover:bg-bronze/75'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Smart Search & Filter Bar */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <form
          onSubmit={handleSubmit}
          aria-label="Smart Tour Filter"
          className="rounded-2xl border border-bronze/30 bg-obsidian/88 p-4 shadow-2xl backdrop-blur-xl sm:p-5"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:items-end">
            {/* Pickup City */}
            <div className="lg:col-span-3">
              <label
                htmlFor="filter-pickup-city"
                className="flex items-center gap-1.5 text-xs font-medium text-bronze"
              >
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Pickup City</span>
              </label>
              <div className="relative mt-1.5">
                <select
                  id="filter-pickup-city"
                  value={filters.pickupCity}
                  onChange={(e) => onFilterChange('pickupCity', e.target.value)}
                  className="w-full appearance-none rounded-xl border border-white/15 bg-pine-slate/85 py-2.5 pr-9 pl-3.5 text-sm font-medium text-white transition-colors hover:border-bronze/60 focus:border-bronze focus:outline-none cursor-pointer"
                >
                  <option value="All">All Pickup Cities</option>
                  {availableCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-white/60"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Departure Day */}
            <div className="lg:col-span-3">
              <label
                htmlFor="filter-departure-day"
                className="flex items-center gap-1.5 text-xs font-medium text-bronze"
              >
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Departure Day</span>
              </label>
              <div className="relative mt-1.5">
                <select
                  id="filter-departure-day"
                  value={filters.departureDay}
                  onChange={(e) => onFilterChange('departureDay', e.target.value)}
                  className="w-full appearance-none rounded-xl border border-white/15 bg-pine-slate/85 py-2.5 pr-9 pl-3.5 text-sm font-medium text-white transition-colors hover:border-bronze/60 focus:border-bronze focus:outline-none cursor-pointer"
                >
                  <option value="All">Any Weekly Departure</option>
                  {availableDepartureDays.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-white/60"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Package Type */}
            <div className="lg:col-span-3">
              <label
                htmlFor="filter-package-type"
                className="flex items-center gap-1.5 text-xs font-medium text-bronze"
              >
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Package Type</span>
              </label>
              <div className="relative mt-1.5">
                <select
                  id="filter-package-type"
                  value={filters.packageType}
                  onChange={(e) => onFilterChange('packageType', e.target.value)}
                  className="w-full appearance-none rounded-xl border border-white/15 bg-pine-slate/85 py-2.5 pr-9 pl-3.5 text-sm font-medium text-white transition-colors hover:border-bronze/60 focus:border-bronze focus:outline-none cursor-pointer"
                >
                  <option value="All">All Package Types</option>
                  {PACKAGE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-white/60"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Search Action */}
            <div className="flex items-center gap-2 lg:col-span-3">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-copper px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-copper-hover hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper whitespace-nowrap cursor-pointer"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                <span className="tabular-nums">Show {matchingCount} Journeys</span>
              </button>

              {hasActiveFilter && (
                <button
                  type="button"
                  onClick={onResetFilters}
                  title="Reset search filters"
                  aria-label="Reset search filters"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 p-2.5 text-white/80 transition-colors hover:border-bronze hover:text-bronze shrink-0 cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
