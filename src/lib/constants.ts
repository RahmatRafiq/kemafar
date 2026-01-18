export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Griya Flora Babulu',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  description: 'Agrotourism featuring fresh organic fruits, vegetables, and flowers',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890',
} as const;

export const ROUTES = {
  home: '/',
  about: '/about',
  gallery: '/gallery',
} as const;

export const GALLERY_CATEGORIES = {
  activities: 'Aktivitas',
  events: 'Event',
  facilities: 'Fasilitas',
  organization: 'Organisasi',
} as const;
