import { useEffect, useMemo, useState } from 'react';
import { Shield } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TourPackages from './components/TourPackages';
import TravelerGallery from './components/TravelerGallery';
import ScenicMarquee from './components/ScenicMarquee';
import SignatureDestinations from './components/SignatureDestinations';
import ConciergeServices from './components/ConciergeServices';
import PackageModal from './components/PackageModal';
import BookingModal from './components/BookingModal';
import AdminLoginModal from './components/AdminLoginModal';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import SeoSchema from './components/SeoSchema';
import { ToursProvider, useTours } from './context/ToursContext';

const DEFAULT_PAGE_TITLE =
  'Tourly.pk | Luxury Northern Pakistan Tour Packages — Swat, Kalam, Murree & Kashmir';

const INITIAL_FILTERS = {
  pickupCity: 'All',
  departureDay: 'All',
  packageType: 'All',
};

function TourlyStorefront() {
  const { tours, isAdminAuthenticated } = useTours();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingTour, setBookingTour] = useState(null);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  // Support secret URL access via ?admin=true or #admin
  useEffect(() => {
    const checkAdminRoute = () => {
      const params = new URLSearchParams(window.location.search);
      const isAdminRoute =
        params.get('admin') === 'true' ||
        window.location.pathname === '/admin' ||
        window.location.hash === '#admin';

      if (isAdminRoute) {
        if (isAdminAuthenticated) {
          setAdminDashboardOpen(true);
        } else {
          setAdminLoginOpen(true);
        }
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    return () => window.removeEventListener('hashchange', checkAdminRoute);
  }, [isAdminAuthenticated]);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const matchesCity =
        filters.pickupCity === 'All' || tour.pickupCities.includes(filters.pickupCity);
      const matchesDay =
        filters.departureDay === 'All' || tour.departureDays.includes(filters.departureDay);
      const matchesType =
        filters.packageType === 'All' || tour.packageTypes.includes(filters.packageType);
      return matchesCity && matchesDay && matchesType;
    });
  }, [tours, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const scrollToPackages = () => {
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenPackageById = (tourId) => {
    const matchedTour = tours.find((t) => t.id === tourId);
    if (matchedTour) {
      setSelectedPackage(matchedTour);
    }
  };

  const handleOpenBooking = (tour = null) => {
    setSelectedPackage(null);
    setBookingTour(tour);
    setBookingOpen(true);
  };

  const handleOpenAdmin = () => {
    if (isAdminAuthenticated) {
      setAdminDashboardOpen(true);
    } else {
      setAdminLoginOpen(true);
    }
  };

  const handleAdminUnlock = () => {
    setAdminLoginOpen(false);
    setAdminDashboardOpen(true);
  };

  // Keep open PackageModal synced if owner edits its tour details
  const liveSelectedPackage = useMemo(() => {
    if (!selectedPackage) return null;
    return tours.find((t) => t.id === selectedPackage.id) || null;
  }, [tours, selectedPackage]);

  // Dynamic SEO document title for active package, booking checkout, or admin studio
  useEffect(() => {
    if (adminDashboardOpen) {
      document.title = 'Owner Studio | Tourly.pk';
      return;
    }
    if (bookingOpen) {
      document.title = bookingTour
        ? `Book ${bookingTour.title} | Tourly.pk`
        : 'Reserve Your Journey | Tourly.pk';
      return;
    }
    if (liveSelectedPackage) {
      document.title = `${liveSelectedPackage.title} (${liveSelectedPackage.duration}) | Tourly.pk`;
      return;
    }
    document.title = DEFAULT_PAGE_TITLE;
  }, [adminDashboardOpen, bookingOpen, bookingTour, liveSelectedPackage]);

  return (
    <div className="min-h-screen flex flex-col bg-alabaster text-obsidian">
      <SeoSchema />
      <Navbar
        onPlanTrip={() => handleOpenBooking(null)}
        onOpenAdmin={handleOpenAdmin}
        isAdminAuthenticated={isAdminAuthenticated}
      />

      {/* Shown ONLY when Owner is signed in and previewing the live storefront */}
      {isAdminAuthenticated && !adminDashboardOpen && (
        <div className="fixed right-4 bottom-4 z-40">
          <button
            type="button"
            onClick={() => setAdminDashboardOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-bronze/55 bg-obsidian/95 px-4 py-2.5 text-xs font-semibold text-bronze shadow-2xl backdrop-blur-md transition-transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Shield className="h-3.5 w-3.5 text-copper" aria-hidden="true" />
            <span>Owner Studio</span>
          </button>
        </div>
      )}

      <main className="flex-1 pb-8 md:pb-12">
        <Hero
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearchSubmit={scrollToPackages}
          onResetFilters={handleResetFilters}
          matchingCount={filteredTours.length}
        />

        <TourPackages
          tours={filteredTours}
          filters={filters}
          onResetFilters={handleResetFilters}
          onSelectPackage={(tour) => setSelectedPackage(tour)}
          onBookPackage={(tour) => handleOpenBooking(tour)}
        />

        <TravelerGallery />

        <ScenicMarquee />

        <SignatureDestinations onSelectDestination={handleOpenPackageById} />

        <ConciergeServices onPlanTrip={() => handleOpenBooking(null)} />
      </main>

      <Footer
        onPlanTrip={() => handleOpenBooking(null)}
        onOpenAdmin={handleOpenAdmin}
        isAdminAuthenticated={isAdminAuthenticated}
      />

      <PackageModal
        tour={liveSelectedPackage}
        onClose={() => setSelectedPackage(null)}
        onBook={(tour) => handleOpenBooking(tour)}
      />

      <BookingModal
        isOpen={bookingOpen}
        selectedTour={bookingTour}
        tours={tours}
        onClose={() => setBookingOpen(false)}
      />

      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onSuccess={handleAdminUnlock}
      />

      <AdminDashboard
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToursProvider>
      <TourlyStorefront />
    </ToursProvider>
  );
}
