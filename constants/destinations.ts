export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  tags: string[];
  averageTemp: string;
  currency: string;
  language: string;
  bestTime: string;
}

export const popularDestinations: Destination[] = [
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    description: 'A dazzling blend of ultramodern and traditional',
    tags: ['culture', 'food', 'technology', 'shopping'],
    averageTemp: '16°C',
    currency: 'JPY',
    language: 'Japanese',
    bestTime: 'Mar-May, Sep-Nov',
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    description: 'The city of lights, love, and timeless elegance',
    tags: ['romantic', 'culture', 'food', 'art'],
    averageTemp: '12°C',
    currency: 'EUR',
    language: 'French',
    bestTime: 'Apr-Jun, Sep-Oct',
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    description: 'Island of gods with beaches, temples, and rice terraces',
    tags: ['beach', 'spiritual', 'nature', 'wellness'],
    averageTemp: '27°C',
    currency: 'IDR',
    language: 'Indonesian',
    bestTime: 'Apr-Oct',
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
    description: 'The city that never sleeps',
    tags: ['urban', 'culture', 'food', 'shopping', 'nightlife'],
    averageTemp: '13°C',
    currency: 'USD',
    language: 'English',
    bestTime: 'Apr-Jun, Sep-Nov',
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
    description: 'Art, architecture, and Mediterranean vibes',
    tags: ['beach', 'culture', 'architecture', 'nightlife'],
    averageTemp: '18°C',
    currency: 'EUR',
    language: 'Spanish, Catalan',
    bestTime: 'May-Jun, Sep-Oct',
  },
  {
    id: 'iceland',
    name: 'Reykjavik',
    country: 'Iceland',
    image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80',
    description: 'Land of fire, ice, and northern lights',
    tags: ['nature', 'adventure', 'unique'],
    averageTemp: '5°C',
    currency: 'ISK',
    language: 'Icelandic',
    bestTime: 'Jun-Aug, Sep-Mar (aurora)',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    description: 'Futuristic skyline meets Arabian luxury',
    tags: ['luxury', 'shopping', 'architecture', 'beach'],
    averageTemp: '28°C',
    currency: 'AED',
    language: 'Arabic, English',
    bestTime: 'Nov-Mar',
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
    description: 'Iconic white buildings and stunning sunsets',
    tags: ['romantic', 'beach', 'views', 'relaxation'],
    averageTemp: '20°C',
    currency: 'EUR',
    language: 'Greek',
    bestTime: 'Apr-Oct',
  },
];

export const travelVibes = [
  { id: 'adventure', label: 'Adventure', emoji: '🏔️' },
  { id: 'relaxation', label: 'Relaxation', emoji: '🌴' },
  { id: 'culture', label: 'Culture', emoji: '🏛️' },
  { id: 'foodie', label: 'Foodie', emoji: '🍜' },
  { id: 'nightlife', label: 'Nightlife', emoji: '🎉' },
  { id: 'nature', label: 'Nature', emoji: '🌿' },
  { id: 'romantic', label: 'Romantic', emoji: '💕' },
  { id: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
  { id: 'budget', label: 'Budget', emoji: '💰' },
  { id: 'luxury', label: 'Luxury', emoji: '✨' },
  { id: 'solo', label: 'Solo', emoji: '🎒' },
  { id: 'wellness', label: 'Wellness', emoji: '🧘' },
];

export const travelerTypes = [
  { id: 'solo', label: 'Solo', icon: 'person' },
  { id: 'couple', label: 'Couple', icon: 'people' },
  { id: 'family', label: 'Family', icon: 'people-circle' },
  { id: 'friends', label: 'Friends', icon: 'people-sharp' },
  { id: 'business', label: 'Business', icon: 'briefcase' },
];
