import { ArrowRight, ArrowUpRight, Lock, Mail, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../data/toursData';
import { toWhatsAppNumber, useTours } from '../context/ToursContext';

const INSTAGRAM_URL = 'https://www.instagram.com/p/Dfv2huxgRtb/';
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61592556306674';
const OFFICIAL_EMAIL = 'muhammadahsanislamg@gmail.com';

const DESTINATION_LINKS = [
  { label: 'Murree & Patriata Hills', target: '#destinations' },
  { label: 'Swat, Kalam & Malam Jabba', target: '#destinations' },
  { label: 'Azad Kashmir Winter Valleys', target: '#destinations' },
  { label: 'Kumrat & Neelum Gorge', target: '#destinations' },
  { label: 'Mahodand & Ushu Forest', target: '#packages' },
];

const HOSPITALITY_STANDARDS = [
  'Air-Conditioned Coaster Saloons',
  'Toyota Grand Cabins',
  'Curated Mountain Lodges',
  'Bonfire & BBQ Nights',
  'Experienced Tour Guides',
];

function formatPhoneDisplay(phone) {
  const digits = String(phone || '').replace(/[^\d]/g, '');
  if (digits.length === 11 && digits.startsWith('0')) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }
  return phone;
}

function BespokeFooterMark() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className="h-7 w-7 shrink-0 text-bronze"
    >
      <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.65" />
      <path
        d="M7.5 18.5L12.2 10.2L15.4 15.2L17.4 12.4L20.5 18.5H7.5Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <circle cx="17.8" cy="8.8" r="1.1" fill="#C86D51" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.65" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.65" />
      <circle cx="17.25" cy="6.75" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M14.5 21V13H17.2L17.6 9.8H14.5V7.8C14.5 6.9 14.8 6.2 16.1 6.2H17.7V3.3C17.4 3.3 16.4 3.2 15.2 3.2C12.7 3.2 11 4.7 11 7.5V9.8H8.3V13H11V21H14.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer({ onPlanTrip, onOpenAdmin, isAdminAuthenticated }) {
  const { bookingContacts } = useTours();

  const handleSmoothScroll = (event, targetSelector) => {
    event.preventDefault();
    const element = document.querySelector(targetSelector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="contact"
      className="mt-24 md:mt-32 relative bg-[#F9F8F6] text-alabaster"
    >
      {/* 1. Upper Editorial Pre-Footer CTA Block (Distinct Deep Pine Slate Frame) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-2xl border border-bronze/35 bg-pine-slate px-6 py-12 shadow-xl sm:rounded-3xl sm:px-10 md:py-16">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-bronze">
                Private &amp; Group Reservations <span aria-hidden="true">·</span> 2026 Season
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold leading-snug text-alabaster sm:text-3xl lg:text-[2.1rem]">
                Curated Northern Expeditions — From Murree Hills to Kalam &amp; Kashmir
              </h2>
            </div>

            <button
              type="button"
              onClick={onPlanTrip}
              className="group inline-flex items-center justify-center gap-2.5 self-start rounded-full bg-copper px-7 py-3.5 text-xs font-semibold tracking-wide text-white shadow-lg transition-all duration-200 hover:bg-copper-hover hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper whitespace-nowrap shrink-0 cursor-pointer lg:self-auto"
            >
              <span>Reserve Your Journey</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Distinct Light / Alabaster Band Separating Upper Slate Banner & Lower Obsidian Footer */}
      <div aria-hidden="true" className="bg-[#F9F8F6] py-6 md:py-10" />

      {/* 2. Main 4-Column Architectural Grid & Bottom Signature (Obsidian Charcoal Block) */}
      <div className="overflow-hidden border-t border-bronze/25 bg-obsidian text-alabaster">
        <div className="mx-auto max-w-7xl px-6 pt-16 md:pt-20 pb-12">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Column 1: Brand & Social Presence */}
          <div className="space-y-5">
            <a
              href="#top"
              onClick={(e) => handleSmoothScroll(e, '#top')}
              className="inline-flex items-center gap-2.5 font-display text-2xl font-semibold tracking-tight text-alabaster"
            >
              <BespokeFooterMark />
              <span>{SITE_CONFIG.brandName}</span>
            </a>

            <p className="text-xs leading-relaxed text-alabaster/75">
              Unforgettable Journeys Across Northern Pakistan — Family, Girls &amp; Boys Friendly Luxury Expeditions
            </p>

            {/* Interactive Social & Email Icon Buttons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tourly.pk on Instagram"
                title="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bronze/35 bg-pine-slate/60 text-alabaster/85 transition-all duration-200 hover:border-bronze hover:bg-copper hover:text-white hover:-translate-y-0.5"
              >
                <InstagramIcon />
              </a>

              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tourly.pk on Facebook"
                title="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bronze/35 bg-pine-slate/60 text-alabaster/85 transition-all duration-200 hover:border-bronze hover:bg-copper hover:text-white hover:-translate-y-0.5"
              >
                <FacebookIcon />
              </a>

              <a
                href={`mailto:${OFFICIAL_EMAIL}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Email ${OFFICIAL_EMAIL}`}
                title={OFFICIAL_EMAIL}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bronze/35 bg-pine-slate/60 text-alabaster/85 transition-all duration-200 hover:border-bronze hover:bg-copper hover:text-white hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <a
              href={`mailto:${OFFICIAL_EMAIL}`}
              className="inline-block text-xs font-medium text-bronze transition-colors hover:text-alabaster break-all"
            >
              {OFFICIAL_EMAIL}
            </a>
          </div>

          {/* Column 2: Signature Destinations */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-bronze">
              Signature Destinations
            </h3>
            <ul className="mt-5 space-y-3">
              {DESTINATION_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.target}
                    onClick={(e) => handleSmoothScroll(e, item.target)}
                    className="group inline-flex items-center gap-1.5 text-xs font-medium text-alabaster/80 transition-colors hover:text-bronze"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight
                      className="h-3 w-3 text-bronze/60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-copper"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Departure Hubs & Standards */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-bronze">
              Departure Hubs &amp; Standards
            </h3>

            <div className="mt-5 rounded-xl border border-bronze/25 bg-pine-slate/45 px-3.5 py-3">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold text-bronze">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Departure Cities</span>
              </p>
              <p className="mt-1 text-xs font-medium text-alabaster/90">
                Lahore, Islamabad &amp; Rawalpindi
              </p>
            </div>

            <ul className="mt-4 space-y-2">
              {HOSPITALITY_STANDARDS.map((standard) => (
                <li
                  key={standard}
                  className="flex items-center gap-2 text-xs text-alabaster/75"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-bronze/80 shrink-0" aria-hidden="true" />
                  <span>{standard}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: 24/7 WhatsApp & Booking Desk */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-bronze">
              24/7 WhatsApp &amp; Booking Desk
            </h3>

            <ul className="mt-5 space-y-2">
              {bookingContacts.map((phone) => (
                <li key={phone}>
                  <a
                    href={`https://wa.me/${toWhatsAppNumber(phone)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-bronze/25 bg-pine-slate/40 px-3.5 py-2 transition-colors hover:border-bronze hover:bg-pine-slate"
                  >
                    <span className="font-mono text-xs font-medium text-alabaster tabular-nums group-hover:text-bronze">
                      {formatPhoneDisplay(phone)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-bronze">
                      <MessageCircle className="h-3 w-3 text-copper" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-white/10 pt-3">
              <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-alabaster/55">
                Official Concierge Email
              </span>
              <a
                href={`mailto:${OFFICIAL_EMAIL}`}
                className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-alabaster/85 transition-colors hover:text-bronze break-all"
              >
                <Mail className="h-3.5 w-3.5 text-copper shrink-0" aria-hidden="true" />
                <span>{OFFICIAL_EMAIL}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Architectural Bottom Signature & Legal Bar */}
      <div className="mx-auto max-w-7xl px-6">
        {/* Oversized Architectural Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none overflow-hidden border-t border-bronze/15 pt-4 text-center"
        >
          <p className="font-display text-[clamp(3.25rem,13vw,10.5rem)] font-semibold leading-[0.86] tracking-[0.12em] text-bronze/[0.09]">
            TOURLY.PK
          </p>
        </div>

        {/* Bottom Legal & Navigation Strip */}
        <div className="flex flex-col gap-4 border-t border-bronze/20 py-6 text-xs text-alabaster/65 sm:flex-row sm:items-center sm:justify-between">
          <p className="leading-relaxed">
            © 2026 Tourly.pk — Unforgettable Journeys Pakistan. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href="#destinations"
              onClick={(e) => handleSmoothScroll(e, '#destinations')}
              className="transition-colors hover:text-bronze"
            >
              Destinations
            </a>
            <a
              href="#packages"
              onClick={(e) => handleSmoothScroll(e, '#packages')}
              className="transition-colors hover:text-bronze"
            >
              Packages
            </a>
            <a
              href="#services"
              onClick={(e) => handleSmoothScroll(e, '#services')}
              className="transition-colors hover:text-bronze"
            >
              Concierge
            </a>
            <button
              type="button"
              onClick={onPlanTrip}
              className="font-semibold text-copper transition-colors hover:text-alabaster cursor-pointer"
            >
              Book Now
            </button>

            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1 text-[11px] text-alabaster/45 transition-colors hover:text-bronze cursor-pointer"
              >
                <Lock className="h-3 w-3" aria-hidden="true" />
                <span>{isAdminAuthenticated ? 'Owner Studio' : 'Owner Portal'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
