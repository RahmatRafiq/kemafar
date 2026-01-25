/**
 * Domain Configuration
 *
 * Business domain-specific categories and classifications.
 * These represent the core business entities and their categorizations.
 */

/**
 * Article Categories
 * Keys are used in URLs and database, values are displayed to users.
 */
export const ARTICLE_CATEGORIES = {
  post: 'Post',
  blog: 'Blog',
  opinion: 'Opinion',
  publication: 'Publication',
  info: 'Info',
} as const;

/**
 * Event Categories
 * Keys are used in URLs and database, values are displayed to users.
 */
export const EVENT_CATEGORIES = {
  seminar: 'Seminar',
  workshop: 'Workshop',
  'community-service': 'Pengabdian Masyarakat',
  competition: 'Kompetisi',
  training: 'Pelatihan',
  other: 'Lainnya',
} as const;

/**
 * Organization Divisions
 * Represents the structural divisions within the organization.
 */
export const DIVISIONS = {
  'internal-affairs': 'Dalam Negeri',
  'external-affairs': 'Luar Negeri',
  academic: 'Keilmuan',
  'student-development': 'Pengembangan Mahasiswa',
  entrepreneurship: 'Kewirausahaan',
  'media-information': 'Media dan Informasi',
  'sports-arts': 'Olahraga dan Seni',
  'islamic-spirituality': 'Kerohanian Islam',
} as const;

/**
 * Gallery Categories
 * Used for organizing photos and media in the gallery.
 */
export const GALLERY_CATEGORIES = {
  activities: 'Aktivitas',
  events: 'Event',
  facilities: 'Fasilitas',
  organization: 'Organisasi',
} as const;
