import { useEffect, useMemo } from 'react';
import { toWhatsAppNumber, useTours } from '../context/ToursContext';

const OFFICIAL_EMAIL = 'muhammadahsanislamg@gmail.com';
const SOCIAL_PROFILES = [
  'https://www.instagram.com/p/Dfv2huxgRtb/',
  'https://www.facebook.com/profile.php?id=61592556306674',
];

const FAQ_ENTRIES = [
  {
    question: 'Which cities do Tourly.pk northern expedition packages depart from?',
    answer:
      'Tourly.pk departures operate weekly from Lahore, Islamabad, and Rawalpindi via luxury air-conditioned Coaster Saloon and Toyota Grand Cabin vehicles.',
  },
  {
    question: 'Are Tourly.pk tours safe and suitable for families, girls groups, and boys groups?',
    answer:
      'Yes. All Tourly.pk expeditions are structured as Family Friendly, Girls Friendly, and Boys Friendly journeys accompanied by experienced tour guides, vetted alpine drivers, and curated mountain lodges.',
  },
  {
    question: 'What services are included in Tourly.pk tour packages?',
    answer:
      'Packages include luxury AC transport, standard hotel accommodation (plus private couple suite options on select Swat & Murree departures), breakfasts and dinners as per itinerary, bonfire & BBQ evenings, guide services, tolls, taxes, and a basic first-aid kit.',
  },
  {
    question: 'How can I book a Per Person or Couple Package with Tourly.pk?',
    answer:
      'Use the Reserve Journey / WhatsApp Checkout modal on Tourly.pk to select your tour, traveler count or Couple Package, pickup city, and preferred date, then submit directly via WhatsApp to 0315-4518185, 0333-8807802, 0323-0101739, or 0306-0144206.',
  },
];

export default function SeoSchema() {
  const { tours, bookingContacts } = useTours();

  const schemaGraph = useMemo(() => {
    const formattedPhones = bookingContacts.map((phone) => `+${toWhatsAppNumber(phone)}`);

    const offerItems = tours.map((tour, index) => {
      const offer = {
        '@type': 'Offer',
        position: index + 1,
        url: `https://tourly.pk/#packages`,
        priceCurrency: 'PKR',
        price: String(tour.pricePKR),
        availability: 'https://schema.org/InStock',
        itemOffered: {
          '@type': 'TouristTrip',
          name: tour.title,
          description: tour.summary || tour.tagline,
          touristType: tour.tags || ['Family Friendly', 'Girls Friendly', 'Boys Friendly'],
          provider: {
            '@id': 'https://tourly.pk/#organization',
          },
          itinerary: {
            '@type': 'ItemList',
            numberOfItems: (tour.itinerary || []).length,
            itemListElement: (tour.itinerary || []).map((stop, stopIdx) => ({
              '@type': 'ListItem',
              position: stopIdx + 1,
              name: stop.title,
              description: stop.detail,
            })),
          },
        },
      };

      if (tour.couplePricePKR) {
        offer.priceSpecification = [
          {
            '@type': 'UnitPriceSpecification',
            name: 'Per Person',
            price: String(tour.pricePKR),
            priceCurrency: 'PKR',
          },
          {
            '@type': 'UnitPriceSpecification',
            name: 'Couple Package',
            price: String(tour.couplePricePKR),
            priceCurrency: 'PKR',
          },
        ];
      }

      return offer;
    });

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'TravelAgency',
          '@id': 'https://tourly.pk/#organization',
          name: 'Tourly.pk',
          url: 'https://tourly.pk/',
          email: OFFICIAL_EMAIL,
          telephone: formattedPhones,
          sameAs: SOCIAL_PROFILES,
          description:
            'Luxury curated expeditions across Northern Pakistan including Swat, Kalam, Malam Jabba, Murree, Patriata, Azad Kashmir, and Kumrat departing from Lahore, Islamabad, and Rawalpindi.',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Islamabad',
            addressCountry: 'PK',
          },
          areaServed: [
            { '@type': 'City', name: 'Lahore' },
            { '@type': 'City', name: 'Islamabad' },
            { '@type': 'City', name: 'Rawalpindi' },
            { '@type': 'Place', name: 'Swat & Kalam Valley' },
            { '@type': 'Place', name: 'Murree & Patriata' },
            { '@type': 'Place', name: 'Azad Kashmir' },
            { '@type': 'Place', name: 'Kumrat & Neelum Valley' },
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Tourly.pk Northern Pakistan Expeditions',
            itemListElement: offerItems,
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://tourly.pk/#faq',
          mainEntity: FAQ_ENTRIES.map((entry) => ({
            '@type': 'Question',
            name: entry.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: entry.answer,
            },
          })),
        },
      ],
    };
  }, [tours, bookingContacts]);

  useEffect(() => {
    const scriptId = 'tourly-seo-jsonld';
    let scriptEl = document.getElementById(scriptId);

    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptEl);
    }

    scriptEl.textContent = JSON.stringify(schemaGraph);

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing && existing.parentNode) {
        existing.parentNode.removeChild(existing);
      }
    };
  }, [schemaGraph]);

  return null;
}
