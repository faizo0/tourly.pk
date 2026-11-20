import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Compass,
  MapPin,
  Minus,
  Mountain,
  Phone,
  X,
} from 'lucide-react';
import { toWhatsAppNumber, useTours } from '../context/ToursContext';

export default function PackageModal({ tour, onClose, onBook }) {
  const { bookingContacts } = useTours();
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [tour?.id]);

  useEffect(() => {
    if (!tour) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tour, onClose]);

  if (!tour) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="package-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-end bg-obsidian/75 backdrop-blur-sm sm:p-4 md:justify-center"
      onClick={onClose}
    >
      <div
        className="relative flex h-full w-full max-w-4xl flex-col overflow-hidden bg-alabaster shadow-2xl sm:max-h-[92vh] sm:rounded-2xl sm:border sm:border-bronze/35"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Obsidian & Deep Pine Slate Header Banner */}
        <div className="relative shrink-0 overflow-hidden bg-obsidian text-white">
          {!imgError && tour.imageUrl ? (
            <img
              src={tour.imageUrl}
              alt={tour.imageAlt || tour.title}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="absolute inset-0 h-full w-full object-cover opacity-35"
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-obsidian via-pine-slate to-obsidian"
            />
          )}

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-obsidian via-pine-slate/80 to-obsidian/65"
          />

          <div className="relative z-10 p-6 sm:px-8 sm:py-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-bronze">
                  <span>{tour.region}</span>
                  <span aria-hidden="true">·</span>
                  <span>{tour.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{tour.elevation}</span>
                </div>
                <h2
                  id="package-modal-title"
                  className="mt-2 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl"
                >
                  {tour.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close package details"
                className="rounded-full border border-white/15 bg-obsidian/60 p-2 text-white/85 backdrop-blur-md transition-colors hover:border-bronze hover:text-bronze cursor-pointer shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Key Logistics & Pricing Summary Strip */}
            <div className="mt-6 grid grid-cols-1 gap-3 border-t border-white/15 pt-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 text-bronze shrink-0" aria-hidden="true" />
                <div>
                  <span className="block text-[11px] text-white/65">Duration</span>
                  <span className="text-xs font-semibold text-white tabular-nums">
                    {tour.duration}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Calendar className="mt-0.5 h-4 w-4 text-bronze shrink-0" aria-hidden="true" />
                <div>
                  <span className="block text-[11px] text-white/65">Departures</span>
                  <span className="block text-xs font-semibold text-white">
                    {tour.departureSchedule}
                  </span>
                  {tour.upcomingDates && tour.upcomingDates.length > 0 && (
                    <span className="mt-0.5 block font-mono text-[11px] text-bronze tabular-nums">
                      {tour.upcomingDates.join(' · ')}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-bronze shrink-0" aria-hidden="true" />
                <div>
                  <span className="block text-[11px] text-white/65">Pickup Points</span>
                  <span className="text-xs font-semibold text-white">
                    {tour.pickupLabel}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mountain className="mt-0.5 h-4 w-4 text-bronze shrink-0" aria-hidden="true" />
                <div>
                  <span className="block text-[11px] text-white/65">Package Tariff</span>
                  <span className="block font-mono text-xs font-semibold text-bronze tabular-nums">
                    {tour.priceFormatted} / Person
                  </span>
                  {tour.couplePriceFormatted && (
                    <span className="block font-mono text-[11px] text-white/90 tabular-nums">
                      {tour.couplePriceFormatted} / Couple
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto px-6 py-7 sm:px-8 space-y-8">
          <div>
            <p className="text-sm leading-relaxed text-muted sm:text-[15px]">
              {tour.summary}
            </p>
          </div>

          {/* Sightseeing Highlights Grid */}
          <div>
            <div className="flex items-center justify-between gap-4 border-b border-black/10 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-pine-slate" aria-hidden="true" />
                <h3 className="font-display text-2xl font-semibold text-obsidian">
                  Sightseeing Highlights
                </h3>
              </div>
              <span className="font-mono text-xs text-muted tabular-nums">
                {tour.sightseeingSpots.length} curated stops
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {tour.sightseeingSpots.map((spot, idx) => (
                <div
                  key={spot.name}
                  className="flex items-start gap-3 rounded-xl border border-black/10 bg-surface px-3.5 py-3 transition-colors hover:border-bronze/70"
                >
                  <span className="font-mono text-[11px] font-medium text-bronze tabular-nums pt-0.5">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold leading-snug text-obsidian">
                      {spot.name}
                    </p>
                    {spot.note && (
                      <p className="mt-0.5 text-[11px] font-medium text-copper">
                        {spot.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Two-Column Services Comparison */}
          <div>
            <div className="border-b border-black/10 pb-3">
              <h3 className="font-display text-2xl font-semibold text-obsidian">
                Expedition Services & Logistics
              </h3>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Services Included */}
              <div className="rounded-xl border border-pine-slate/20 bg-pine-slate/[0.04] p-5">
                <div className="flex items-center justify-between border-b border-pine-slate/15 pb-3">
                  <h4 className="text-sm font-semibold text-pine-slate">
                    Services Included
                  </h4>
                  <span className="font-mono text-[11px] text-pine-slate/80 tabular-nums">
                    {tour.servicesIncluded.length} items
                  </span>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {tour.servicesIncluded.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs leading-relaxed text-obsidian"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 text-pine-slate shrink-0"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services Not Included */}
              <div className="rounded-xl border border-black/10 bg-surface p-5">
                <div className="flex items-center justify-between border-b border-black/10 pb-3">
                  <h4 className="text-sm font-semibold text-obsidian">
                    Services Not Included
                  </h4>
                  <span className="font-mono text-[11px] text-muted tabular-nums">
                    {tour.servicesNotIncluded.length} items
                  </span>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {tour.servicesNotIncluded.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs leading-relaxed text-muted"
                    >
                      <Minus
                        className="mt-0.5 h-4 w-4 text-bronze shrink-0"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Day-by-Day Route Plan */}
          <div>
            <div className="border-b border-black/10 pb-3">
              <h3 className="font-display text-2xl font-semibold text-obsidian">
                Day-by-Day Route Plan
              </h3>
            </div>

            <ol className="mt-4 space-y-3">
              {tour.itinerary.map((stop) => (
                <li
                  key={stop.day}
                  className="rounded-xl border border-black/10 bg-surface p-4"
                >
                  <p className="text-xs font-semibold text-pine-slate tabular-nums">
                    Day {String(stop.day).padStart(2, '0')} <span aria-hidden="true">·</span> {stop.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    {stop.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Direct Booking & WhatsApp Lines */}
          <div className="rounded-xl border border-bronze/30 bg-obsidian px-5 py-4 text-white">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-medium text-bronze">
                <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Direct Booking &amp; WhatsApp Desk</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {bookingContacts.map((phone) => (
                  <a
                    key={phone}
                    href={`https://wa.me/${toWhatsAppNumber(phone)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[11px] font-medium text-white/90 tabular-nums transition-colors hover:border-bronze hover:text-bronze"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Modal Footer CTA */}
        <div className="shrink-0 border-t border-black/10 bg-surface px-6 py-4 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <span className="block text-[11px] text-muted">Per Person</span>
                <span className="font-mono text-base font-semibold text-obsidian tabular-nums">
                  {tour.priceFormatted}
                </span>
              </div>

              {tour.couplePriceFormatted && (
                <div className="border-l border-black/10 pl-6">
                  <span className="block text-[11px] text-muted">Couple Package</span>
                  <span className="font-mono text-base font-semibold text-pine-slate tabular-nums">
                    {tour.couplePriceFormatted}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-black/15 px-4 py-2.5 text-xs font-medium text-obsidian transition-colors hover:bg-alabaster cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => onBook(tour)}
                className="group inline-flex items-center gap-2 rounded-full bg-copper px-6 py-2.5 text-xs font-semibold tracking-wide text-white shadow-sm transition-all duration-200 hover:bg-copper-hover hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Proceed to Booking</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
