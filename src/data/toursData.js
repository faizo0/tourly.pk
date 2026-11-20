export const SITE_CONFIG = {
  brandName: 'Tourly.pk',
  headline: 'Escape the Heat... Embrace the Hills',
  tagline: 'Unforgettable Journeys | Pakistan',
  conciergeEmail: 'muhammadahsanislamg@gmail.com',
  conciergePhone: '03154518185',
  bookingContacts: ['03154518185', '03338807802', '03230101739', '03060144206'],
  headquarters: 'Islamabad, Pakistan',
};

export const PICKUP_CITIES = ['Lahore', 'Islamabad', 'Rawalpindi'];

export const DEPARTURE_DAYS = ['Every Thursday', 'Every Friday', 'Every Monday'];

export const PACKAGE_TYPES = ['Per Person', 'Couple Package'];

export const TRUST_MARKERS = ['Family Friendly', 'Girls Friendly', 'Boys Friendly'];

export const COMMON_SERVICES_NOT_INCLUDED = [
  'Entry Tickets of any kind',
  'Personal Expenses',
  'Snacks, Beverages or Refreshments',
  'Extra Activities of Games',
  'Horse Riding / Jeep Ride',
  'Anything not mentioned',
];

export const REGIONS = [
  {
    tourId: 'escape-murree-patriata',
    kicker: 'Galiyat Pine Ridge',
    name: 'Murree & Patriata Hills',
    elevation: '2,291 m',
    duration: '2 Days / 1 Night',
    startingPrice: 'Rs. 11,000',
    highlight: 'Patriata Chairlift, Mushkpuri Top & Bonfire Night',
    imageUrl: '/src/assets/images/hero_slide_murree_patriata_1795205714769.jpg',
    imageAlt: 'Twilight pine ridges and Patriata cable cars glowing over misty Murree hills',
  },
  {
    tourId: 'swat-kalam-malam-jabba',
    kicker: 'Upper Swat Corridor',
    name: 'Swat, Kalam & Malam Jabba',
    elevation: '2,804 m',
    duration: '3 Days / 2 Nights',
    startingPrice: 'Rs. 15,000',
    highlight: 'Malam Jabba Ski Ridge, Ushu Pine Forest & Mahodand Lake',
    imageUrl: '/src/assets/images/hero_slide_swat_kalam_1795205714141.jpg',
    imageAlt: 'Swat Valley emerald pine forests beside glacial river and Swati riverside pavilion',
  },
  {
    tourId: 'winter-trips-kashmir',
    kicker: 'Neelum Snow Belt',
    name: 'Azad Kashmir Winter Valleys',
    elevation: '2,100 m',
    duration: '3 Days / 2 Nights',
    startingPrice: 'Rs. 15,000',
    highlight: 'Keran Riverfront, Upper Neelum Snow & Dhani Waterfall',
    imageUrl: '/src/assets/images/hero_slide_kashmir_neelum_1795205714179.jpg',
    imageAlt: 'Wooden riverside cottages nestled in snowy Azad Kashmir mountain valley',
  },
  {
    tourId: 'winter-trips-kumrat-neelum',
    kicker: 'Upper Dir & Neelum',
    name: 'Kumrat & Neelum Gorge',
    elevation: '2,450 m',
    duration: '3 Days / 2 Nights',
    startingPrice: 'Rs. 15,000',
    highlight: 'Frost-Kissed Deodar Forests, Kala Chashma & Alpine Rapids',
    imageUrl: '/src/assets/images/tour_kumrat_neelum_1795205084098.jpg',
    imageAlt: 'Frost-kissed deodar cedar forest and turquoise rapids in Kumrat and Neelum valley',
  },
];

export const CONCIERGE_SERVICES = [
  {
    index: '01',
    id: 'highland-fleet',
    title: 'Chauffeured Highland Fleet',
    subtitle: 'Lahore · Islamabad · Rawalpindi Departures',
    detail:
      'Air-conditioned Coaster Saloons and Toyota Grand Cabins engineered for mountain terrain, departing punctually from Lahore, Islamabad, and Rawalpindi.',
    highlights: [
      'Air-conditioned Coaster Saloon & Toyota Grand Cabin fleet',
      'All highway tolls, fuel, and mountain route permits included',
      'Vetted alpine drivers trained for winter valley ascents',
    ],
    imageUrl: '/src/assets/images/service_highland_fleet_1795206307809.jpg',
    imageAlt: 'Executive touring vehicle and luxury mountain coach ascending a Karakoram highway',
  },
  {
    index: '02',
    id: 'mountain-lodges',
    title: 'Curated Mountain Lodges',
    subtitle: 'Heated Suites · Scenic Riverfront Retreats',
    detail:
      'Handpicked timber retreats, heated standard and couple suites, and scenic riverfront sanctuaries pairing alpine stillness with warm hospitality.',
    highlights: [
      'Heated mountain hotel rooms & private couple suites',
      'Freshly prepared breakfasts and multi-course dinners per plan',
      'Scenic riverfront and pine-ridge properties near key spots',
    ],
    imageUrl: '/src/assets/images/service_mountain_lodges_1795206307814.jpg',
    imageAlt: 'Luxury mountain timber suite interior with stone fireplace overlooking snowy river valley',
  },
  {
    index: '03',
    id: 'group-harmony',
    title: 'Dedicated Group Harmony',
    subtitle: 'Family Friendly · Girls Friendly · Boys Friendly',
    detail:
      'Experienced tour guides, curated bonfire & BBQ evenings, expedition photography, and respectful pacing tailored for Family, Girls, and Boys groups.',
    highlights: [
      'Experienced tour guides & basic first aid readiness',
      'Evening Bonfire & BBQ gatherings with dedicated photography',
      'Safe, welcoming environment for Family, Girls & Boys groups',
    ],
    imageUrl: '/src/assets/images/service_group_harmony_1795206307732.jpg',
    imageAlt: 'Lantern-lit bonfire lounge in a cedar valley with alpine guide and guests enjoying tea',
  },
];

export const TOURS_DATA = [
  {
    id: 'escape-swat-kalam',
    slug: 'escape-to-swat-and-kalam',
    title: 'Escape to Swat & Kalam',
    region: 'Swat & Kalam',
    category: 'Heritage & Alpine',
    duration: '3 Days / 2 Nights',
    durationDays: 3,
    departureSchedule: 'Every Thursday & Monday',
    departureDays: ['Every Thursday', 'Every Monday'],
    upcomingDates: ['26-11-2026', '30-11-2026', '03-12-2026'],
    pickupLabel: 'Lahore & Islamabad',
    pickupCities: ['Lahore', 'Islamabad'],
    packageTypes: ['Per Person'],
    tags: ['Family Friendly', 'Girls Friendly', 'Boys Friendly'],
    pricePKR: 15000,
    priceFormatted: 'Rs. 15,000',
    couplePricePKR: null,
    couplePriceFormatted: null,
    groupSize: '4 – 18 Guests',
    elevation: '2,804 m',
    accommodation: '2 Nights Standard Accommodation',
    tagline:
      'Malam Jabba Ski Resort, Ushu Pine Forest, Mahodand Lake, and Swat’s royal Gandharan heritage.',
    summary:
      'Explore Swat Valley’s signature alpine and heritage landmarks—including Malam Jabba Ski Resort, Kalam Valley, Ushu Pine Forest, Mahodand Lake, Swat Museum, Butkara Stupa, White Palace, Fizagat Park, and Gabbeen Jabba—with luxury transport, standard accommodation, breakfast & dinner, bonfire & BBQ, and an experienced tour guide.',
    sightseeingSpots: [
      { name: 'Malam Jabba Ski Resort', note: null },
      { name: 'Kalam Valley', note: null },
      { name: 'Ushu Pine Forest', note: 'Jeep Charges Not Included' },
      { name: 'Mahodand Lake', note: null },
      { name: 'Swat Museum', note: null },
      { name: 'Butkara Stupa', note: null },
      { name: 'White Palace', note: null },
      { name: 'Fizagat Park', note: null },
      { name: 'Gabbeen Jabba', note: null },
    ],
    servicesIncluded: [
      'Luxury Transport',
      'Standard Accommodation (2 Nights)',
      'Breakfast & Dinner',
      'Bonfire & BBQ',
      'Experienced Tour Guide',
    ],
    servicesNotIncluded: COMMON_SERVICES_NOT_INCLUDED,
    itinerary: [
      {
        day: 1,
        title: 'Swat Motorway, Fizagat Park & Malam Jabba Ski Resort',
        detail:
          'Depart from Lahore & Islamabad via Swat Motorway. Visit Fizagat Park and ascend to Malam Jabba Ski Resort and Gabbeen Jabba ridge before check-in and dinner.',
      },
      {
        day: 2,
        title: 'Kalam Valley, Ushu Pine Forest & Mahodand Lake',
        detail:
          'Journey into Kalam Valley, Ushu Pine Forest, and Mahodand Lake surrounded by towering snow peaks, returning for an evening Bonfire & BBQ.',
      },
      {
        day: 3,
        title: 'Swat Museum, Butkara Stupa, White Palace & Return',
        detail:
          'After breakfast, explore Swat Museum, Butkara Stupa, and White Palace Marghazar before your comfortable return to Islamabad and Lahore.',
      },
    ],
    imageUrl: '/src/assets/images/hero_slide_swat_kalam_1795205714141.jpg',
    imageAlt: 'Swat and Kalam emerald valley river beside traditional carved wooden pavilion',
  },
  {
    id: 'swat-kalam-malam-jabba',
    slug: 'swat-kalam-and-malam-jabba',
    title: 'Swat Kalam & Malam Jabba',
    region: 'Swat Valley',
    category: 'Alpine Retreat',
    duration: '3 Days / 2 Nights',
    durationDays: 3,
    departureSchedule: 'Every Thursday & Monday',
    departureDays: ['Every Thursday', 'Every Monday'],
    upcomingDates: ['26-11-2026', '30-11-2026', '03-12-2026', 'Every Thu & Mon Next Month'],
    pickupLabel: 'Lahore or Islamabad',
    pickupCities: ['Lahore', 'Islamabad'],
    packageTypes: ['Per Person', 'Couple Package'],
    tags: ['Family Friendly', 'Girls Friendly', 'Boys Friendly'],
    pricePKR: 15000,
    priceFormatted: 'Rs. 15,000',
    couplePricePKR: 35000,
    couplePriceFormatted: 'Rs. 35,000',
    groupSize: '4 – 16 Guests',
    elevation: '2,804 m',
    accommodation: '2 Nights Standard Hotel Accommodation',
    tagline:
      'Family, Girls & Boys friendly expedition across Mingora, Malam Jabba, Behrain, Kalam Bazar, Ushoo Forest & Mohdand Lake.',
    summary:
      'Scheduled every Thursday & Monday (26-11-2026, 30-11-2026, 03-12-2026, and every Thursday & Monday next month) from Lahore or Islamabad. Covers Swat, Fizagat, Mingora, Swat Mall, Malam Jabba, Behrain, Kalam, Kalam Bazar, Ushoo Forest, Palogga Valley, and Mohdand Lake / Andarb Lake with both Per Person and Couple Package options.',
    sightseeingSpots: [
      { name: 'Swat', note: null },
      { name: 'Fizagat', note: null },
      { name: 'Mingora', note: null },
      { name: 'Swat Mall', note: null },
      { name: 'Malam Jabba', note: null },
      { name: 'Behrain', note: null },
      { name: 'Kalam', note: null },
      { name: 'Kalam Bazar', note: null },
      { name: 'Ushoo Forest', note: 'Jeep Charges Not Included' },
      { name: 'Palogga Valley', note: null },
      { name: 'Mohdand Lake / Andarb Lake', note: null },
    ],
    servicesIncluded: [
      'Luxury Transport (Air Conditioned Coaster Saloon / Toyota Grand Cabin)',
      'Hotel Stay (2 Nights Standard Accommodation as per package)',
      'Meals (Breakfasts & Dinners as per day plan)',
      'Bonfire & BBQ',
      'Photography',
      'Services of an Experienced Tour Guide',
      'All kinds of tolls and taxes',
      'Basic First Aid Kit',
    ],
    servicesNotIncluded: COMMON_SERVICES_NOT_INCLUDED,
    itinerary: [
      {
        day: 1,
        title: 'Swat, Fizagat, Mingora, Swat Mall & Malam Jabba',
        detail:
          'Depart Lahore or Islamabad via Swat Motorway. Stop at Fizagat, Mingora, and Swat Mall before ascending to Malam Jabba for scenic slopes and dinner.',
      },
      {
        day: 2,
        title: 'Behrain, Kalam Bazar, Ushoo Forest, Palogga & Mohdand Lake',
        detail:
          'Travel past Behrain into Kalam and Kalam Bazar, continuing toward Ushoo Forest (Jeep Charges Not Included), Palogga Valley, and Mohdand Lake / Andarb Lake, ending with Bonfire & BBQ.',
      },
      {
        day: 3,
        title: 'Morning Valley Stroll & Return Journey',
        detail:
          'Breakfast overlooking the Swat river valley followed by leisurely return to Islamabad and Lahore.',
      },
    ],
    imageUrl: '/src/assets/images/tour_swat_kalam_1795205084927.jpg',
    imageAlt: 'Turquoise river winding past snow-dusted peaks and cedar lodges in Swat and Kalam Valley',
  },
  {
    id: 'escape-murree-patriata',
    slug: 'escape-to-murree-and-patriata',
    title: 'Escape to Murree & Patriata',
    region: 'Murree & Galiyat',
    category: 'Weekend Sanctuary',
    duration: '2 Days / 1 Night',
    durationDays: 2,
    departureSchedule: 'Every Friday',
    departureDays: ['Every Friday'],
    upcomingDates: ['20-11-2026', '27-11-2026', 'Every Friday Next Month'],
    pickupLabel: 'Lahore, Islamabad & Rawalpindi',
    pickupCities: ['Lahore', 'Islamabad', 'Rawalpindi'],
    packageTypes: ['Per Person', 'Couple Package'],
    tags: ['Family Friendly', 'Girls Friendly', 'Boys Friendly'],
    pricePKR: 11000,
    priceFormatted: 'Rs. 11,000',
    couplePricePKR: 25000,
    couplePriceFormatted: 'Rs. 25,000',
    groupSize: '4 – 18 Guests',
    elevation: '2,291 m',
    accommodation: '1 Night Hotel Stay',
    tagline:
      'Faisal Mosque Islamabad, Murree Mall Road, Patriata Chairlift & Cable Car, Mushkpuri Top & Bonfire Night.',
    summary:
      'Departing every Friday (20-11-2026, 27-11-2026, and every Friday next month) with luxury Coaster Saloon or Toyota Grand Cabin transport, 2 breakfasts, 1 dinner, 1 night hotel stay, full guide services, all tolls & taxes, and basic first aid kit.',
    sightseeingSpots: [
      { name: 'Faisal Mosque Islamabad', note: null },
      { name: 'Murree Mall Road', note: null },
      { name: 'Patriata Chairlift & Cable Car', note: null },
      { name: 'Mushkpuri Top', note: null },
      { name: 'Bonfire Night', note: null },
    ],
    servicesIncluded: [
      'Luxury Transport (Air Conditioned Coaster Saloon / Toyota Grand Cabin)',
      '2 Breakfasts & 1 Dinner',
      '1 Night Hotel Stay',
      'Meal according to day plan',
      'Services of a guide',
      'All kind of tolls and taxes',
      'Basic First Aid Kit',
    ],
    servicesNotIncluded: COMMON_SERVICES_NOT_INCLUDED,
    itinerary: [
      {
        day: 1,
        title: 'Faisal Mosque Islamabad, Murree Mall Road & Bonfire Night',
        detail:
          'Depart Lahore, Islamabad & Rawalpindi with a guided stop at Faisal Mosque Islamabad. Continue to Murree Mall Road for an evening stroll, hotel check-in, dinner, and Bonfire Night.',
      },
      {
        day: 2,
        title: 'Patriata Chairlift & Cable Car, Mushkpuri Top & Return',
        detail:
          'After breakfast, experience Patriata Chairlift & Cable Car and ascend to Mushkpuri Top before returning smoothly to Rawalpindi, Islamabad, and Lahore.',
      },
    ],
    imageUrl: '/src/assets/images/tour_murree_patriata_1795205084505.jpg',
    imageAlt: 'Golden hour mist over Murree and Patriata emerald pine forests in northern Pakistan',
  },
  {
    id: 'winter-trips-kashmir',
    slug: '3-days-winter-trip-kashmir',
    title: '3 Days Winter Trip - Kashmir',
    region: 'Azad Kashmir',
    category: 'Winter Expedition',
    duration: '3 Days / 2 Nights',
    durationDays: 3,
    departureSchedule: 'Every Thursday',
    departureDays: ['Every Thursday'],
    upcomingDates: ['Every Thursday · Lahore, Islamabad & Rawalpindi'],
    pickupLabel: 'Lahore, Islamabad & Rawalpindi',
    pickupCities: ['Lahore', 'Islamabad', 'Rawalpindi'],
    packageTypes: ['Per Person'],
    tags: ['Family Friendly', 'Girls Friendly', 'Boys Friendly'],
    pricePKR: 15000,
    priceFormatted: 'Rs. 15,000',
    couplePricePKR: null,
    couplePriceFormatted: null,
    groupSize: '6 – 18 Guests',
    elevation: '2,100 m',
    accommodation: 'Hotel Stay (2 Nights)',
    tagline:
      'Every Thursday winter departure from Lahore, Islamabad & Rawalpindi featuring luxury transport, 2 nights stay, delicious meals, bonfire & photography.',
    summary:
      'A quintessential 3 Days / 2 Nights winter journey through Azad Kashmir’s scenic snow valleys—including Luxury Transport, Hotel Stay (2 Nights), Delicious Meals, Bonfire, and dedicated Photography across Keran, Upper Neelum, and snowy riverfronts.',
    sightseeingSpots: [
      { name: 'Scenic Snow Valleys of Upper Neelum', note: 'Winter Expedition Spot' },
      { name: 'Keran Snow-Draped Riverfront', note: 'Photography Stop' },
      { name: 'Dhani Waterfall Winter Cascade', note: 'Photography Stop' },
      { name: 'Kutton & Jagran Pine Forest Valley', note: 'Snow Valley' },
      { name: 'Muzaffarabad & Kohala Ridge Overlook', note: 'Scenic Stop' },
      { name: 'Bonfire & Photography Evening', note: 'Included Experience' },
    ],
    servicesIncluded: [
      'Luxury Transport',
      'Hotel Stay (2 Nights)',
      'Delicious Meals',
      'Bonfire',
      'Photography',
      'Services of an Experienced Tour Guide',
      'All kinds of tolls and taxes',
      'Basic First Aid Kit',
    ],
    servicesNotIncluded: COMMON_SERVICES_NOT_INCLUDED,
    itinerary: [
      {
        day: 1,
        title: 'Kohala Ridge, Dhani Waterfall & Keran Snow Valley',
        detail:
          'Every Thursday departure from Lahore, Islamabad & Rawalpindi into Azad Kashmir with photography stops at Kohala and Dhani Waterfall en route to Keran.',
      },
      {
        day: 2,
        title: 'Upper Neelum Snow Expedition, Kutton & Bonfire',
        detail:
          'Explore snow-draped Upper Neelum valleys and Kutton pine groves with curated photography stops, ending with delicious meals and a warm winter bonfire.',
      },
      {
        day: 3,
        title: 'Sunrise River Photography & Return',
        detail:
          'Morning photography along the emerald Neelum River before returning comfortably to Rawalpindi, Islamabad, and Lahore.',
      },
    ],
    imageUrl: '/src/assets/images/tour_kashmir_winter_1795205084521.jpg',
    imageAlt: 'Snow-covered cedar chalet beside an emerald river in Azad Kashmir winter valley',
  },
  {
    id: 'winter-trips-kumrat-neelum',
    slug: '3-days-winter-trip-kumrat-neelum',
    title: '3 Days Winter Trip - Kumrat & Neelum',
    region: 'Kumrat & Neelum',
    category: 'Winter Expedition',
    duration: '3 Days / 2 Nights',
    durationDays: 3,
    departureSchedule: 'Every Thursday',
    departureDays: ['Every Thursday'],
    upcomingDates: ['Every Thursday · Lahore, Islamabad & Rawalpindi'],
    pickupLabel: 'Lahore, Islamabad & Rawalpindi',
    pickupCities: ['Lahore', 'Islamabad', 'Rawalpindi'],
    packageTypes: ['Per Person'],
    tags: ['Family Friendly', 'Girls Friendly', 'Boys Friendly'],
    pricePKR: 15000,
    priceFormatted: 'Rs. 15,000',
    couplePricePKR: null,
    couplePriceFormatted: null,
    groupSize: '6 – 16 Guests',
    elevation: '2,450 m',
    accommodation: 'Hotel Stay (2 Nights)',
    tagline:
      'Every Thursday winter departure from Lahore, Islamabad & Rawalpindi with luxury transport, 2 nights hotel stay, delicious meals, bonfire & photography.',
    summary:
      'Designed for winter explorers chasing frost-kissed deodar snow valleys, wooden river bridges, and alpine rapids—featuring Luxury Transport, Hotel Stay (2 Nights), Delicious Meals, Bonfire, and dedicated Photography.',
    sightseeingSpots: [
      { name: 'Kumrat & Neelum Scenic Snow Valleys', note: 'Winter Expedition Spot' },
      { name: 'Frost-Kissed Deodar Cedar Forest', note: 'Photography Stop' },
      { name: 'Kala Chashma & Wooden River Bridges', note: 'Winter Expedition Spot' },
      { name: 'Frozen Waterfall Gorge Viewpoint', note: 'Photography Stop' },
      { name: 'Alpine Riverbank Snow Trails', note: 'Scenic Valley' },
      { name: 'Bonfire & Winter Photography Night', note: 'Included Experience' },
    ],
    servicesIncluded: [
      'Luxury Transport',
      'Hotel Stay (2 Nights)',
      'Delicious Meals',
      'Bonfire',
      'Photography',
      'Services of an Experienced Tour Guide',
      'All kinds of tolls and taxes',
      'Basic First Aid Kit',
    ],
    servicesNotIncluded: COMMON_SERVICES_NOT_INCLUDED,
    itinerary: [
      {
        day: 1,
        title: 'Highland Winter Corridor & Hotel Check-In',
        detail:
          'Depart every Thursday from Lahore, Islamabad & Rawalpindi in luxury air-conditioned transport, checking into mountain accommodation for dinner.',
      },
      {
        day: 2,
        title: 'Snow Valleys, Cedar Gorge & Bonfire Night',
        detail:
          'Explore snow-covered deodar forests, wooden river bridges, and frozen waterfalls with dedicated photography stops, followed by an evening bonfire.',
      },
      {
        day: 3,
        title: 'Morning Mist Photography & Return',
        detail:
          'Capture crisp morning light across the snow valley before departing smoothly back to Rawalpindi, Islamabad, and Lahore.',
      },
    ],
    imageUrl: '/src/assets/images/tour_kumrat_neelum_1795205084098.jpg',
    imageAlt: 'Frost-kissed deodar cedar forest and rushing alpine river in Kumrat and Neelum gorge',
  },
  {
    id: 'winter-trips-swat-kalam',
    slug: '3-days-winter-trip-swat-kalam',
    title: '3 Days Winter Trip - Swat Kalam',
    region: 'Swat & Kalam',
    category: 'Winter Expedition',
    duration: '3 Days / 2 Nights',
    durationDays: 3,
    departureSchedule: 'Every Thursday',
    departureDays: ['Every Thursday'],
    upcomingDates: ['Every Thursday · Lahore, Islamabad & Rawalpindi'],
    pickupLabel: 'Lahore, Islamabad & Rawalpindi',
    pickupCities: ['Lahore', 'Islamabad', 'Rawalpindi'],
    packageTypes: ['Per Person'],
    tags: ['Family Friendly', 'Girls Friendly', 'Boys Friendly'],
    pricePKR: 15000,
    priceFormatted: 'Rs. 15,000',
    couplePricePKR: null,
    couplePriceFormatted: null,
    groupSize: '6 – 18 Guests',
    elevation: '2,804 m',
    accommodation: 'Hotel Stay (2 Nights)',
    tagline:
      'Every Thursday winter departure from Lahore, Islamabad & Rawalpindi with luxury transport, 2 nights hotel stay, delicious meals, bonfire & photography.',
    summary:
      'A crisp 3 Days / 2 Nights winter getaway into snow-covered Swat, Malam Jabba, and Kalam—featuring Luxury Transport, Hotel Stay (2 Nights), Delicious Meals, Bonfire, and dedicated Photography.',
    sightseeingSpots: [
      { name: 'Malam Jabba Winter Snow Ridge', note: 'Winter Expedition Spot' },
      { name: 'Kalam Snow Valley & Bazar', note: 'Scenic Stop' },
      { name: 'Ushu Pine Forest Winter Trail', note: 'Jeep Charges Not Included' },
      { name: 'Behrain Riverside Cascade', note: 'Photography Stop' },
      { name: 'Fizagat Riverfront Overlook', note: 'Scenic Stop' },
      { name: 'Bonfire & Photography Evening', note: 'Included Experience' },
    ],
    servicesIncluded: [
      'Luxury Transport',
      'Hotel Stay (2 Nights)',
      'Delicious Meals',
      'Bonfire',
      'Photography',
      'Services of an Experienced Tour Guide',
      'All kinds of tolls and taxes',
      'Basic First Aid Kit',
    ],
    servicesNotIncluded: COMMON_SERVICES_NOT_INCLUDED,
    itinerary: [
      {
        day: 1,
        title: 'Thursday Departure & Malam Jabba Winter Ridge',
        detail:
          'Depart Lahore, Islamabad & Rawalpindi via Swat Motorway, visiting Fizagat and Malam Jabba snow slopes before hotel check-in and dinner.',
      },
      {
        day: 2,
        title: 'Behrain, Kalam Valley, Ushu Forest & Bonfire',
        detail:
          'Scenic winter drive along the Swat River into Kalam and Ushu Pine Forest with photography stops, followed by delicious meals and an evening bonfire.',
      },
      {
        day: 3,
        title: 'Morning Snow Photography & Return Journey',
        detail:
          'Enjoy breakfast overlooking snow-dusted peaks before returning comfortably to Rawalpindi, Islamabad, and Lahore.',
      },
    ],
    imageUrl: '/src/assets/images/memory_kalam_couple_1795205504581.jpg',
    imageAlt: 'Snow-capped peaks and emerald waters of Mahodand Lake and Kalam Valley in Swat',
  },
];

export const GALLERY_FILTERS = [
  'All Memories',
  'Murree & Patriata',
  'Swat & Kalam',
  'Kashmir & Kumrat',
];

export const TRAVELER_MEMORIES = [
  {
    id: 'memory-murree-bonfire',
    category: 'Murree & Patriata',
    destinationLabel: 'Murree & Patriata',
    tripType: 'Family Trip',
    travelerName: 'Hamza & Ayesha Malik',
    city: 'Lahore',
    rating: 5,
    quote:
      'The bonfire & BBQ night beneath the Murree pines was unforgettable. Our Toyota Grand Cabin was spotless and our guide handled every Patriata stop seamlessly.',
    imageUrl: '/src/assets/images/memory_murree_bonfire_1795205504838.jpg',
    imageAlt: 'Travelers gathered around a warm bonfire and BBQ under string lanterns in Murree pine forest',
  },
  {
    id: 'memory-swat-girls',
    category: 'Swat & Kalam',
    destinationLabel: 'Ushu Forest, Kalam',
    tripType: 'Girls Group',
    travelerName: 'Zoya Khan & Friends',
    city: 'Islamabad',
    rating: 5,
    quote:
      'As an all-girls group from Islamabad, we felt completely cared for. Comfortable Coaster Saloon travel, safe hotels, and a deeply respectful tour guide across Swat and Kalam.',
    imageUrl: '/src/assets/images/memory_swat_girls_1795205505428.jpg',
    imageAlt: 'Group of young women smiling beside the turquoise glacial river in Kalam Valley, Swat',
  },
  {
    id: 'memory-kalam-couple',
    category: 'Swat & Kalam',
    destinationLabel: 'Mahodand Lake, Swat',
    tripType: 'Couple Retreat',
    travelerName: 'Bilal & Sana Qureshi',
    city: 'Lahore',
    rating: 5,
    quote:
      'From Malam Jabba to the stillness of Mahodand Lake, Tourly.pk curated every hour effortlessly. The private couple suite and riverside bonfire evening exceeded expectations.',
    imageUrl: '/src/assets/images/memory_kalam_couple_1795205504581.jpg',
    imageAlt: 'Couple looking over emerald Mahodand Lake and snow-capped peaks in Kalam Valley',
  },
  {
    id: 'memory-kashmir-boys',
    category: 'Kashmir & Kumrat',
    destinationLabel: 'Neelum Valley, Kashmir',
    tripType: 'Boys Expedition',
    travelerName: 'Usman Tariq & Crew',
    city: 'Rawalpindi',
    rating: 5,
    quote:
      'Joined the Thursday departure from Rawalpindi with university friends. Crisp snow trails, steaming Kashmiri kahwa around the bonfire, and an exceptional mountain captain.',
    imageUrl: '/src/assets/images/memory_kashmir_boys_1795205505460.jpg',
    imageAlt: 'Four friends on a wooden bridge over a snowy glacial river in Neelum Valley, Kashmir',
  },
  {
    id: 'memory-patriata-family',
    category: 'Murree & Patriata',
    destinationLabel: 'Mushkpuri & Patriata',
    tripType: 'Family Trip',
    travelerName: 'Dr. Salman Raza',
    city: 'Islamabad',
    rating: 5,
    quote:
      'Traveling with elderly parents and kids is usually stressful, yet Tourly.pk’s air-conditioned transport, warm lodge meals, and patient guide made Mushkpuri effortless.',
    imageUrl: '/src/assets/images/memory_patriata_family_1795205505415.jpg',
    imageAlt: 'Pakistani family smiling at a scenic mountain ridge overlooking misty hills in Murree',
  },
  {
    id: 'memory-kumrat-winter',
    category: 'Kashmir & Kumrat',
    destinationLabel: 'Kumrat & Upper Neelum',
    tripType: 'Winter Expedition',
    travelerName: 'Fawad & Mariam Siddiqui',
    city: 'Lahore',
    rating: 5,
    quote:
      'Every photography stop along the frost-lined cedar river felt like a private editorial shoot. Warm dinners, smooth logistics from Lahore, and genuine hospitality.',
    imageUrl: '/src/assets/images/memory_kumrat_winter_1795205506061.jpg',
    imageAlt: 'Travelers photographing snow-dusted cedar forests and golden mist in Kumrat Valley',
  },
  {
    id: 'memory-swat-white-palace',
    category: 'Swat & Kalam',
    destinationLabel: 'Behrain & White Palace, Swat',
    tripType: 'Family Trip',
    travelerName: 'Tariq & Nadia Jehangir',
    city: 'Rawalpindi',
    rating: 5,
    quote:
      'From Mingora and White Palace to Kalam Bazar, our guide kept every stop unhurried. The Grand Cabin ride and heated suites felt truly five-star.',
    imageUrl: '/src/assets/images/hero_slide_swat_kalam_1795205714141.jpg',
    imageAlt: 'Traditional carved Swati wooden pavilion beside emerald river in Swat Valley',
  },
  {
    id: 'memory-kashmir-keran',
    category: 'Kashmir & Kumrat',
    destinationLabel: 'Keran & Sharda, Kashmir',
    tripType: 'Couple Retreat',
    travelerName: 'Saad & Hira Mansoor',
    city: 'Islamabad',
    rating: 5,
    quote:
      'Waking up to snow-draped pine slopes along the Neelum River was magical. Tourly.pk handled transport, bonfire dinners, and photography effortlessly.',
    imageUrl: '/src/assets/images/hero_slide_kashmir_neelum_1795205714179.jpg',
    imageAlt: 'Wooden riverside cottages glowing in snowy Neelum Valley, Azad Kashmir',
  },
];

export const SCENIC_STRIP_SLIDES = [
  {
    id: 'strip-murree',
    name: 'Murree Hills',
    region: 'Galiyat Ridge',
    elevation: '2,291 m',
    imageUrl: '/src/assets/images/tour_murree_patriata_1795205084505.jpg',
    imageAlt: 'Misty pine forests overlooking Murree Hills at golden hour',
  },
  {
    id: 'strip-swat',
    name: 'Swat Valley',
    region: 'Hindukush Corridor',
    elevation: '1,980 m',
    imageUrl: '/src/assets/images/hero_slide_swat_kalam_1795205714141.jpg',
    imageAlt: 'Emerald Swat Valley river and traditional carved pavilion',
  },
  {
    id: 'strip-kalam',
    name: 'Kalam & Mahodand Lake',
    region: 'Upper Swat',
    elevation: '2,865 m',
    imageUrl: '/src/assets/images/tour_swat_kalam_1795205084927.jpg',
    imageAlt: 'Glacial waters and snowy peaks of Kalam and Mahodand Lake',
  },
  {
    id: 'strip-hunza',
    name: 'Hunza Valley',
    region: 'Karakoram Range',
    elevation: '2,438 m',
    imageUrl: '/src/assets/images/hero_karakoram_hills_1795204905424.jpg',
    imageAlt: 'Historic fort and terraced orchards in Hunza Valley',
  },
  {
    id: 'strip-skardu',
    name: 'Skardu',
    region: 'Baltistan Basin',
    elevation: '2,228 m',
    imageUrl: '/src/assets/images/hero_slide_skardu_desert_1795205715074.jpg',
    imageAlt: 'Cold desert dunes and turquoise alpine waters in Skardu',
  },
  {
    id: 'strip-fairy-meadows',
    name: 'Fairy Meadows',
    region: 'Nanga Parbat',
    elevation: '3,300 m',
    imageUrl: '/src/assets/images/hero_slide_fairy_meadows_1795205714896.jpg',
    imageAlt: 'Alpine meadow chalets beneath the snow face of Nanga Parbat',
  },
  {
    id: 'strip-kashmir',
    name: 'Azad Kashmir',
    region: 'Neelum Valley',
    elevation: '2,100 m',
    imageUrl: '/src/assets/images/tour_kashmir_winter_1795205084521.jpg',
    imageAlt: 'Snowy pine slopes and sapphire river in Azad Kashmir',
  },
];

export const TRANSPORT_FLEET = [
  {
    id: 'coaster-saloon',
    name: 'Air-Conditioned Coaster Saloon',
    classLabel: 'Spacious Group Touring Coach',
    capacity: '22 – 28 Guests',
    idealFor: 'Family, Girls & Boys Group Departures',
    summary:
      'Engineered for effortless long-distance comfort from Lahore, Islamabad & Rawalpindi with panoramic tinted windows, generous legroom, and dedicated highland luggage capacity.',
    specs: [
      { label: 'Seating', value: 'Plush Reclining Saloon Rows' },
      { label: 'Climate', value: 'Multi-Vent Air Conditioning & Heating' },
      { label: 'Luggage', value: 'Protected Rear & Roof Baggage Bay' },
      { label: 'Safety', value: 'Vetted Captain & Onboard First-Aid Kit' },
    ],
    imageUrl: '/src/assets/images/fleet_coaster_saloon_1795206591140.jpg',
    imageAlt: 'Luxury Air-Conditioned Coaster Saloon parked at a northern Pakistan mountain overlook',
  },
  {
    id: 'toyota-grand-cabin',
    name: 'Toyota Grand Cabin',
    classLabel: 'Executive High-Roof Van',
    capacity: '10 – 14 Guests',
    idealFor: 'Families, Small Groups & Private Charters',
    summary:
      'Agile executive transport built for winding valley corridors—combining high-roof interior headroom, individual cabin climate vents, and responsive mountain handling.',
    specs: [
      { label: 'Cabin', value: 'Executive High-Roof Reclining Interior' },
      { label: 'Climate', value: 'Dual-Zone Cabin A/C & Winter Heating' },
      { label: 'Agility', value: 'Precision Suspension for Valley Curves' },
      { label: 'Safety', value: 'Mountain-Trained Driver & First-Aid Kit' },
    ],
    imageUrl: '/src/assets/images/fleet_grand_cabin_1795206589895.jpg',
    imageAlt: 'Executive Toyota Grand Cabin cruising along a scenic mountain valley river road',
  },
];


