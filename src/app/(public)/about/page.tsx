/**
 * About Page
 * Company information and history
 */

import { Metadata } from 'next';
import { AboutContent } from '@/features/about/components/AboutContent';
import { getAboutSettings } from '@/lib/api/settings';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Pelajari lebih lanjut tentang organisasi kami, misi, dan visi kami',
};

export default async function AboutPage() {
  const aboutContent = await getAboutSettings();

  return <AboutContent data={aboutContent} />;
}
