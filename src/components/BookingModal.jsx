import { useEffect, useMemo, useState } from 'react';
import {
  Check,
  Copy,
  MapPin,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Users,
  X,
} from 'lucide-react';
import { toWhatsAppNumber, useTours } from '../context/ToursContext';

const GROUP_PREFERENCES = ['Family Group', 'Girls Group', 'Boys Group', 'Couple'];

function formatPKR(amount) {
  return `Rs. ${Number(amount || 0).toLocaleString('en-US')}`;
}

export default function BookingModal({ isOpen, selectedTour, tours, onClose }) {
  const { bookingContacts } = useTours();
  const whatsappNumbers = useMemo(
    () =>
      bookingContacts.map((phone, index) => ({
        label: phone,
        wa: toWhatsAppNumber(phone),
        primary: index === 0,
      })),
    [bookingContacts]
  );

  const [tourId, setTourId] = useState(selectedTour?.id || tours[0]?.id || '');
  const [packageMode, setPackageMode] = useState('Per Person');
  const [guestCount, setGuestCount] = useState(2);
  const [pickupCity, setPickupCity] = useState('Lahore');
  const [departureDate, setDepartureDate] = useState('');
  const [useCustomDate, setUseCustomDate] = useState(false);
  const [customDate, setCustomDate] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [groupTag, setGroupTag] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [selectedWa, setSelectedWa] = useState(whatsappNumbers[0]?.wa || '923154518185');
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (whatsappNumbers.length > 0 && !whatsappNumbers.some((item) => item.wa === selectedWa)) {
      setSelectedWa(whatsappNumbers[0].wa);
    }
  }, [whatsappNumbers, selectedWa]);

  const activeTour = useMemo(
    () => tours.find((t) => t.id === tourId) || tours[0],
    [tours, tourId]
  );

  // Sync defaults whenever modal opens or selectedTour prop changes
  useEffect(() => {
    if (!isOpen) return;
    const targetTour = selectedTour || tours[0];
    if (!targetTour) return;

    setTourId(targetTour.id);
    setPackageMode('Per Person');
    setPickupCity(targetTour.pickupCities?.[0] || 'Lahore');
    setDepartureDate(targetTour.upcomingDates?.[0] || targetTour.departureSchedule || '');
    setUseCustomDate(false);
    setCustomDate('');
    setValidationError('');
    setCopied(false);
  }, [isOpen, selectedTour, tours]);

  // Keep pickup city, package mode, and departure date valid when user switches tour inside dropdown
  const handleTourSelect = (nextId) => {
    setTourId(nextId);
    const nextTour = tours.find((t) => t.id === nextId);
    if (!nextTour) return;

    if (!nextTour.couplePricePKR && packageMode === 'Couple Package') {
      setPackageMode('Per Person');
    }
    if (nextTour.pickupCities && !nextTour.pickupCities.includes(pickupCity)) {
      setPickupCity(nextTour.pickupCities[0]);
    }
    setUseCustomDate(false);
    setDepartureDate(nextTour.upcomingDates?.[0] || nextTour.departureSchedule || '');
  };

  // Lock body scroll & support Escape key
  useEffect(() => {
    if (!isOpen) return undefined;

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
  }, [isOpen, onClose]);

  const hasCoupleOption = Boolean(activeTour?.couplePricePKR);
  const effectiveMode =
    packageMode === 'Couple Package' && hasCoupleOption ? 'Couple Package' : 'Per Person';

  const estimatedTotalPKR =
    effectiveMode === 'Couple Package'
      ? activeTour?.couplePricePKR || 0
      : (activeTour?.pricePKR || 0) * guestCount;

  const resolvedDate = useCustomDate
    ? customDate || 'Flexible / Custom Date'
    : departureDate || activeTour?.departureSchedule || 'Next Available Departure';

  const combinedNotes = [groupTag ? `Group Type: ${groupTag}` : null, specialNotes.trim() || null]
    .filter(Boolean)
    .join(' | ');

  const bookingMessage = useMemo(() => {
    if (!activeTour) return '';
    const guestsLine =
      effectiveMode === 'Couple Package'
        ? 'Couple Package (2 Guests)'
        : `Per Person (${guestCount} ${guestCount === 1 ? 'Guest' : 'Guests'})`;

    return [
      'Assalam-o-Alaikum Tourly.pk! I would like to reserve an expedition:',
      '',
      `*Package:* ${activeTour.title} (${activeTour.duration})`,
      `*Package Type:* ${guestsLine}`,
      `*Pickup City:* ${pickupCity}`,
      `*Preferred Departure:* ${resolvedDate}`,
      `*Estimated Total:* ${formatPKR(estimatedTotalPKR)}`,
      '',
      '*Traveler Details:*',
      `Name: ${guestName.trim() || 'Not provided'}`,
      `Phone / WhatsApp: ${guestPhone.trim() || 'Not provided'}`,
      combinedNotes ? `Notes: ${combinedNotes}` : null,
    ]
      .filter((line) => line !== null)
      .join('\n');
  }, [
    activeTour,
    effectiveMode,
    guestCount,
    pickupCity,
    resolvedDate,
    estimatedTotalPKR,
    guestName,
    guestPhone,
    combinedNotes,
  ]);

  const whatsappUrl = `https://wa.me/${selectedWa}?text=${encodeURIComponent(bookingMessage)}`;

  if (!isOpen || !activeTour) return null;

  const handleWhatsAppClick = (event) => {
    if (!guestName.trim() || !guestPhone.trim()) {
      event.preventDefault();
      setValidationError('Please enter your Full Name and Phone / WhatsApp Number before checking out.');
      return;
    }
    setValidationError('');
  };

  const handleCopyMessage = async () => {
    if (!guestName.trim() || !guestPhone.trim()) {
      setValidationError('Please enter your Full Name and Phone / WhatsApp Number to copy your booking summary.');
      return;
    }
    setValidationError('');
    try {
      await navigator.clipboard.writeText(bookingMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      setValidationError('Unable to access clipboard. You can use the Book via WhatsApp button directly.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-end bg-obsidian/75 backdrop-blur-sm sm:p-4 md:justify-center"
      onClick={onClose}
    >
      <div
        className="relative flex h-full w-full max-w-3xl flex-col overflow-hidden bg-alabaster shadow-2xl sm:max-h-[92vh] sm:rounded-2xl sm:border sm:border-bronze/35"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Obsidian & Deep Pine Slate Header */}
        <div className="shrink-0 border-b border-bronze/25 bg-obsidian px-6 py-5 text-white sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-bronze">
                Private Concierge & WhatsApp Checkout
              </p>
              <h2
                id="booking-modal-title"
                className="mt-1 font-display text-2xl font-semibold text-white sm:text-3xl"
              >
                Reserve Your Journey
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close booking dialog"
              className="rounded-full border border-white/15 bg-white/5 p-2 text-white/80 transition-colors hover:border-bronze hover:text-bronze cursor-pointer shrink-0"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Checkout Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 space-y-6">
          {/* 1. Package & Pricing Selection */}
          <div className="rounded-2xl border border-black/10 bg-surface p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-black/8 pb-3">
              <h3 className="font-display text-xl font-semibold text-obsidian">
                01. Package & Pricing Tier
              </h3>
              <span className="font-mono text-xs text-bronze tabular-nums">
                {activeTour.duration}
              </span>
            </div>

            <div>
              <label htmlFor="booking-tour" className="block text-xs font-medium text-obsidian">
                Select Expedition Package
              </label>
              <select
                id="booking-tour"
                value={activeTour.id}
                onChange={(e) => handleTourSelect(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 text-sm font-medium text-obsidian focus:border-bronze focus:outline-none cursor-pointer"
              >
                {tours.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title} — {t.duration} ({t.priceFormatted} / person)
                  </option>
                ))}
              </select>
            </div>

            {/* Pricing Mode & Passenger Stepper */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-end">
              <div>
                <span className="block text-xs font-medium text-obsidian">
                  Package Type
                </span>
                <div className="mt-1.5 grid grid-cols-2 gap-2 rounded-xl border border-black/10 bg-alabaster p-1">
                  <button
                    type="button"
                    onClick={() => setPackageMode('Per Person')}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all cursor-pointer ${
                      effectiveMode === 'Per Person'
                        ? 'bg-obsidian text-white shadow-xs'
                        : 'text-muted hover:text-obsidian'
                    }`}
                  >
                    Per Person
                  </button>
                  <button
                    type="button"
                    disabled={!hasCoupleOption}
                    onClick={() => hasCoupleOption && setPackageMode('Couple Package')}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                      !hasCoupleOption
                        ? 'cursor-not-allowed text-muted/45'
                        : effectiveMode === 'Couple Package'
                        ? 'bg-obsidian text-white shadow-xs cursor-pointer'
                        : 'text-muted hover:text-obsidian cursor-pointer'
                    }`}
                  >
                    Couple Package
                  </button>
                </div>
                {!hasCoupleOption && (
                  <p className="mt-1 text-[11px] text-muted">
                    Couple package is available on Murree & Swat Malam Jabba tours.
                  </p>
                )}
              </div>

              {effectiveMode === 'Per Person' ? (
                <div>
                  <span className="block text-xs font-medium text-obsidian">
                    Number of Travelers
                  </span>
                  <div className="mt-1.5 flex items-center justify-between rounded-xl border border-black/15 bg-alabaster px-3 py-1.5">
                    <button
                      type="button"
                      onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                      aria-label="Decrease traveler count"
                      className="rounded-lg p-1.5 text-obsidian transition-colors hover:bg-surface cursor-pointer"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-2 text-sm font-semibold text-obsidian tabular-nums">
                      <Users className="h-4 w-4 text-bronze" aria-hidden="true" />
                      <span>
                        {guestCount} {guestCount === 1 ? 'Person' : 'Persons'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setGuestCount((c) => Math.min(20, c + 1))}
                      aria-label="Increase traveler count"
                      className="rounded-lg p-1.5 text-obsidian transition-colors hover:bg-surface cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-bronze/40 bg-bronze/10 px-4 py-2.5">
                  <span className="block text-[11px] font-medium text-pine-slate">
                    Couple Package Selected
                  </span>
                  <span className="mt-0.5 block text-xs font-semibold text-obsidian">
                    Private Room & Transport for 2 Guests
                  </span>
                </div>
              )}
            </div>

            {/* Live Estimated Total Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-bronze/35 bg-pine-slate px-4 py-3.5 text-white">
              <div>
                <span className="block text-[11px] text-white/70">
                  Estimated Total ({effectiveMode === 'Couple Package' ? '1 Couple' : `${guestCount} × ${activeTour.priceFormatted}`})
                </span>
                <span className="font-mono text-xl font-semibold text-bronze tabular-nums">
                  {formatPKR(estimatedTotalPKR)}
                </span>
              </div>
              <span className="text-[11px] text-white/75">
                No advance card payment required online
              </span>
            </div>
          </div>

          {/* 2. Traveler & Trip Details Form */}
          <div className="rounded-2xl border border-black/10 bg-surface p-5 space-y-4">
            <div className="border-b border-black/8 pb-3">
              <h3 className="font-display text-xl font-semibold text-obsidian">
                02. Traveler & Departure Details
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="booking-guest-name" className="block text-xs font-medium text-obsidian">
                  Full Name <span className="text-copper">*</span>
                </label>
                <input
                  id="booking-guest-name"
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => {
                    setGuestName(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  placeholder="e.g., Hamza Malik"
                  className="mt-1.5 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 text-sm text-obsidian focus:border-bronze focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="booking-guest-phone" className="block text-xs font-medium text-obsidian">
                  Phone / WhatsApp Number <span className="text-copper">*</span>
                </label>
                <input
                  id="booking-guest-phone"
                  type="tel"
                  required
                  value={guestPhone}
                  onChange={(e) => {
                    setGuestPhone(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  placeholder="03XX-XXXXXXX"
                  className="mt-1.5 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 text-sm text-obsidian tabular-nums focus:border-bronze focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Pickup City */}
              <div>
                <label htmlFor="booking-pickup-city" className="flex items-center gap-1.5 text-xs font-medium text-obsidian">
                  <MapPin className="h-3.5 w-3.5 text-copper" aria-hidden="true" />
                  <span>Pickup City</span>
                </label>
                <select
                  id="booking-pickup-city"
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 text-sm text-obsidian focus:border-bronze focus:outline-none cursor-pointer"
                >
                  {(activeTour.pickupCities || ['Lahore', 'Islamabad', 'Rawalpindi']).map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Departure Date */}
              <div>
                <label htmlFor="booking-departure-date" className="block text-xs font-medium text-obsidian">
                  Preferred Departure Date
                </label>
                <select
                  id="booking-departure-date"
                  value={useCustomDate ? '__custom__' : departureDate}
                  onChange={(e) => {
                    if (e.target.value === '__custom__') {
                      setUseCustomDate(true);
                    } else {
                      setUseCustomDate(false);
                      setDepartureDate(e.target.value);
                    }
                  }}
                  className="mt-1.5 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 text-sm text-obsidian focus:border-bronze focus:outline-none cursor-pointer"
                >
                  {(activeTour.upcomingDates || [activeTour.departureSchedule]).map((dateOption) => (
                    <option key={dateOption} value={dateOption}>
                      {dateOption}
                    </option>
                  ))}
                  <option value="__custom__">Choose Custom Date...</option>
                </select>

                {useCustomDate && (
                  <input
                    type="date"
                    aria-label="Custom departure date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-bronze/50 bg-alabaster px-3.5 py-2 text-sm text-obsidian focus:border-bronze focus:outline-none"
                  />
                )}
              </div>
            </div>

            {/* Optional Group Preference & Special Notes */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label htmlFor="booking-notes" className="block text-xs font-medium text-obsidian">
                  Group Preference & Special Notes (Optional)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {GROUP_PREFERENCES.map((tag) => {
                    const isSelected = groupTag === tag;
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setGroupTag(isSelected ? '' : tag)}
                        className={`rounded-md border px-2 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'border-copper bg-copper/10 text-copper'
                            : 'border-black/10 bg-alabaster text-muted hover:text-obsidian'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              <textarea
                id="booking-notes"
                rows={2}
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="Extra room preference, front seat request, child seats, or private group notes..."
                className="mt-2 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 text-sm text-obsidian focus:border-bronze focus:outline-none"
              />
            </div>
          </div>

          {/* 3. Direct WhatsApp Line & Summary */}
          <div className="rounded-2xl border border-bronze/30 bg-obsidian p-5 text-white space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-medium text-bronze">
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Select Tourly.pk WhatsApp Desk</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {whatsappNumbers.map((item) => {
                  const isActive = selectedWa === item.wa;
                  return (
                    <button
                      key={item.wa}
                      type="button"
                      onClick={() => setSelectedWa(item.wa)}
                      className={`rounded-md border px-2.5 py-1 font-mono text-[11px] font-medium tabular-nums transition-colors cursor-pointer ${
                        isActive
                          ? 'border-bronze bg-pine-slate text-bronze'
                          : 'border-white/15 bg-white/5 text-white/75 hover:border-bronze/50'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <pre className="whitespace-pre-wrap rounded-xl border border-white/10 bg-pine-slate/50 p-3.5 font-sans text-xs leading-relaxed text-white/85">
              {bookingMessage}
            </pre>

            {validationError && (
              <p
                role="alert"
                className="rounded-lg border border-copper/50 bg-copper/15 px-3.5 py-2 text-xs font-medium text-white"
              >
                {validationError}
              </p>
            )}
          </div>
        </div>

        {/* Sticky Checkout Footer */}
        <div className="shrink-0 border-t border-black/10 bg-surface px-6 py-4 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="block text-[11px] text-muted">Estimated Total</span>
              <span className="font-mono text-lg font-semibold text-obsidian tabular-nums">
                {formatPKR(estimatedTotalPKR)}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/15 px-4 py-2.5 text-xs font-semibold text-obsidian transition-colors hover:border-bronze hover:bg-alabaster cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-pine-slate" aria-hidden="true" />
                    <span>Copied Message</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Copy Booking Message</span>
                  </>
                )}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="inline-flex items-center gap-2 rounded-full bg-copper px-6 py-2.5 text-xs font-semibold tracking-wide text-white shadow-sm transition-all duration-200 hover:bg-copper-hover hover:-translate-y-0.5 cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Book via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
