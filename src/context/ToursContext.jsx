import { createContext, useContext, useEffect, useState } from 'react';
import { COMMON_SERVICES_NOT_INCLUDED, SITE_CONFIG, TOURS_DATA } from '../data/toursData';

const PACKAGES_STORAGE_KEY = 'tourly_packages_v1';
const CONTACTS_STORAGE_KEY = 'tourly_contacts_v1';
const ADMIN_PASS_STORAGE_KEY = 'tourly_admin_pass_v1';
const ADMIN_SESSION_KEY = 'tourly_admin_session_v1';
const DEFAULT_ADMIN_PASSWORD = 'tourly2026';

const ToursContext = createContext(null);

export function formatPKR(amount) {
  const num = Number(amount);
  if (!Number.isFinite(num) || num <= 0) return 'Rs. 0';
  return `Rs. ${num.toLocaleString('en-US')}`;
}

export function normalizePhone(raw) {
  return String(raw || '').replace(/[^\d]/g, '').trim();
}

export function toWhatsAppNumber(phone) {
  const digits = normalizePhone(phone);
  if (!digits) return '';
  if (digits.startsWith('92')) return digits;
  if (digits.startsWith('0')) return `92${digits.slice(1)}`;
  return `92${digits}`;
}

function readStoredPackages() {
  try {
    const raw = window.localStorage.getItem(PACKAGES_STORAGE_KEY);
    if (!raw) return TOURS_DATA;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return TOURS_DATA;
  } catch {
    return TOURS_DATA;
  }
}

function readStoredContacts() {
  try {
    const raw = window.localStorage.getItem(CONTACTS_STORAGE_KEY);
    if (!raw) return SITE_CONFIG.bookingContacts;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return SITE_CONFIG.bookingContacts;
  } catch {
    return SITE_CONFIG.bookingContacts;
  }
}

function readStoredPassword() {
  try {
    const stored = window.localStorage.getItem(ADMIN_PASS_STORAGE_KEY);
    return stored && stored.trim() ? stored : DEFAULT_ADMIN_PASSWORD;
  } catch {
    return DEFAULT_ADMIN_PASSWORD;
  }
}

function readStoredSession() {
  try {
    return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function slugify(text) {
  return String(text || 'expedition')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeTourPayload(input, existingTour = null) {
  const title = String(input.title || existingTour?.title || 'Untitled Expedition').trim();
  const baseSlug = slugify(title) || `tour-${Date.now()}`;
  const id = existingTour?.id || input.id || `${baseSlug}-${Date.now().toString(36).slice(-4)}`;

  const pricePKR = Math.max(1000, Number(input.pricePKR ?? existingTour?.pricePKR ?? 15000));
  const rawCouple = input.couplePricePKR;
  const couplePricePKR =
    rawCouple !== '' && rawCouple !== null && rawCouple !== undefined && Number(rawCouple) > 0
      ? Number(rawCouple)
      : null;

  const pickupCities =
    Array.isArray(input.pickupCities) && input.pickupCities.length > 0
      ? input.pickupCities
      : existingTour?.pickupCities || ['Lahore', 'Islamabad'];

  const pickupLabel =
    input.pickupLabel?.trim() ||
    (pickupCities.length > 1
      ? `${pickupCities.slice(0, -1).join(', ')} & ${pickupCities[pickupCities.length - 1]}`
      : pickupCities[0]);

  const departureDays =
    Array.isArray(input.departureDays) && input.departureDays.length > 0
      ? input.departureDays
      : existingTour?.departureDays || ['Every Thursday'];

  const upcomingDates = Array.isArray(input.upcomingDates)
    ? input.upcomingDates.map((d) => String(d).trim()).filter(Boolean)
    : existingTour?.upcomingDates || [];

  const duration = String(input.duration || existingTour?.duration || '3 Days / 2 Nights').trim();
  const parsedDurationDays = Number(input.durationDays) || parseInt(duration, 10) || 3;

  const packageTypes = couplePricePKR ? ['Per Person', 'Couple Package'] : ['Per Person'];

  const sightseeingSpots = Array.isArray(input.sightseeingSpots) && input.sightseeingSpots.length > 0
    ? input.sightseeingSpots.map((spot) =>
        typeof spot === 'string'
          ? { name: spot.trim(), note: null }
          : { name: String(spot.name || '').trim(), note: spot.note || null }
      ).filter((s) => s.name)
    : existingTour?.sightseeingSpots || [{ name: title, note: null }];

  const servicesIncluded = Array.isArray(input.servicesIncluded) && input.servicesIncluded.length > 0
    ? input.servicesIncluded.map((s) => String(s).trim()).filter(Boolean)
    : existingTour?.servicesIncluded || ['Luxury Transport', 'Standard Accommodation', 'Breakfast & Dinner'];

  const servicesNotIncluded = Array.isArray(input.servicesNotIncluded) && input.servicesNotIncluded.length > 0
    ? input.servicesNotIncluded.map((s) => String(s).trim()).filter(Boolean)
    : existingTour?.servicesNotIncluded || COMMON_SERVICES_NOT_INCLUDED;

  const itinerary =
    Array.isArray(input.itinerary) && input.itinerary.length > 0
      ? input.itinerary
      : existingTour?.itinerary || [
          {
            day: 1,
            title: `Departure & Scenic Arrival — ${input.region || title}`,
            detail: `Depart from ${pickupLabel} toward ${title} with guided scenic stops, dinner, and hotel check-in.`,
          },
          {
            day: 2,
            title: 'Main Valley Exploration & Evening Bonfire',
            detail: `Explore key highlights including ${sightseeingSpots
              .slice(0, 4)
              .map((s) => s.name)
              .join(', ')} followed by bonfire and dinner.`,
          },
          ...(parsedDurationDays >= 3
            ? [
                {
                  day: 3,
                  title: 'Morning Leisure & Return Journey',
                  detail: `Breakfast overlooking the mountains followed by comfortable return to ${pickupLabel}.`,
                },
              ]
            : []),
        ];

  return {
    ...(existingTour || {}),
    id,
    slug: existingTour?.slug || baseSlug,
    title,
    region: String(input.region || existingTour?.region || 'Northern Pakistan').trim(),
    category: String(input.category || existingTour?.category || 'Curated Expedition').trim(),
    duration,
    durationDays: parsedDurationDays,
    departureSchedule: String(
      input.departureSchedule || existingTour?.departureSchedule || departureDays.join(' & ')
    ).trim(),
    departureDays,
    upcomingDates: upcomingDates.length > 0 ? upcomingDates : [departureDays.join(' & ')],
    pickupLabel,
    pickupCities,
    packageTypes,
    tags:
      Array.isArray(input.tags) && input.tags.length > 0
        ? input.tags
        : existingTour?.tags || ['Family Friendly', 'Girls Friendly', 'Boys Friendly'],
    pricePKR,
    priceFormatted: formatPKR(pricePKR),
    couplePricePKR,
    couplePriceFormatted: couplePricePKR ? formatPKR(couplePricePKR) : null,
    groupSize: String(input.groupSize || existingTour?.groupSize || '4 – 18 Guests').trim(),
    elevation: String(input.elevation || existingTour?.elevation || '2,400 m').trim(),
    accommodation: String(
      input.accommodation || existingTour?.accommodation || 'Standard Hotel Stay'
    ).trim(),
    tagline: String(
      input.tagline || existingTour?.tagline || `${title} — curated mountain expedition.`
    ).trim(),
    summary: String(
      input.summary ||
        existingTour?.summary ||
        `Curated ${duration} journey to ${title} departing from ${pickupLabel}.`
    ).trim(),
    sightseeingSpots,
    servicesIncluded,
    servicesNotIncluded,
    itinerary,
    imageUrl: String(
      input.imageUrl ||
        existingTour?.imageUrl ||
        '/src/assets/images/hero_slide_swat_kalam_1795205714141.jpg'
    ).trim(),
    imageAlt: String(input.imageAlt || existingTour?.imageAlt || title).trim(),
  };
}

export function ToursProvider({ children }) {
  const [tours, setTours] = useState(readStoredPackages);
  const [bookingContacts, setBookingContacts] = useState(readStoredContacts);
  const [adminPassword, setAdminPassword] = useState(readStoredPassword);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(readStoredSession);

  useEffect(() => {
    try {
      window.localStorage.setItem(PACKAGES_STORAGE_KEY, JSON.stringify(tours));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [tours]);

  useEffect(() => {
    try {
      window.localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(bookingContacts));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [bookingContacts]);

  useEffect(() => {
    try {
      window.localStorage.setItem(ADMIN_PASS_STORAGE_KEY, adminPassword);
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [adminPassword]);

  const updateTourPrice = (tourId, { pricePKR, couplePricePKR }) => {
    setTours((prev) =>
      prev.map((tour) => {
        if (tour.id !== tourId) return tour;
        const nextPrice = Math.max(1000, Number(pricePKR) || tour.pricePKR);
        const nextCouple =
          couplePricePKR !== '' &&
          couplePricePKR !== null &&
          couplePricePKR !== undefined &&
          Number(couplePricePKR) > 0
            ? Number(couplePricePKR)
            : null;
        return {
          ...tour,
          pricePKR: nextPrice,
          priceFormatted: formatPKR(nextPrice),
          couplePricePKR: nextCouple,
          couplePriceFormatted: nextCouple ? formatPKR(nextCouple) : null,
          packageTypes: nextCouple ? ['Per Person', 'Couple Package'] : ['Per Person'],
        };
      })
    );
  };

  const updateTourDates = (tourId, { departureSchedule, upcomingDates, departureDays }) => {
    setTours((prev) =>
      prev.map((tour) => {
        if (tour.id !== tourId) return tour;
        const cleanedDates = Array.isArray(upcomingDates)
          ? upcomingDates.map((d) => String(d).trim()).filter(Boolean)
          : tour.upcomingDates;
        return {
          ...tour,
          departureSchedule: departureSchedule?.trim() || tour.departureSchedule,
          upcomingDates: cleanedDates.length > 0 ? cleanedDates : tour.upcomingDates,
          departureDays:
            Array.isArray(departureDays) && departureDays.length > 0
              ? departureDays
              : tour.departureDays,
        };
      })
    );
  };

  const addTour = (input) => {
    const newTour = normalizeTourPayload(input, null);
    setTours((prev) => [newTour, ...prev]);
    return newTour;
  };

  const updateTour = (tourId, input) => {
    setTours((prev) =>
      prev.map((tour) => (tour.id === tourId ? normalizeTourPayload(input, tour) : tour))
    );
  };

  const deleteTour = (tourId) => {
    setTours((prev) => prev.filter((tour) => tour.id !== tourId));
  };

  const resetToursToDefault = () => {
    setTours(TOURS_DATA);
    try {
      window.localStorage.setItem(PACKAGES_STORAGE_KEY, JSON.stringify(TOURS_DATA));
    } catch {
      // Ignore storage quota errors cleanly
    }
  };

  const addBookingContact = (rawPhone) => {
    const cleaned = normalizePhone(rawPhone);
    if (!cleaned || cleaned.length < 10) return { ok: false, error: 'Enter a valid 11-digit number (e.g., 03060144206).' };
    if (bookingContacts.includes(cleaned)) {
      return { ok: false, error: 'That booking number is already listed.' };
    }
    setBookingContacts((prev) => [...prev, cleaned]);
    return { ok: true };
  };

  const removeBookingContact = (phone) => {
    if (bookingContacts.length <= 1) return;
    setBookingContacts((prev) => prev.filter((item) => item !== phone));
  };

  const setPrimaryBookingContact = (phone) => {
    setBookingContacts((prev) => [phone, ...prev.filter((item) => item !== phone)]);
  };

  const resetBookingContacts = () => {
    setBookingContacts(SITE_CONFIG.bookingContacts);
  };

  const loginAdmin = (candidate) => {
    if (String(candidate || '') === adminPassword) {
      setIsAdminAuthenticated(true);
      try {
        window.sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
      } catch {
        // Ignore session storage errors
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {
      // Ignore session storage errors
    }
  };

  const changeAdminPassword = (currentCandidate, nextPassword) => {
    if (String(currentCandidate || '') !== adminPassword) {
      return { ok: false, error: 'Current password is incorrect.' };
    }
    const trimmed = String(nextPassword || '').trim();
    if (trimmed.length < 4) {
      return { ok: false, error: 'New password must be at least 4 characters.' };
    }
    setAdminPassword(trimmed);
    return { ok: true };
  };

  const resetAdminPassword = () => {
    setAdminPassword(DEFAULT_ADMIN_PASSWORD);
  };

  return (
    <ToursContext.Provider
      value={{
        tours,
        bookingContacts,
        isAdminAuthenticated,
        defaultPassword: DEFAULT_ADMIN_PASSWORD,
        updateTourPrice,
        updateTourDates,
        addTour,
        updateTour,
        deleteTour,
        resetToursToDefault,
        addBookingContact,
        removeBookingContact,
        setPrimaryBookingContact,
        resetBookingContacts,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        resetAdminPassword,
      }}
    >
      {children}
    </ToursContext.Provider>
  );
}

export function useTours() {
  const ctx = useContext(ToursContext);
  if (!ctx) {
    throw new Error('useTours must be used inside a ToursProvider');
  }
  return ctx;
}
