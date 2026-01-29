/**
 * Reusable Empty State Component
 * Used when no data is available
 */

import { LucideIcon, FileText, Calendar, Users, User } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
  variant?: 'articles' | 'events' | 'members' | 'leadership' | 'default';
}

const VARIANTS = {
  articles: {
    icon: FileText,
    title: 'Belum Ada Artikel',
    message: 'Kembali lagi nanti untuk artikel dan update terbaru.',
  },
  events: {
    icon: Calendar,
    title: 'Tidak Ada Event Terjadwal',
    message: 'Tidak ada event mendatang saat ini.',
  },
  members: {
    icon: Users,
    title: 'Tidak Ada Anggota Ditemukan',
    message: 'Tidak ada anggota yang sesuai dengan filter Anda.',
  },
  leadership: {
    icon: User,
    title: 'Belum Ada Data Kepengurusan',
    message: 'Informasi kepengurusan akan segera tersedia.',
  },
  default: {
    icon: FileText,
    title: 'Tidak Ada Data',
    message: 'Tidak ada konten untuk ditampilkan saat ini.',
  },
};

export function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  actionHref,
  variant = 'default',
}: EmptyStateProps) {
  const config = VARIANTS[variant];
  const Icon = icon || config.icon;
  const displayTitle = title || config.title;
  const displayMessage = message || config.message;

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4 py-16">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <Icon className="w-8 h-8 text-gray-400" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {displayTitle}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {displayMessage}
        </p>

        {actionLabel && actionHref && (
          <Link
            href={actionHref}
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
          >
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
