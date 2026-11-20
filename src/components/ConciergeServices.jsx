import { useState } from 'react';
import {
  ArrowRight,
  Check,
  Compass,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { CONCIERGE_SERVICES, TRANSPORT_FLEET } from '../data/toursData';
import { toWhatsAppNumber, useTours } from '../context/ToursContext';

function FleetCard({ vehicle, onPlanTrip }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-bronze/30 bg-pine-slate/60 transition-all duration-300 hover:border-bronze/75 hover:bg-pine-slate">
      {/* Vehicle Photograph Frame */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian">
        {!imgError && vehicle.imageUrl ? (
          <img
            src={vehicle.imageUrl}
            alt={vehicle.imageAlt}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-obsidian via-pine-slate to-obsidian">
            <Truck className="h-10 w-10 text-bronze/75" strokeWidth={1.25} aria-hidden="true" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent" />

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
          <span className="rounded-sm border border-bronze/45 bg-obsidian/80 px-2.5 py-1 font-mono text-[11px] font-medium text-bronze backdrop-blur-md">
            {vehicle.classLabel}
          </span>
          <span className="font-mono text-xs font-medium text-white/90 tabular-nums">
            {vehicle.capacity}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[11px] font-medium text-bronze">
            {vehicle.idealFor}
          </p>
          <h4 className="mt-1 font-display text-2xl font-semibold text-white sm:text-[1.65rem]">
            {vehicle.name}
          </h4>
        </div>
      </div>

      {/* Specs & Description */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <p className="text-sm leading-relaxed text-white/75">
            {vehicle.summary}
          </p>

          <dl className="mt-5 grid grid-cols-1 gap-3 border-t border-white/10 pt-5 sm:grid-cols-2">
            {vehicle.specs.map((spec) => (
              <div
                key={spec.label}
                className="rounded-xl border border-white/10 bg-obsidian/45 px-3.5 py-2.5"
              >
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-bronze">
                  {spec.label}
                </dt>
                <dd className="mt-0.5 text-xs font-medium text-white/90">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs text-white/65">
            All road tolls & mountain taxes covered
          </span>
          <button
            type="button"
            onClick={onPlanTrip}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-copper transition-colors hover:text-white cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Book With Fleet</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ConciergeServices({ onPlanTrip }) {
  const { bookingContacts } = useTours();
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const activeService = CONCIERGE_SERVICES[activeIndex];

  return (
    <section
      id="services"
      className="border-t border-bronze/20 bg-obsidian py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Editorial Section Header */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-bronze">
              Hospitality Standards
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Concierge Expedition Services
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-white/70">
            Every departure pairs precision road logistics with warm Pakistani mountain hospitality—built for effortless group comfort.
          </p>
        </div>

        {/* Split-Editorial Interactive Showcase */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left: Large Visual Frame */}
          <div className="relative min-h-[380px] overflow-hidden rounded-2xl border border-bronze/30 bg-pine-slate lg:col-span-6 lg:min-h-[540px]">
            {CONCIERGE_SERVICES.map((service, idx) => {
              const isCurrent = idx === activeIndex;
              const hasFailed = Boolean(failedImages[service.id]);

              return (
                <div
                  key={service.id}
                  aria-hidden={!isCurrent}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    isCurrent
                      ? 'z-[2] opacity-100 scale-100'
                      : 'z-[1] opacity-0 scale-[1.03] pointer-events-none'
                  }`}
                >
                  {!hasFailed && service.imageUrl ? (
                    <img
                      src={service.imageUrl}
                      alt={service.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [service.id]: true }))
                      }
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-obsidian via-pine-slate to-obsidian">
                      <Compass className="h-12 w-12 text-bronze/70" strokeWidth={1.25} />
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-obsidian/95 via-obsidian/30 to-obsidian/20" />

            <div className="relative z-10 flex items-center justify-between p-6">
              <span className="rounded-sm border border-bronze/45 bg-obsidian/80 px-3 py-1 font-mono text-xs font-medium text-bronze backdrop-blur-md tabular-nums">
                {activeService.index} / 0{CONCIERGE_SERVICES.length}
              </span>
              <span className="text-xs font-medium text-white/80">
                Tourly.pk Standard
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-bronze">
                {activeService.subtitle}
              </p>
              <h3 className="mt-2 font-display text-3xl font-semibold text-white">
                {activeService.title}
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/80">
                {activeService.detail}
              </p>
            </div>
          </div>

          {/* Right: Interactive Architectural Service Selector */}
          <div className="flex flex-col justify-between gap-4 lg:col-span-6">
            <div className="space-y-4">
              {CONCIERGE_SERVICES.map((service, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-pressed={isActive}
                    className={`w-full rounded-2xl border p-6 text-left transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze ${
                      isActive
                        ? 'border-bronze/75 bg-pine-slate shadow-[0_16px_40px_rgba(0,0,0,0.35)]'
                        : 'border-white/10 bg-white/[0.03] hover:border-bronze/40 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-mono text-xs font-semibold tabular-nums ${
                              isActive ? 'text-bronze' : 'text-white/55'
                            }`}
                          >
                            {service.index}.
                          </span>
                          <span className="text-[11px] font-medium tracking-wide text-bronze/90">
                            {service.subtitle}
                          </span>
                        </div>

                        <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                          {service.title}
                        </h3>
                      </div>

                      <span
                        className={`mt-1 font-mono text-[11px] transition-colors ${
                          isActive ? 'text-copper' : 'text-white/40'
                        }`}
                      >
                        {isActive ? 'Selected' : 'Inspect'}
                      </span>
                    </div>

                    <p className="mt-2.5 text-sm leading-relaxed text-white/75">
                      {service.detail}
                    </p>

                    {isActive && (
                      <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                        {service.highlights.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2.5 text-xs text-white/85"
                          >
                            <Check
                              className="mt-0.5 h-3.5 w-3.5 text-bronze shrink-0"
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-2 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-white/75">
                  Customizing a private corporate, university, or family charter?
                </p>
                <button
                  type="button"
                  onClick={onPlanTrip}
                  className="group inline-flex items-center gap-2 rounded-full bg-copper px-5 py-2.5 text-xs font-semibold tracking-wide text-white transition-all duration-200 hover:bg-copper-hover hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Speak With Concierge</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-bronze">
                  <Phone className="h-3 w-3 shrink-0" aria-hidden="true" />
                  <span>Direct WhatsApp Desk:</span>
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {bookingContacts.map((phone) => (
                    <a
                      key={phone}
                      href={`https://wa.me/${toWhatsAppNumber(phone)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-white/15 bg-obsidian/60 px-2 py-0.5 font-mono text-[11px] text-white/85 tabular-nums transition-colors hover:border-bronze hover:text-bronze"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Luxury Transport Fleet Showcase Sub-Band */}
        <div className="mt-20 border-t border-white/10 pt-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-bronze">
                Executive Highland Fleet
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
                Coaster Saloon & Toyota Grand Cabin
              </h3>
            </div>

            {/* Departure Hubs & Safety Standards Strip */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-bronze shrink-0" aria-hidden="true" />
                <span>Departures: Lahore, Islamabad & Rawalpindi</span>
              </div>
              <span className="hidden text-white/30 sm:inline" aria-hidden="true">
                ·
              </span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-bronze shrink-0" aria-hidden="true" />
                <span>Experienced Alpine Drivers & First-Aid Kit Onboard</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-7 lg:grid-cols-2">
            {TRANSPORT_FLEET.map((vehicle) => (
              <FleetCard
                key={vehicle.id}
                vehicle={vehicle}
                onPlanTrip={onPlanTrip}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
