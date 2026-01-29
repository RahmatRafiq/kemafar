import Link from 'next/link';
import { CalendarX, ArrowLeft } from 'lucide-react';

export default function EventNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 mb-6">
          <CalendarX className="w-10 h-10 text-primary-600" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Event Tidak Ditemukan
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Event yang Anda cari tidak ada atau telah dihapus.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/events"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Event
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
