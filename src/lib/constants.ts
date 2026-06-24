export const BRAND = {
  name: 'Ticksol Travel & Tours',
  shortName: 'Ticksol',
  tagline: 'Your Trusted Travel Partner',
  subTagline: '30+ years of trusted travel excellence',
  phone: '+923018407179',
  email: 'ticksoltravelpk@gmail.com',
  whatsapp: '923018407179',
  contactEmail: 'me.arslanejaz@gmail.com',
  address: 'Lahore, Pakistan',
};

export const STATS = [
  { label: 'Flights Booked', value: 50000, suffix: '+' },
  { label: 'Visa Success Rate', value: 98, suffix: '%' },
  { label: 'Countries Covered', value: 45, suffix: '+' },
  { label: 'Happy Clients', value: 25000, suffix: '+' },
];

export const SERVICES = [
  {
    id: 'ticket-reservation',
    title: 'Air Ticketing',
    icon: '✈️',
    description: 'Premium flight reservations with major airlines worldwide. Best prices guaranteed.',
    categories: ['3 Star', '4 Star', '5 Star'],
  },
  {
    id: 'visa-processing',
    title: 'Visa Processing',
    icon: '🛂',
    description: 'Expert visa processing for all countries with 98% success rate.',
    categories: ['3 Star', '4 Star', '5 Star'],
  },
  {
    id: 'hajj-umrah',
    title: 'Hajj & Umrah',
    icon: '🕋',
    description: 'Exclusive Hajj & Umrah packages with premium accommodations near Haram.',
    categories: ['3 Star', '4 Star', '5 Star'],
  },
  {
    id: 'hotel-booking',
    title: 'Hotel Reservations',
    icon: '🏨',
    description: 'Worldwide hotel reservations from boutique to 5-star luxury properties.',
    categories: ['3 Star', '4 Star', '5 Star'],
  },
  {
    id: 'tour-packages',
    title: 'International Tours',
    icon: '🌍',
    description: 'Curated international tour packages for all travelers.',
    categories: ['3 Star', '4 Star', '5 Star'],
  },
  {
    id: 'domestic-travel',
    title: 'Domestic Travel',
    icon: '🚗',
    description: 'Domestic flight, bus, and car rental services across Pakistan.',
    categories: ['3 Star', '4 Star', '5 Star'],
  },
];

export const DESTINATIONS = [
  {
    id: 'uae',
    name: 'United Arab Emirates',
    country: 'UAE',
    description: 'Experience the luxury of Dubai, the culture of Abu Dhabi, and the charm of the Emirates.',
    image: '/UAE.jpg',
  },
  {
    id: 'ksa',
    name: 'Saudi Arabia',
    country: 'KSA',
    description: 'Sacred journeys to Makkah & Madinah. Discover the new Saudi Arabia with Vision 2030.',
    image: '/Saudi Arabia.jpg',
  },
  {
    id: 'gulf',
    name: 'Gulf Countries',
    country: 'Gulf',
    description: 'Explore Qatar, Bahrain, Oman & Kuwait. Business and leisure travel across the Gulf region.',
    image: '/UAE.jpg',
  },
  {
    id: 'baku',
    name: 'Baku, Azerbaijan',
    country: 'Azerbaijan',
    description: 'The Land of Fire awaits. Modern architecture meets ancient history in this stunning destination.',
    image: '/Malaysia.jpg',
  },
  {
    id: 'turkey',
    name: 'Turkey',
    country: 'Turkey',
    description: 'Where East meets West. Istanbul, Cappadocia, Antalya and more. A treasure trove of experiences.',
    image: '/Turkey.webp',
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    country: 'Malaysia',
    description: 'Tropical paradise with modern cities. Kuala Lumpur, Langkawi, Penang and the natural wonders of Borneo.',
    image: '/Malaysia.jpg',
  },
  {
    id: 'thailand',
    name: 'Thailand',
    country: 'Thailand',
    description: 'The Land of Smiles. Bangkok, Phuket, Chiang Mai and the pristine islands of the Andaman Sea.',
    image: '/Thailand.jpg',
  },
];

export const PACKAGES = [
  {
    id: 'umrah-3star',
    title: '3 Star Umrah Package',
    tier: '3 Star',
    price: '300,000',
    currency: 'PKR',
    description: 'Economy accommodation with essential Umrah services.',
    highlights: [
      'Economy Hotel Accommodation',
      'Umrah Visa Processing',
      'Return Air Ticket',
      'Ground Transportation',
      'Basic Ziyarat',
    ],
    featured: false,
  },
  {
    id: 'umrah-4star',
    title: '4 Star Umrah Package',
    tier: '4 Star',
    price: '400,000',
    currency: 'PKR',
    description: 'Premium accommodation with comprehensive Umrah services.',
    highlights: [
      'Premium Hotel Accommodation',
      'Umrah Visa Processing',
      'Return Air Ticket',
      'Airport Transfers',
      'Guided Ziyarat',
      'Priority Support',
    ],
    featured: true,
  },
  {
    id: 'umrah-5star',
    title: '5 Star Umrah Package',
    tier: '5 Star',
    price: '500,000',
    currency: 'PKR',
    description: 'Luxury accommodation with premium Umrah services.',
    highlights: [
      'Luxury Hotel Accommodation',
      'VIP Transportation',
      'Return Air Ticket',
      'Umrah Visa Processing',
      'Premium Ziyarat Services',
      'Dedicated Travel Assistance',
      'Priority Customer Support',
    ],
    featured: false,
  },
];

export const LEADERSHIP_TEAM = [
  {
    id: 'saeed',
    name: 'Saeed Ashraf Malik',
    position: 'CEO',
    image: '/Saeed-Ashraf-Malik.jpeg',
  },
  {
    id: 'imtiaz',
    name: 'Imtiaz Ahmad Malik',
    position: 'Managing Director',
    image: '/Imtiaz-Ahmad-Malik.jpeg',
  },
  {
    id: 'arslan',
    name: 'Arslan Ejaz',
    position: 'Support Manager',
    image: '/Arslan Ejaz.jpeg',
  },
];

export const RELIGIOUS_TOURS = [
  {
    id: 'hajj-umrah',
    title: 'Hajj & Umrah',
    image: '/religious-tours/hajj-umrah.jpg',
    highlights: [
      'Premium accommodation options',
      'Visa assistance',
      'Flight arrangements',
      'Transportation',
      'Religious guidance',
    ],
  },
  {
    id: 'najaf-karbala',
    title: 'Najaf & Karbala',
    image: '/religious-tours/najaf-karbala.jpg',
    highlights: [
      'Ziyarat tours',
      'Accommodation',
      'Transportation',
      'Guided religious visits',
    ],
  },
  {
    id: 'mashhad-iran',
    title: 'Mashhad, Iran',
    image: '/religious-tours/mashhad-iran.jpg',
    highlights: [
      'Shrine visitation',
      'Hotel arrangements',
      'Transportation',
      'Religious tour services',
    ],
  },
];

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Packages', href: '#packages' },
  { label: 'Contact', href: '#contact' },
];
