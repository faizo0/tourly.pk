import { useEffect, useState } from 'react';
import { ArrowUpRight, Lock, Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '../data/toursData';

const NAV_LINKS = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Curated Trips', href: '#packages' },
  { label: 'Traveler Stories', href: '#memories' },
  { label: 'Services', href: '#services' },
];

function BespokeEmblem() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className="h-6 w-6 shrink-0 text-bronze transition-transform duration-300 group-hover:scale-105"
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

export default function Navbar({ onPlanTrip, onOpenAdmin, isAdminAuthenticated }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3.5 z-40 px-4 sm:top-5 sm:px-6">
      <div className="pointer-events-auto mx-auto max-w-6xl">
        {/* Centered Floating Glassmorphic Pill Header */}
        <div
          className={`flex items-center justify-between gap-4 rounded-full border px-4 py-2 transition-all duration-300 backdrop-blur-xl sm:gap-6 sm:px-6 sm:py-2.5 ${
            scrolled
              ? 'border-bronze/35 bg-obsidian/90 shadow-[0_18px_48px_rgba(13,15,18,0.45)]'
              : 'border-white/15 bg-obsidian/65 shadow-[0_12px_36px_rgba(13,15,18,0.28)]'
          }`}
        >
          {/* Left: Bespoke Emblem + Wordmark */}
          <a
            href="#top"
            className="group flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze sm:text-2xl"
          >
            <BespokeEmblem />
            <span>{SITE_CONFIG.brandName}</span>
          </a>

          {/* Center: Clean Spaced Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-white/85"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className="relative py-1 transition-colors duration-200 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-bronze after:transition-all after:duration-200 hover:after:w-full whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Burnished Copper Pill CTA + Owner Lock Button + Mobile Drawer Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onPlanTrip}
              className="group hidden sm:inline-flex items-center gap-1.5 rounded-full bg-copper px-5 py-2 text-xs font-semibold tracking-wide text-white shadow-sm transition-all duration-200 hover:bg-copper-hover hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Reserve Journey</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </button>

            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                title="Owner Dashboard"
                aria-label="Owner Dashboard"
                className={`inline-flex items-center justify-center rounded-full border p-2 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze shrink-0 cursor-pointer ${
                  isAdminAuthenticated
                    ? 'border-bronze/75 bg-pine-slate text-bronze shadow-xs'
                    : 'border-white/15 bg-white/5 text-white/75 hover:border-bronze hover:text-bronze'
                }`}
              >
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex lg:hidden items-center justify-center rounded-full border border-white/15 bg-white/5 p-2 text-white transition-colors hover:border-bronze hover:text-bronze cursor-pointer"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Modern Glassmorphic Mobile Drawer */}
        {mobileOpen && (
          <div className="mt-2.5 rounded-2xl border border-bronze/30 bg-obsidian/95 p-5 shadow-2xl backdrop-blur-xl lg:hidden">
            <nav className="flex flex-col gap-3 text-sm font-medium text-white/90">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="rounded-lg px-3 py-2 transition-colors hover:bg-pine-slate hover:text-bronze"
                >
                  {link.label}
                </a>
              ))}

              <div className="mt-2 flex flex-col gap-2.5 border-t border-white/10 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onPlanTrip();
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-copper px-5 py-3 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-copper-hover cursor-pointer"
                >
                  <span>Reserve Journey</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>

                {onOpenAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      onOpenAdmin();
                    }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-bronze/35 bg-pine-slate/60 px-5 py-2.5 text-xs font-semibold tracking-wide text-bronze transition-colors hover:border-bronze hover:bg-pine-slate cursor-pointer"
                  >
                    <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{isAdminAuthenticated ? 'Owner Studio' : 'Owner Dashboard'}</span>
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
