import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Check,
  Edit3,
  KeyRound,
  LogOut,
  Minus,
  Package,
  Phone,
  Plus,
  RotateCcw,
  Save,
  Shield,
  Sparkles,
  Trash2,
} from 'lucide-react';
import {
  COMMON_SERVICES_NOT_INCLUDED,
  DEPARTURE_DAYS,
  PICKUP_CITIES,
  TRUST_MARKERS,
} from '../data/toursData';
import { formatPKR, toWhatsAppNumber, useTours } from '../context/ToursContext';

const IMAGE_PRESETS = [
  { label: 'Swat & Kalam River', url: '/src/assets/images/hero_slide_swat_kalam_1795205714141.jpg' },
  { label: 'Swat Malam Jabba', url: '/src/assets/images/tour_swat_kalam_1795205084927.jpg' },
  { label: 'Murree & Patriata Hills', url: '/src/assets/images/tour_murree_patriata_1795205084505.jpg' },
  { label: 'Azad Kashmir Snow', url: '/src/assets/images/tour_kashmir_winter_1795205084521.jpg' },
  { label: 'Kumrat & Neelum Gorge', url: '/src/assets/images/tour_kumrat_neelum_1795205084098.jpg' },
  { label: 'Fairy Meadows & Nanga Parbat', url: '/src/assets/images/hero_slide_fairy_meadows_1795205714896.jpg' },
  { label: 'Hunza Valley Heritage', url: '/src/assets/images/hero_karakoram_hills_1795204905424.jpg' },
  { label: 'Skardu Cold Desert', url: '/src/assets/images/hero_slide_skardu_desert_1795205715074.jpg' },
];

const DEFAULT_INCLUDED_SERVICES = [
  'Luxury Transport (Air Conditioned Coaster Saloon / Toyota Grand Cabin)',
  'Standard Hotel Accommodation',
  'Breakfast & Dinner as per plan',
  'Bonfire & BBQ',
  'Experienced Tour Guide',
  'All kinds of tolls and taxes',
  'Basic First Aid Kit',
];

function createEmptyForm() {
  return {
    title: '',
    region: '',
    category: 'Curated Expedition',
    duration: '3 Days / 2 Nights',
    elevation: '2,400 m',
    groupSize: '4 – 18 Guests',
    accommodation: '2 Nights Standard Accommodation',
    pricePKR: '15000',
    couplePricePKR: '',
    pickupCities: ['Lahore', 'Islamabad'],
    customCity: '',
    departureSchedule: 'Every Thursday',
    departureDays: ['Every Thursday'],
    upcomingDatesText: '26-11-2026, 30-11-2026',
    tags: ['Family Friendly', 'Girls Friendly', 'Boys Friendly'],
    imageUrl: IMAGE_PRESETS[0].url,
    tagline: '',
    summary: '',
    spotsText: '',
    includedText: DEFAULT_INCLUDED_SERVICES.join('\n'),
    excludedText: COMMON_SERVICES_NOT_INCLUDED.join('\n'),
  };
}

function tourToForm(tour) {
  return {
    title: tour.title || '',
    region: tour.region || '',
    category: tour.category || 'Curated Expedition',
    duration: tour.duration || '3 Days / 2 Nights',
    elevation: tour.elevation || '2,400 m',
    groupSize: tour.groupSize || '4 – 18 Guests',
    accommodation: tour.accommodation || 'Standard Hotel Stay',
    pricePKR: String(tour.pricePKR || 15000),
    couplePricePKR: tour.couplePricePKR ? String(tour.couplePricePKR) : '',
    pickupCities: tour.pickupCities || ['Lahore', 'Islamabad'],
    customCity: '',
    departureSchedule: tour.departureSchedule || 'Every Thursday',
    departureDays: tour.departureDays || ['Every Thursday'],
    upcomingDatesText: (tour.upcomingDates || []).join(', '),
    tags: tour.tags || ['Family Friendly', 'Girls Friendly', 'Boys Friendly'],
    imageUrl: tour.imageUrl || IMAGE_PRESETS[0].url,
    tagline: tour.tagline || '',
    summary: tour.summary || '',
    spotsText: (tour.sightseeingSpots || [])
      .map((s) => (s.note ? `${s.name} | ${s.note}` : s.name))
      .join('\n'),
    includedText: (tour.servicesIncluded || []).join('\n'),
    excludedText: (tour.servicesNotIncluded || []).join('\n'),
  };
}

function QuickTourRow({ tour, onEditFull }) {
  const { updateTourPrice, updateTourDates, deleteTour } = useTours();
  const [priceDraft, setPriceDraft] = useState(String(tour.pricePKR));
  const [coupleDraft, setCoupleDraft] = useState(
    tour.couplePricePKR ? String(tour.couplePricePKR) : ''
  );
  const [scheduleDraft, setScheduleDraft] = useState(tour.departureSchedule || '');
  const [datesDraft, setDatesDraft] = useState((tour.upcomingDates || []).join(', '));
  const [savedNotice, setSavedNotice] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setPriceDraft(String(tour.pricePKR));
    setCoupleDraft(tour.couplePricePKR ? String(tour.couplePricePKR) : '');
    setScheduleDraft(tour.departureSchedule || '');
    setDatesDraft((tour.upcomingDates || []).join(', '));
  }, [tour]);

  const flashSaved = (label) => {
    setSavedNotice(label);
    window.setTimeout(() => setSavedNotice(''), 2000);
  };

  const stepPerPerson = (delta) => {
    const next = Math.max(1000, Number(priceDraft || tour.pricePKR) + delta);
    setPriceDraft(String(next));
    updateTourPrice(tour.id, {
      pricePKR: next,
      couplePricePKR: coupleDraft,
    });
    flashSaved('Price updated');
  };

  const stepCouple = (delta) => {
    const base = Number(coupleDraft || tour.couplePricePKR || tour.pricePKR * 2);
    const next = Math.max(2000, base + delta);
    setCoupleDraft(String(next));
    updateTourPrice(tour.id, {
      pricePKR: Number(priceDraft || tour.pricePKR),
      couplePricePKR: next,
    });
    flashSaved('Couple price updated');
  };

  const handleSaveInline = () => {
    updateTourPrice(tour.id, {
      pricePKR: Number(priceDraft) || tour.pricePKR,
      couplePricePKR: coupleDraft.trim() ? Number(coupleDraft) : null,
    });
    const parsedDates = datesDraft
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);
    updateTourDates(tour.id, {
      departureSchedule: scheduleDraft,
      upcomingDates: parsedDates,
    });
    flashSaved('Saved changes');
  };

  return (
    <article className="rounded-2xl border border-black/10 bg-surface p-5 shadow-xs transition-colors hover:border-bronze/60">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        {/* Left: Thumbnail + Metadata */}
        <div className="flex items-start gap-4 xl:max-w-sm">
          <img
            src={tour.imageUrl}
            alt={tour.title}
            className="h-20 w-24 shrink-0 rounded-xl border border-black/10 object-cover"
          />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-bronze">
              {tour.region} <span aria-hidden="true">·</span> {tour.duration}
            </p>
            <h3 className="mt-0.5 font-display text-xl font-semibold text-obsidian truncate">
              {tour.title}
            </h3>
            <p className="mt-1 text-xs text-muted truncate">{tour.pickupLabel}</p>
            {savedNotice && (
              <span className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-pine-slate px-2 py-0.5 text-[11px] font-medium text-bronze">
                <Check className="h-3 w-3" aria-hidden="true" />
                <span>{savedNotice}</span>
              </span>
            )}
          </div>
        </div>

        {/* Middle: Quick Price & Date Controls */}
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Per Person Price Quick Stepper */}
          <div className="rounded-xl border border-black/10 bg-alabaster p-3">
            <span className="block text-[11px] font-medium text-muted">
              Per Person Price (PKR)
            </span>
            <div className="mt-1.5 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => stepPerPerson(-1000)}
                title="Decrease by Rs. 1,000"
                aria-label={`Decrease ${tour.title} per person price by 1000`}
                className="rounded-lg border border-black/10 bg-surface p-1.5 text-obsidian transition-colors hover:border-copper hover:text-copper cursor-pointer"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <input
                type="number"
                min="1000"
                step="500"
                value={priceDraft}
                onChange={(e) => setPriceDraft(e.target.value)}
                aria-label={`${tour.title} per person price`}
                className="w-full rounded-lg border border-black/10 bg-surface px-2.5 py-1 font-mono text-xs font-semibold text-obsidian tabular-nums focus:border-bronze focus:outline-none"
              />
              <button
                type="button"
                onClick={() => stepPerPerson(1000)}
                title="Increase by Rs. 1,000"
                aria-label={`Increase ${tour.title} per person price by 1000`}
                className="rounded-lg border border-black/10 bg-surface p-1.5 text-obsidian transition-colors hover:border-copper hover:text-copper cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Couple Package Price Quick Stepper */}
          <div className="rounded-xl border border-black/10 bg-alabaster p-3">
            <span className="block text-[11px] font-medium text-muted">
              Couple Package (Optional PKR)
            </span>
            <div className="mt-1.5 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => stepCouple(-1000)}
                title="Decrease couple price by Rs. 1,000"
                aria-label={`Decrease ${tour.title} couple price by 1000`}
                className="rounded-lg border border-black/10 bg-surface p-1.5 text-obsidian transition-colors hover:border-copper hover:text-copper cursor-pointer"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <input
                type="number"
                min="0"
                step="500"
                value={coupleDraft}
                onChange={(e) => setCoupleDraft(e.target.value)}
                placeholder="None"
                aria-label={`${tour.title} couple price`}
                className="w-full rounded-lg border border-black/10 bg-surface px-2.5 py-1 font-mono text-xs font-semibold text-obsidian tabular-nums placeholder:font-sans placeholder:text-muted/60 focus:border-bronze focus:outline-none"
              />
              <button
                type="button"
                onClick={() => stepCouple(1000)}
                title="Increase couple price by Rs. 1,000"
                aria-label={`Increase ${tour.title} couple price by 1000`}
                className="rounded-lg border border-black/10 bg-surface p-1.5 text-obsidian transition-colors hover:border-copper hover:text-copper cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Departure Dates Quick Editor */}
          <div className="rounded-xl border border-black/10 bg-alabaster p-3 sm:col-span-2 lg:col-span-1">
            <span className="flex items-center gap-1 text-[11px] font-medium text-muted">
              <Calendar className="h-3 w-3 text-copper" aria-hidden="true" />
              <span>Schedule &amp; Dates (comma separated)</span>
            </span>
            <input
              type="text"
              value={scheduleDraft}
              onChange={(e) => setScheduleDraft(e.target.value)}
              placeholder="Every Thursday"
              aria-label={`${tour.title} schedule`}
              className="mt-1.5 w-full rounded-lg border border-black/10 bg-surface px-2.5 py-1 text-xs font-medium text-obsidian focus:border-bronze focus:outline-none"
            />
            <input
              type="text"
              value={datesDraft}
              onChange={(e) => setDatesDraft(e.target.value)}
              placeholder="26-11-2026, 30-11-2026"
              aria-label={`${tour.title} upcoming dates`}
              className="mt-1.5 w-full rounded-lg border border-black/10 bg-surface px-2.5 py-1 font-mono text-[11px] text-obsidian tabular-nums focus:border-bronze focus:outline-none"
            />
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex flex-wrap items-center gap-2 xl:flex-col xl:items-stretch">
          <button
            type="button"
            onClick={handleSaveInline}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-obsidian px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-pine-slate cursor-pointer"
          >
            <Save className="h-3.5 w-3.5 text-bronze" aria-hidden="true" />
            <span>Save Quick Edits</span>
          </button>

          <button
            type="button"
            onClick={() => onEditFull(tour)}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-black/15 bg-alabaster px-3.5 py-2 text-xs font-semibold text-obsidian transition-colors hover:border-bronze cursor-pointer"
          >
            <Edit3 className="h-3.5 w-3.5 text-copper" aria-hidden="true" />
            <span>Edit Full Details</span>
          </button>

          {!confirmDelete ? (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-black/10 px-3.5 py-2 text-xs font-medium text-muted transition-colors hover:border-copper/50 hover:text-copper cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Delete</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 rounded-lg border border-copper/50 bg-copper/10 p-1">
              <button
                type="button"
                onClick={() => deleteTour(tour.id)}
                className="rounded-md bg-copper px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-copper-hover cursor-pointer"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="rounded-md px-2 py-1 text-[11px] font-medium text-obsidian hover:bg-white/60 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function AdminDashboard({ isOpen, onClose }) {
  const {
    tours,
    bookingContacts,
    addTour,
    updateTour,
    resetToursToDefault,
    addBookingContact,
    removeBookingContact,
    setPrimaryBookingContact,
    resetBookingContacts,
    changeAdminPassword,
    resetAdminPassword,
    logoutAdmin,
  } = useTours();

  const [activeTab, setActiveTab] = useState('packages');
  const [editingTourId, setEditingTourId] = useState(null);
  const [formState, setFormState] = useState(createEmptyForm);
  const [formNotice, setFormNotice] = useState('');
  const [confirmResetPackages, setConfirmResetPackages] = useState(false);

  // Contacts manager state
  const [newPhone, setNewPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Security password state
  const [currentPass, setCurrentPass] = useState('');
  const [nextPass, setNextPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passFeedback, setPassFeedback] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const startCreateNew = () => {
    setEditingTourId(null);
    setFormState(createEmptyForm());
    setFormNotice('');
    setActiveTab('editor');
  };

  const startEditExisting = (tour) => {
    setEditingTourId(tour.id);
    setFormState(tourToForm(tour));
    setFormNotice('');
    setActiveTab('editor');
  };

  const toggleArrayField = (field, value) => {
    setFormState((prev) => {
      const list = prev[field] || [];
      const next = list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value];
      return { ...prev, [field]: next };
    });
  };

  const handleAddCustomCity = () => {
    const city = formState.customCity.trim();
    if (!city) return;
    setFormState((prev) => ({
      ...prev,
      pickupCities: prev.pickupCities.includes(city)
        ? prev.pickupCities
        : [...prev.pickupCities, city],
      customCity: '',
    }));
  };

  const handleSavePackageForm = (event) => {
    event.preventDefault();
    if (!formState.title.trim()) {
      setFormNotice('Please enter a package title.');
      return;
    }

    const upcomingDates = formState.upcomingDatesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const sightseeingSpots = formState.spotsText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [name, note] = line.split('|').map((part) => part.trim());
        return { name, note: note || null };
      });

    const servicesIncluded = formState.includedText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const servicesNotIncluded = formState.excludedText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: formState.title,
      region: formState.region || 'Northern Pakistan',
      category: formState.category || 'Curated Expedition',
      duration: formState.duration || '3 Days / 2 Nights',
      elevation: formState.elevation || '2,400 m',
      groupSize: formState.groupSize || '4 – 18 Guests',
      accommodation: formState.accommodation || 'Standard Hotel Stay',
      pricePKR: Number(formState.pricePKR) || 15000,
      couplePricePKR: formState.couplePricePKR.trim()
        ? Number(formState.couplePricePKR)
        : null,
      pickupCities:
        formState.pickupCities.length > 0 ? formState.pickupCities : ['Lahore', 'Islamabad'],
      departureSchedule: formState.departureSchedule || 'Every Thursday',
      departureDays:
        formState.departureDays.length > 0 ? formState.departureDays : ['Every Thursday'],
      upcomingDates,
      tags: formState.tags.length > 0 ? formState.tags : ['Family Friendly'],
      imageUrl: formState.imageUrl.trim() || IMAGE_PRESETS[0].url,
      tagline: formState.tagline,
      summary: formState.summary,
      sightseeingSpots,
      servicesIncluded,
      servicesNotIncluded,
    };

    if (editingTourId) {
      updateTour(editingTourId, payload);
    } else {
      addTour(payload);
    }

    setEditingTourId(null);
    setFormState(createEmptyForm());
    setActiveTab('packages');
  };

  const handleAddPhone = (event) => {
    event.preventDefault();
    const res = addBookingContact(newPhone);
    if (!res.ok) {
      setPhoneError(res.error);
      return;
    }
    setPhoneError('');
    setNewPhone('');
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (nextPass !== confirmPass) {
      setPassFeedback({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }
    const res = changeAdminPassword(currentPass, nextPass);
    if (!res.ok) {
      setPassFeedback({ type: 'error', text: res.error });
      return;
    }
    setCurrentPass('');
    setNextPass('');
    setConfirmPass('');
    setPassFeedback({ type: 'success', text: 'Owner password updated successfully.' });
  };

  const handleLogout = () => {
    logoutAdmin();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-dashboard-title"
      className="fixed inset-0 z-50 flex flex-col bg-alabaster text-obsidian overflow-hidden"
    >
      {/* Top Luxury Obsidian Studio Bar */}
      <header className="shrink-0 border-b border-bronze/30 bg-obsidian px-4 py-4 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-bronze">
                Tourly.pk Owner Studio <span aria-hidden="true">·</span> Live Sync
              </p>
              <h2
                id="admin-dashboard-title"
                className="font-display text-2xl font-semibold text-white sm:text-3xl"
              >
                Expedition &amp; Pricing Manager
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {!confirmResetPackages ? (
              <button
                type="button"
                onClick={() => setConfirmResetPackages(true)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/85 transition-colors hover:border-bronze hover:text-bronze cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset to Default Packages</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 rounded-full border border-copper/60 bg-copper/15 px-3 py-1.5">
                <span className="text-xs text-white">Restore original 6 packages?</span>
                <button
                  type="button"
                  onClick={() => {
                    resetToursToDefault();
                    setConfirmResetPackages(false);
                  }}
                  className="rounded-full bg-copper px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-copper-hover cursor-pointer"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmResetPackages(false)}
                  className="rounded-full px-2 py-1 text-[11px] text-white/80 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-full border border-bronze/45 bg-pine-slate px-4 py-2 text-xs font-semibold text-bronze transition-colors hover:bg-pine-slate/80 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Return to Live Site</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full bg-copper px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-copper-hover cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mx-auto mt-4 flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('packages')}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'packages'
                  ? 'bg-bronze text-obsidian'
                  : 'bg-white/5 text-white/80 hover:bg-white/10'
              }`}
            >
              <Package className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Quick Price &amp; Date Editor ({tours.length})</span>
            </button>

            <button
              type="button"
              onClick={startCreateNew}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'editor'
                  ? 'bg-bronze text-obsidian'
                  : 'bg-white/5 text-white/80 hover:bg-white/10'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{editingTourId ? 'Edit Package' : 'Add New Tour Package'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('contacts')}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'contacts'
                  ? 'bg-bronze text-obsidian'
                  : 'bg-white/5 text-white/80 hover:bg-white/10'
              }`}
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              <span>WhatsApp Contacts &amp; Security ({bookingContacts.length})</span>
            </button>
          </div>

          <p className="text-[11px] text-white/60">
            Changes save automatically to browser storage (<code className="text-bronze">tourly_packages_v1</code>)
          </p>
        </div>
      </header>

      {/* Scrollable Workspace */}
      <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-7xl">
          {/* TAB 1: QUICK PRICE & DATE EDITOR */}
          {activeTab === 'packages' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-obsidian">
                    Active Tour Packages
                  </h2>
                  <p className="text-xs text-muted">
                    Adjust Per Person or Couple PKR tariffs with one click, edit upcoming departure dates, or open full package details.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={startCreateNew}
                  className="inline-flex items-center gap-2 rounded-full bg-copper px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-copper-hover cursor-pointer"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  <span>Add New Package</span>
                </button>
              </div>

              {tours.length === 0 ? (
                <div className="rounded-2xl border border-black/10 bg-surface p-12 text-center">
                  <p className="font-display text-2xl font-semibold text-obsidian">
                    No packages currently active
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    Create a new package or click &ldquo;Reset to Default Packages&rdquo; above to restore all 6 Tourly.pk departures.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tours.map((tour) => (
                    <QuickTourRow
                      key={tour.id}
                      tour={tour}
                      onEditFull={startEditExisting}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ADD / EDIT FULL TOUR PACKAGE FORM */}
          {activeTab === 'editor' && (
            <form
              onSubmit={handleSavePackageForm}
              className="rounded-2xl border border-black/10 bg-surface p-6 shadow-xs sm:p-8 space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.16em] uppercase text-bronze">
                    {editingTourId ? 'Update Existing Package' : 'Create New Departure'}
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-obsidian sm:text-3xl">
                    {editingTourId ? `Editing: ${formState.title}` : 'Add New Tour Package'}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('packages')}
                  className="rounded-full border border-black/15 px-4 py-2 text-xs font-semibold text-obsidian hover:bg-alabaster cursor-pointer"
                >
                  Back to Packages List
                </button>
              </div>

              {formNotice && (
                <p
                  role="alert"
                  className="rounded-xl border border-copper/40 bg-copper/10 px-4 py-3 text-xs font-semibold text-copper"
                >
                  {formNotice}
                </p>
              )}

              {/* Row 1: Identity */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="sm:col-span-2">
                  <label htmlFor="pkg-title" className="block text-xs font-semibold text-obsidian">
                    Package Title <span className="text-copper">*</span>
                  </label>
                  <input
                    id="pkg-title"
                    type="text"
                    required
                    value={formState.title}
                    onChange={(e) => setFormState((p) => ({ ...p, title: e.target.value }))}
                    placeholder="e.g., Hunza Blossom Heritage Expedition"
                    className="mt-1.5 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 text-sm text-obsidian focus:border-bronze focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="pkg-region" className="block text-xs font-semibold text-obsidian">
                    Region / Valley
                  </label>
                  <input
                    id="pkg-region"
                    type="text"
                    value={formState.region}
                    onChange={(e) => setFormState((p) => ({ ...p, region: e.target.value }))}
                    placeholder="e.g., Hunza Valley"
                    className="mt-1.5 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 text-sm text-obsidian focus:border-bronze focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="pkg-duration" className="block text-xs font-semibold text-obsidian">
                    Duration
                  </label>
                  <input
                    id="pkg-duration"
                    type="text"
                    value={formState.duration}
                    onChange={(e) => setFormState((p) => ({ ...p, duration: e.target.value }))}
                    placeholder="3 Days / 2 Nights"
                    className="mt-1.5 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 text-sm text-obsidian focus:border-bronze focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Pricing & Meta */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label htmlFor="pkg-price" className="block text-xs font-semibold text-obsidian">
                    Per Person Price (PKR) <span className="text-copper">*</span>
                  </label>
                  <input
                    id="pkg-price"
                    type="number"
                    min="1000"
                    step="500"
                    required
                    value={formState.pricePKR}
                    onChange={(e) => setFormState((p) => ({ ...p, pricePKR: e.target.value }))}
                    className="mt-1.5 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 font-mono text-sm text-obsidian tabular-nums focus:border-bronze focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="pkg-couple-price" className="block text-xs font-semibold text-obsidian">
                    Couple Package Price (Optional PKR)
                  </label>
                  <input
                    id="pkg-couple-price"
                    type="number"
                    min="0"
                    step="500"
                    value={formState.couplePricePKR}
                    onChange={(e) => setFormState((p) => ({ ...p, couplePricePKR: e.target.value }))}
                    placeholder="Leave blank if Per Person only"
                    className="mt-1.5 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 font-mono text-sm text-obsidian tabular-nums focus:border-bronze focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="pkg-elevation" className="block text-xs font-semibold text-obsidian">
                    Elevation
                  </label>
                  <input
                    id="pkg-elevation"
                    type="text"
                    value={formState.elevation}
                    onChange={(e) => setFormState((p) => ({ ...p, elevation: e.target.value }))}
                    placeholder="2,804 m"
                    className="mt-1.5 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 font-mono text-sm text-obsidian focus:border-bronze focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="pkg-category" className="block text-xs font-semibold text-obsidian">
                    Category Label
                  </label>
                  <input
                    id="pkg-category"
                    type="text"
                    value={formState.category}
                    onChange={(e) => setFormState((p) => ({ ...p, category: e.target.value }))}
                    placeholder="Alpine Retreat"
                    className="mt-1.5 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 text-sm text-obsidian focus:border-bronze focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Pickup Cities, Departure Days & Tags */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="rounded-xl border border-black/10 bg-alabaster p-4">
                  <span className="block text-xs font-semibold text-obsidian">
                    Pickup Cities
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {Array.from(new Set([...PICKUP_CITIES, ...formState.pickupCities])).map(
                      (city) => {
                        const checked = formState.pickupCities.includes(city);
                        return (
                          <button
                            key={city}
                            type="button"
                            onClick={() => toggleArrayField('pickupCities', city)}
                            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                              checked
                                ? 'border-obsidian bg-obsidian text-white'
                                : 'border-black/10 bg-surface text-muted hover:text-obsidian'
                            }`}
                          >
                            {city}
                          </button>
                        );
                      }
                    )}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={formState.customCity}
                      onChange={(e) => setFormState((p) => ({ ...p, customCity: e.target.value }))}
                      placeholder="Add another city..."
                      className="w-full rounded-lg border border-black/10 bg-surface px-2.5 py-1.5 text-xs focus:border-bronze focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomCity}
                      className="rounded-lg border border-black/15 bg-surface px-3 py-1.5 text-xs font-semibold text-obsidian hover:border-bronze cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-black/10 bg-alabaster p-4 space-y-3">
                  <div>
                    <span className="block text-xs font-semibold text-obsidian">
                      Departure Days Filter Tags
                    </span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {DEPARTURE_DAYS.map((day) => {
                        const checked = formState.departureDays.includes(day);
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => toggleArrayField('departureDays', day)}
                            className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                              checked
                                ? 'border-pine-slate bg-pine-slate text-bronze'
                                : 'border-black/10 bg-surface text-muted hover:text-obsidian'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="pkg-schedule" className="block text-xs font-semibold text-obsidian">
                      Departure Schedule Label
                    </label>
                    <input
                      id="pkg-schedule"
                      type="text"
                      value={formState.departureSchedule}
                      onChange={(e) =>
                        setFormState((p) => ({ ...p, departureSchedule: e.target.value }))
                      }
                      placeholder="Every Thursday & Monday"
                      className="mt-1 w-full rounded-lg border border-black/10 bg-surface px-2.5 py-1.5 text-xs focus:border-bronze focus:outline-none"
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-black/10 bg-alabaster p-4 space-y-3">
                  <div>
                    <span className="block text-xs font-semibold text-obsidian">
                      Group Category Tags
                    </span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {TRUST_MARKERS.map((tag) => {
                        const checked = formState.tags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleArrayField('tags', tag)}
                            className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                              checked
                                ? 'border-copper bg-copper text-white'
                                : 'border-black/10 bg-surface text-muted hover:text-obsidian'
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="pkg-dates" className="block text-xs font-semibold text-obsidian">
                      Upcoming Dates (comma separated)
                    </label>
                    <input
                      id="pkg-dates"
                      type="text"
                      value={formState.upcomingDatesText}
                      onChange={(e) =>
                        setFormState((p) => ({ ...p, upcomingDatesText: e.target.value }))
                      }
                      placeholder="26-11-2026, 30-11-2026, 03-12-2026"
                      className="mt-1 w-full rounded-lg border border-black/10 bg-surface px-2.5 py-1.5 font-mono text-xs tabular-nums focus:border-bronze focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Image Picker + Descriptions */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="lg:col-span-5 space-y-3">
                  <label htmlFor="pkg-image" className="block text-xs font-semibold text-obsidian">
                    Cover Image URL or Preset
                  </label>
                  <input
                    id="pkg-image"
                    type="text"
                    value={formState.imageUrl}
                    onChange={(e) => setFormState((p) => ({ ...p, imageUrl: e.target.value }))}
                    className="w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2 text-xs font-mono text-obsidian focus:border-bronze focus:outline-none"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {IMAGE_PRESETS.map((preset) => (
                      <button
                        key={preset.url}
                        type="button"
                        onClick={() => setFormState((p) => ({ ...p, imageUrl: preset.url }))}
                        className={`rounded-md border px-2 py-1 text-[11px] font-medium cursor-pointer ${
                          formState.imageUrl === preset.url
                            ? 'border-copper bg-copper/10 text-copper'
                            : 'border-black/10 bg-alabaster text-muted hover:text-obsidian'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  <div className="overflow-hidden rounded-xl border border-black/10 bg-obsidian">
                    <img
                      src={formState.imageUrl}
                      alt="Package preview"
                      className="h-36 w-full object-cover"
                    />
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <label htmlFor="pkg-tagline" className="block text-xs font-semibold text-obsidian">
                      Card Tagline
                    </label>
                    <input
                      id="pkg-tagline"
                      type="text"
                      value={formState.tagline}
                      onChange={(e) => setFormState((p) => ({ ...p, tagline: e.target.value }))}
                      placeholder="Short editorial hook shown on tour package card..."
                      className="mt-1.5 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 text-sm text-obsidian focus:border-bronze focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="pkg-summary" className="block text-xs font-semibold text-obsidian">
                      Full Overview Summary
                    </label>
                    <textarea
                      id="pkg-summary"
                      rows={4}
                      value={formState.summary}
                      onChange={(e) => setFormState((p) => ({ ...p, summary: e.target.value }))}
                      placeholder="Detailed itinerary overview displayed inside View Itinerary & Book modal..."
                      className="mt-1.5 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 text-sm text-obsidian focus:border-bronze focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 5: Spots, Included, Excluded */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <div>
                  <label htmlFor="pkg-spots" className="block text-xs font-semibold text-obsidian">
                    Sightseeing Spots (one per line, optional &ldquo;| Note&rdquo;)
                  </label>
                  <textarea
                    id="pkg-spots"
                    rows={6}
                    value={formState.spotsText}
                    onChange={(e) => setFormState((p) => ({ ...p, spotsText: e.target.value }))}
                    placeholder={'Malam Jabba Ski Resort\nUshu Pine Forest | Jeep Charges Not Included\nMahodand Lake'}
                    className="mt-1.5 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 text-xs leading-relaxed text-obsidian focus:border-bronze focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="pkg-included" className="block text-xs font-semibold text-obsidian">
                    Services Included (one per line)
                  </label>
                  <textarea
                    id="pkg-included"
                    rows={6}
                    value={formState.includedText}
                    onChange={(e) => setFormState((p) => ({ ...p, includedText: e.target.value }))}
                    className="mt-1.5 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 text-xs leading-relaxed text-obsidian focus:border-bronze focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="pkg-excluded" className="block text-xs font-semibold text-obsidian">
                    Services Not Included (one per line)
                  </label>
                  <textarea
                    id="pkg-excluded"
                    rows={6}
                    value={formState.excludedText}
                    onChange={(e) => setFormState((p) => ({ ...p, excludedText: e.target.value }))}
                    className="mt-1.5 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 text-xs leading-relaxed text-obsidian focus:border-bronze focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-5">
                <p className="text-xs text-muted">
                  Preview Pricing:{' '}
                  <span className="font-mono font-semibold text-obsidian tabular-nums">
                    {formatPKR(formState.pricePKR)} / Person
                  </span>
                  {formState.couplePricePKR.trim() && Number(formState.couplePricePKR) > 0 && (
                    <span className="ml-3 font-mono font-semibold text-pine-slate tabular-nums">
                      · {formatPKR(formState.couplePricePKR)} / Couple
                    </span>
                  )}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('packages')}
                    className="rounded-full border border-black/15 px-5 py-2.5 text-xs font-semibold text-obsidian hover:bg-alabaster cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-copper px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-copper-hover cursor-pointer"
                  >
                    <Save className="h-4 w-4" aria-hidden="true" />
                    <span>{editingTourId ? 'Save Package Updates' : 'Publish Tour Package'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TAB 3: WHATSAPP CONTACTS & SECURITY */}
          {activeTab === 'contacts' && (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Contact Numbers Manager */}
              <section className="rounded-2xl border border-black/10 bg-surface p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-4">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.16em] uppercase text-bronze">
                      Booking &amp; Concierge Lines
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-obsidian">
                      WhatsApp Contact Manager
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={resetBookingContacts}
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/15 px-3 py-1.5 text-xs font-medium text-obsidian hover:border-bronze cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Reset 4 Official Lines</span>
                  </button>
                </div>

                <p className="text-xs leading-relaxed text-muted">
                  These numbers automatically populate the Booking Modal checkout selector, Package Detail modal, and Concierge section.
                </p>

                <ul className="space-y-2.5">
                  {bookingContacts.map((phone, idx) => (
                    <li
                      key={phone}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-black/10 bg-alabaster px-4 py-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-semibold text-obsidian tabular-nums">
                            {phone}
                          </span>
                          {idx === 0 && (
                            <span className="rounded bg-pine-slate px-2 py-0.5 text-[10px] font-semibold text-bronze">
                              Primary Default
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 font-mono text-[11px] text-muted">
                          wa.me/{toWhatsAppNumber(phone)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {idx !== 0 && (
                          <button
                            type="button"
                            onClick={() => setPrimaryBookingContact(phone)}
                            className="rounded-lg border border-black/15 bg-surface px-2.5 py-1 text-[11px] font-medium text-obsidian hover:border-bronze cursor-pointer"
                          >
                            Set Primary
                          </button>
                        )}
                        {bookingContacts.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeBookingContact(phone)}
                            aria-label={`Remove ${phone}`}
                            className="rounded-lg border border-black/10 p-1.5 text-muted hover:border-copper hover:text-copper cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <form onSubmit={handleAddPhone} className="space-y-2 border-t border-black/10 pt-4">
                  <label htmlFor="admin-add-phone" className="block text-xs font-semibold text-obsidian">
                    Add New WhatsApp Booking Number
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="admin-add-phone"
                      type="tel"
                      value={newPhone}
                      onChange={(e) => {
                        setNewPhone(e.target.value);
                        if (phoneError) setPhoneError('');
                      }}
                      placeholder="e.g., 03001234567"
                      className="w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2 font-mono text-sm text-obsidian tabular-nums focus:border-bronze focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-obsidian px-4 py-2 text-xs font-semibold text-white hover:bg-pine-slate shrink-0 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5 text-bronze" aria-hidden="true" />
                      <span>Add Number</span>
                    </button>
                  </div>
                  {phoneError && (
                    <p role="alert" className="text-xs font-medium text-copper">
                      {phoneError}
                    </p>
                  )}
                </form>
              </section>

              {/* Admin Password Security Settings */}
              <section className="rounded-2xl border border-black/10 bg-surface p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-4">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.16em] uppercase text-bronze">
                      Access Control
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-obsidian">
                      Change Owner Password
                    </h2>
                  </div>

                  <Shield className="h-5 w-5 text-bronze" aria-hidden="true" />
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="sec-current-pass" className="block text-xs font-semibold text-obsidian">
                      Current Password
                    </label>
                    <input
                      id="sec-current-pass"
                      type="password"
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 text-sm text-obsidian focus:border-bronze focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="sec-next-pass" className="block text-xs font-semibold text-obsidian">
                      New Owner Password / PIN
                    </label>
                    <input
                      id="sec-next-pass"
                      type="password"
                      value={nextPass}
                      onChange={(e) => setNextPass(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 text-sm text-obsidian focus:border-bronze focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="sec-confirm-pass" className="block text-xs font-semibold text-obsidian">
                      Confirm New Password
                    </label>
                    <input
                      id="sec-confirm-pass"
                      type="password"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-black/15 bg-alabaster px-3.5 py-2.5 text-sm text-obsidian focus:border-bronze focus:outline-none"
                    />
                  </div>

                  {passFeedback.text && (
                    <p
                      role="alert"
                      className={`rounded-xl px-3.5 py-2.5 text-xs font-medium ${
                        passFeedback.type === 'success'
                          ? 'border border-pine-slate/25 bg-pine-slate/10 text-pine-slate'
                          : 'border border-copper/40 bg-copper/10 text-copper'
                      }`}
                    >
                      {passFeedback.text}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        resetAdminPassword();
                        setPassFeedback({
                          type: 'success',
                          text: 'Password reset back to default (tourly2026).',
                        });
                      }}
                      className="text-xs font-medium text-muted underline-offset-4 hover:text-obsidian hover:underline cursor-pointer"
                    >
                      Reset to default (tourly2026)
                    </button>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-copper px-5 py-2.5 text-xs font-semibold text-white hover:bg-copper-hover cursor-pointer"
                    >
                      <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Update Password</span>
                    </button>
                  </div>
                </form>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
